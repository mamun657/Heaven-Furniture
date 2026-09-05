import { useEffect, useRef, useState } from 'react'
import { businessKnowledge } from './businessKnowledge'
import './chatbot.css'

const quickQuestions = [
  'Is the shop open today?',
  'Where is your showroom?',
  'What furniture do you offer?',
]

const navigationLabels = {
  collections: 'Explore Collections',
  bespoke: 'Explore Bespoke',
  showroom: 'Visit Showroom',
  work: 'See Our Work',
  contact: 'Request a Quote',
  faq: 'Read FAQs',
}

const navigationTargets = {
  collections: businessKnowledge.sections.Collections,
  bespoke: businessKnowledge.sections.Bespoke,
  showroom: businessKnowledge.sections.Showroom,
  work: businessKnowledge.sections.Work,
  contact: businessKnowledge.sections.Contact,
  faq: businessKnowledge.sections.FAQ,
}

function getNavigationAction(question, answer) {
  const text = `${question} ${answer}`.toLowerCase()
  const section = text.includes('bespoke') || text.includes('custom')
    ? 'bespoke'
    : text.includes('showroom') || text.includes('location') || text.includes('where')
      ? 'showroom'
      : text.includes('quote') || text.includes('contact') || text.includes('price')
        ? 'contact'
        : text.includes('work') || text.includes('achievement')
          ? 'work'
          : text.includes('faq')
            ? 'faq'
            : text.includes('furniture') || text.includes('collection') || text.includes('sofa') || text.includes('bed')
              ? 'collections'
              : null

  return section ? { label: navigationLabels[section], href: navigationTargets[section] } : null
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: 'Hi! Welcome to Heaven Furniture Mart. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messageIdRef = useRef(0)
  const apiBaseUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '')).trim().replace(/\/+$/, '')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isOpen) return undefined

    inputRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const sendMessage = async (question) => {
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isLoading) return

    messageIdRef.current += 1
    const userMessage = { id: `${messageIdRef.current}-user`, role: 'user', content: trimmedQuestion }
    setMessages((current) => [...current, userMessage])
    setInput('')
    setShowQuickReplies(false)
    setIsLoading(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedQuestion,
          history: messages.slice(-8).map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const statusMessages = {
          400: 'Please enter a complete question so I can help.',
          401: 'The assistant is not authorized right now. Please try again later.',
          403: 'The assistant cannot access its service right now. Please try again later.',
          404: 'The chat service could not be found. Please try again later.',
          429: 'Please wait a moment before sending another message.',
          500: 'The assistant is temporarily unavailable. Please try again later.',
          502: 'I’m having trouble connecting right now. Please try again in a moment.',
          503: 'The assistant is temporarily unavailable. Please contact the showroom directly.',
          504: 'The assistant took too long to respond. Please try again in a moment.',
        }
        throw new Error(typeof data.reply === 'string' && data.reply.trim() ? data.reply : (statusMessages[response.status] || 'The assistant could not process that request.'))
      }
      const answer = data.reply
      if (typeof answer !== 'string' || !answer.trim()) throw new Error('The assistant returned an invalid response.')
      setMessages((current) => [...current, {
        id: `${messageIdRef.current}-assistant`,
        role: 'assistant',
        content: answer,
        action: getNavigationAction(trimmedQuestion, answer),
      }])
    } catch (error) {
      setMessages((current) => [...current, {
        id: `${messageIdRef.current}-error`,
        role: 'assistant',
        content: error.message === 'Failed to fetch'
          ? 'I’m having trouble connecting right now. Please try again in a moment.'
          : (error.message || 'I’m having trouble connecting right now. Please try again in a moment.'),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section className="chatbot-window" aria-label="Heaven Assistant chat" aria-live="polite">
          <header className="chatbot-header">
            <div>
              <p className="chatbot-eyebrow">HEAVEN FURNITURE MART</p>
              <h2>Heaven Assistant</h2>
              <span>Here to help</span>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">&times;</button>
          </header>

          <div className="chatbot-messages" role="log" aria-label="Conversation">
            {messages.map((message) => (
              <div className={`chatbot-message-row ${message.role}`} key={message.id}>
                <div className="chatbot-message">
                  {message.content}
                  {message.action && (
                    <a className="chatbot-action" href={message.action.href} target={message.action.external ? '_blank' : undefined} rel={message.action.external ? 'noopener noreferrer' : undefined} onClick={() => setIsOpen(false)}>{message.action.label} <span aria-hidden="true">&rarr;</span></a>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="chatbot-message-row assistant"><div className="chatbot-message chatbot-thinking"><span /> <span /> <span /></div></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-suggestions">
            <div className={`chatbot-quick-questions ${showQuickReplies ? 'is-visible' : ''}`} aria-label="Suggested questions" aria-hidden={!showQuickReplies}>
              {quickQuestions.map((question) => (
                <button type="button" key={question} onClick={() => sendMessage(question)} tabIndex={showQuickReplies ? 0 : -1} disabled={!showQuickReplies}>{question}</button>
              ))}
            </div>
            <button
              type="button"
              className="chatbot-hint-toggle"
              onClick={() => setShowQuickReplies((current) => !current)}
              aria-label={showQuickReplies ? 'Hide suggested questions' : 'Show suggested questions'}
              title={showQuickReplies ? 'Hide suggested questions' : 'Show suggested questions'}
              aria-expanded={showQuickReplies}
            >
              <span aria-hidden="true">✦</span>
            </button>
          </div>

          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about furniture, showroom or services..."
              aria-label="Ask Heaven Assistant"
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send message" disabled={isLoading || !input.trim()}>&rarr;</button>
          </form>
        </section>
      )}
      <button type="button" className="chatbot-trigger" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? 'Close Heaven Assistant' : 'Open Heaven Assistant'} aria-expanded={isOpen} title={isOpen ? 'Close Heaven Assistant' : 'Open Heaven Assistant'}>
          <svg className="chatbot-trigger-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 5v3" />
            <circle cx="16" cy="4" r="1.2" fill="currentColor" stroke="none" />
            <rect x="7" y="8" width="18" height="15" rx="5" />
            <path d="M7 14H5.5a2 2 0 0 0-2 2v1.5M25 14h1.5a2 2 0 0 1 2 2v1.5M11 27v-4M21 27v-4" />
            <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="20" cy="15" r="1.4" fill="currentColor" stroke="none" />
            <path d="M12 19h8" />
        </svg>
      </button>
    </div>
  )
}

export default Chatbot
