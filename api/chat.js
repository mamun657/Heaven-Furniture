import { handleChatRequest } from '../src/chatbot/chatHandler.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ reply: 'Method not allowed.' })
  }

  return handleChatRequest(request, response)
}