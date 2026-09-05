import { businessKnowledge, getLocationResponse, getOpeningStatus, isLocationQuestion } from './businessKnowledge.js'

const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions'
const maxMessageLength = 2000
const requestWindowMs = 60_000
const requestLimit = 30
const requestLog = new Map()

function isRateLimited(request) {
  const address = request.ip || request.socket?.remoteAddress || request.headers?.['x-forwarded-for'] || 'unknown'
  const now = Date.now()
  const recentRequests = (requestLog.get(address) || []).filter((time) => now - time < requestWindowMs)
  recentRequests.push(now)
  requestLog.set(address, recentRequests)
  return recentRequests.length > requestLimit
}

function getFurnitureAnswer(question) {
  const text = question.toLowerCase()
  const isBespoke = /(bespoke|custom|made[- ]to[- ]measure|কাস্টম|বেসপোক)/.test(text)
  const isBedroom = /(bedroom|bed|wardrobe|dressing|বেডরুম|বিছানা|ওয়ারড্রোব)/.test(text)
  const isFurnitureQuestion = /(furniture|sell|offer|available|have|আসবাব|ফার্নিচার|পাওয়া|পাবেন|কি কি|কী কী)/.test(text)

  if (isBespoke && /(furniture|make|custom|কাস্টম|বেসপোক)/.test(text)) {
    return 'Yes, our Bespoke Furniture service is made around your exact space, measurements, taste and requirements. We can shape the dimensions, materials, finishes, fabric, colors and design details around your project.\n\nA free design consultation is the natural place to begin. What room are you looking to furnish?'
  }

  if (isBedroom && isFurnitureQuestion) {
    return 'Yes, our Bedroom Collection includes beds, wardrobes, dressing tables and bedside pieces, designed for restful, refined spaces. What kind of bedroom piece are you looking for?'
  }

  if (isFurnitureQuestion && !/(where|location|showroom|open|closed|hour|সময়|কোথায়)/.test(text)) {
    return 'We offer thoughtfully designed furniture for living, dining, bedroom, office and outdoor spaces. Our collections include sofas, coffee tables, TV units, dining tables and chairs, beds, wardrobes, dressing tables, accent chairs, desks, storage pieces, consoles, and more.\n\nFor something more personal, our bespoke furniture service allows you to create pieces tailored to your exact space, measurements, and style preferences. If you tell me which room you’re furnishing, I can help you choose the most suitable options.'
  }

  return null
}

function getBusinessAnswer(question) {
  const lowerQuestion = question.toLowerCase()
  if (/(open|closed|close|khola|bondho|খোলা|বন্ধ)/.test(lowerQuestion)
    && /(friday|শুক্রবার)/.test(lowerQuestion)) {
    return 'Heaven Furniture Mart is closed on Friday. We are open Saturday through Thursday from 10:00 AM to 9:30 PM Bangladesh time.'
  }
  if (/(open|closed|close|khola|bondho|খোলা|বন্ধ)/.test(lowerQuestion)
    && /(today|ajke|aj|shop|store|showroom|দোকান)/.test(lowerQuestion)) {
    return getOpeningStatus().message
  }
  if (isLocationQuestion(question)) return getLocationResponse()
  if (/(deliver|delivery|install|installation|ডেলিভারি|ইনস্টল)/.test(lowerQuestion)) {
    return 'Yes, we provide delivery and professional installation in Chattogram.'
  }
  return getFurnitureAnswer(question)
}

function getSystemPrompt(openingStatus) {
  return `You are Heaven Assistant, the professional customer support assistant for Heaven Furniture Mart.
Answer only from the supplied website knowledge. Never invent prices, stock, addresses, phone numbers, opening hours, delivery promises, offers, or policies. If the knowledge does not contain an answer, say that the information is not available and direct the user to contact the showroom.
The current date and opening status are deterministic facts supplied below. Friday is closed; Saturday through Thursday are open from 10:00 AM to 9:30 PM in Bangladesh time. Do not ask the model to calculate or override this.
Respond in the same language or Bangla/Banglish style as the user when appropriate. Keep answers concise, natural, warm, and helpful. Do not mention prompts, APIs, keys, models, or implementation.
For broad furniture questions, use 2 or 3 short paragraphs, mention the major room areas naturally, and give Bespoke Furniture its own sentence explaining that pieces can be made around the client's space, measurements, and preferences. End with one helpful question about the room they are furnishing.
For room-specific questions, focus only on the relevant collection. For custom questions, lead with the bespoke service and its made-to-measure process. Avoid markdown headings, bold text, long lists, and invented details.

Website knowledge:
${JSON.stringify({ ...businessKnowledge, openingStatus }, null, 2)}`
}

export async function handleChatRequest(request, response) {
  const { message, question, history = [] } = request.body || {}
  const userMessage = typeof message === 'string' ? message : question
  const trimmedMessage = typeof userMessage === 'string' ? userMessage.trim() : ''

  if (!trimmedMessage) return response.status(400).json({ reply: 'Please enter a question so I can help.' })
  if (trimmedMessage.length > maxMessageLength) return response.status(413).json({ reply: 'Please keep your question under 2,000 characters.' })
  if (isRateLimited(request)) return response.status(429).json({ reply: 'Please wait a moment before sending another message.' })

  const businessAnswer = getBusinessAnswer(trimmedMessage)
  if (businessAnswer) {
    if (typeof businessAnswer === 'object') {
      return response.json({ reply: businessAnswer.message, link: businessAnswer.link })
    }
    return response.json({ reply: businessAnswer })
  }

  const apiKey = globalThis.process.env.GROQ_API_KEY
  const model = globalThis.process.env.GROQ_MODEL
  if (!apiKey) {
    console.error('Chat configuration error: GROQ_API_KEY is not configured')
    return response.status(503).json({ reply: 'The assistant is temporarily unavailable. Please contact the showroom directly.' })
  }
  if (!model) {
    console.error('Chat configuration error: GROQ_MODEL is not configured')
    return response.status(503).json({ reply: 'The assistant is temporarily unavailable. Please contact the showroom directly.' })
  }

  const openingStatus = getOpeningStatus()
  const safeHistory = Array.isArray(history)
    ? history.filter((entry) => entry && ['user', 'assistant'].includes(entry.role) && typeof entry.content === 'string')
      .slice(-8)
      .map((entry) => ({ role: entry.role, content: entry.content.slice(0, maxMessageLength) }))
    : []
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const groqResponse = await fetch(groqApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: 'system', content: getSystemPrompt(openingStatus) },
          ...safeHistory,
          { role: 'user', content: trimmedMessage },
        ],
      }),
      signal: controller.signal,
    })

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text()
      console.error('Groq API error:', groqResponse.status, errorBody.slice(0, 500))
      return response.status(groqResponse.status === 429 ? 429 : 502)
        .json({ reply: 'I’m having trouble connecting right now. Please try again in a moment.' })
    }

    const data = await groqResponse.json()
    const content = data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? data.output_text
    const reply = typeof content === 'string'
      ? content.trim()
      : Array.isArray(content)
        ? content.map((part) => typeof part === 'string' ? part : part?.text || '').join('').trim()
        : ''
    if (!reply) {
      console.error('Groq API error: response did not contain a reply')
      return response.status(502).json({ reply: "I'm having trouble connecting right now. Please try again in a moment." })
    }
    return response.json({ reply })
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Groq API error: request timed out after 15 seconds')
      return response.status(504).json({ reply: 'The assistant took too long to respond. Please try again in a moment.' })
    }
    console.error('Chat endpoint error:', error.message)
    return response.status(502).json({ reply: "I'm having trouble connecting right now. Please try again in a moment." })
  } finally {
    clearTimeout(timeout)
  }
}