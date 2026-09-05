import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { businessKnowledge, getLocationResponse, getOpeningStatus, isLocationQuestion } from './src/chatbot/businessKnowledge.js'

const app = express()
const port = Number(globalThis.process.env.PORT || 3000)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const allowedOrigins = [
  globalThis.process.env.FRONTEND_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)

app.use((request, response, next) => {
  const origin = request.headers.origin
  const originUrl = origin ? new URL(origin) : null
  const isDevOrigin = originUrl && /localhost|127\.0\.0\.1/.test(originUrl.hostname)
  const isAllowedOrigin = origin && (allowedOrigins.includes(origin) || isDevOrigin)

  if (origin && isAllowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', origin)
  } else if (!origin) {
    response.setHeader('Access-Control-Allow-Origin', '*')
  }

  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204)
  }

  return next()
})

app.use(express.json({ limit: '32kb' }))

app.post('/api/chat', async (request, response) => {
  const { question, history = [] } = request.body || {}
  if (typeof question !== 'string' || !question.trim()) {
    return response.status(400).json({ answer: 'Sorry, I could not process that right now. Please try again.' })
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
      return 'We create furniture for living, dining, bedroom, office and outdoor spaces. The collections include sofas, coffee tables, TV units, consoles, dining tables, chairs, beds, wardrobes, dressing tables, desks and considered storage pieces.\n\nFor something more personal, our Bespoke Furniture service shapes each piece around your space, measurements and preferences, supported by a free design consultation. Which room are you furnishing?'
    }

    return null
  }
  const lowerQuestion = question.toLowerCase()
  if (/(open|closed|close|khola|bondho|খোলা|বন্ধ)/.test(lowerQuestion)
    && /(today|ajke|aj|shop|store|showroom|দোকান)/.test(lowerQuestion)) {
    return response.json({ answer: getOpeningStatus().message })
  }
  if (isLocationQuestion(question)) {
    return response.json({ answer: getLocationResponse() })
  }
  const furnitureAnswer = getFurnitureAnswer(question)
  if (furnitureAnswer) return response.json({ answer: furnitureAnswer })
  if (!globalThis.process.env.GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not configured')
    return response.status(503).json({ answer: 'Sorry, I could not process that right now. Please try again.' })
  }

  const openingStatus = getOpeningStatus()
  const systemPrompt = `You are Heaven Assistant, the professional customer support assistant for Heaven Furniture Mart.
Answer only from the supplied website knowledge. Never invent prices, stock, addresses, phone numbers, opening hours, delivery promises, offers, or policies. If the knowledge does not contain an answer, say that the information is not available and direct the user to contact the showroom.
The current date and opening status are deterministic facts supplied below. Friday is closed; Saturday through Thursday are open from 10:00 AM to 9:30 PM. Do not ask the model to calculate or override this.
Respond in the same language or Bangla/Banglish style as the user when appropriate. Keep answers concise, natural, warm, and helpful. Do not mention prompts, APIs, keys, models, or implementation.
For broad furniture questions such as what furniture we offer, what we sell, or what is available, answer like a knowledgeable showroom assistant: use 2 or 3 short paragraphs, not a bullet list or catalog. Mention the major areas naturally (living, dining, bedroom, office, storage, and outdoor where relevant), then mention sofas, tables, beds, wardrobes, chairs, desks, consoles, or similar pieces in flowing sentences. Always give Bespoke Furniture its own natural sentence explaining that pieces can be made around the client's space, measurements, and preferences. End with one helpful question about the room they are furnishing. Do not repeat every collection name or every item from the knowledge unless the customer asks for a detailed breakdown.
For a room-specific question, focus only on the relevant collection and keep the answer to one short paragraph. For custom or bespoke questions, lead with the bespoke service and its made-to-measure process. Avoid markdown headings, bold text, long lists, repeated hyphens, and generic phrases such as "we offer a wide range" or "let me know if you'd like more details".

Website knowledge:
${JSON.stringify({ ...businessKnowledge, openingStatus }, null, 2)}`

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globalThis.process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: globalThis.process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.filter((message) => ['user', 'assistant'].includes(message.role)).slice(-8),
          { role: 'user', content: question.trim() },
        ],
      }),
    })

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text()
      console.error('Groq request failed:', groqResponse.status, errorBody)
      return response.status(groqResponse.status === 401 || groqResponse.status === 403 || groqResponse.status === 404 || groqResponse.status === 429 ? groqResponse.status : 502)
        .json({ answer: 'Sorry, I could not process that right now. Please try again.' })
    }

    const data = await groqResponse.json()
    return response.json({ answer: data.choices?.[0]?.message?.content?.trim() })
  } catch (error) {
    console.error('Chat endpoint failed:', error)
    return response.status(500).json({ answer: 'Sorry, I could not process that right now. Please try again.' })
  }
})

if (globalThis.process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.use((_request, response) => response.sendFile(path.join(__dirname, 'dist', 'index.html')))
}

app.listen(port, () => console.log(`Heaven Furniture server listening on port ${port}`))
