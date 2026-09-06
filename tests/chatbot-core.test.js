import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getOpeningStatus,
  getDeterministicBusinessAnswer,
  getLocationResponse,
} from '../src/chatbot/businessKnowledge.js'

test('opening-status logic respects Bangladesh Friday closure and opening hours', () => {
  const friday = new Date('2026-09-11T12:00:00+06:00')
  const saturday = new Date('2026-09-12T12:00:00+06:00')

  assert.equal(getOpeningStatus(friday).isOpen, false)
  assert.equal(getOpeningStatus(saturday).isOpen, true)
  assert.match(getOpeningStatus(saturday).message, /open today/i)
})

test('deterministic business answers bypass AI for opening and location prompts', () => {
  const openAnswer = getDeterministicBusinessAnswer('Is the shop open today?')
  const locationAnswer = getDeterministicBusinessAnswer('Where is your showroom?')

  assert.ok(openAnswer)
  assert.ok(locationAnswer)
  assert.match(openAnswer.reply, /open|closed/i)
  assert.match(locationAnswer.reply, /Agrabad|showroom|Opposite/i)
})

test('location response includes address and Google Maps link', () => {
  const result = getLocationResponse()

  assert.match(result.message, /Agrabad/i)
  assert.match(result.link.url, /maps/i)
})
