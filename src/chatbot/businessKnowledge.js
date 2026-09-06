export const businessKnowledge = {
  name: 'Heaven Furniture Mart',
  timezone: 'Asia/Dhaka',
  closedDays: ['Friday'],
  openingHours: '10:00 AM - 9:30 PM, Saturday through Thursday',
  location: {
    businessName: 'Heaven Furniture Mart',
    address: 'Opposite of RAK Ceramics, Agrabad Access Road, Chattogram',
    googleMapsUrl: 'https://www.google.com/maps?q=Heaven+Furniture+Mart+Agrabad+Chattogram',
  },
  phone: '+880 1960-481983',
  email: 'heavenfurnituremart@gmail.com',
  collections: [
    'Modern Lounge Sofa: sofas, coffee tables, TV units and consoles',
    'Dining Collection: dining tables, chairs and cabinets',
    'Bedroom Collection: beds, wardrobes, dressing tables and bedside pieces',
    'Refined Accent Chair',
    'Bespoke Furniture: designed around exact space, measurements, taste and requirements',
    'Living Room Collection: sofas, tables and accent pieces',
    'Refined Office Furniture: desks, chairs and storage pieces',
    'Architectural Storage: cabinets, consoles and storage solutions',
    'Outdoor Living Collection',
  ],
  services: [
    'Free design consultation',
    'Bespoke furniture made for your space',
    'Premium craftsmanship',
    'Delivery and professional installation in Chattogram',
    'Easy payment options',
    'Interior solutions for homes and workspaces',
  ],
  sections: {
    Collections: '#collections',
    Work: '#work',
    Bespoke: '#bespoke',
    Showroom: '#showroom',
    FAQ: '#faq-title',
  },
}

export function getLocationResponse() {
  return {
    message: `Our flagship showroom is located at ${businessKnowledge.location.address}.`,
    link: {
      label: 'Visit Showroom',
      url: businessKnowledge.location.googleMapsUrl,
    },
  }
}

export function getDhakaDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: businessKnowledge.timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value
    return parts
  }, {})
}

export function getTodayOpeningWindow() {
  return { open: '10:00 AM', close: '9:30 PM' }
}

export function getOpeningStatus(date = new Date()) {
  const dateParts = getDhakaDateParts(date)
  const weekday = dateParts.weekday
  const hour = Number(dateParts.hour || 0)
  const minute = Number(dateParts.minute || 0)
  const currentMinutes = hour * 60 + minute
  const isFriday = weekday === 'Friday'
  const isNormallyOpenDay = !isFriday
  const isOpenRightNow = isNormallyOpenDay && currentMinutes >= 10 * 60 && currentMinutes < 21 * 60 + 30

  return {
    day: weekday,
    date: `${dateParts.month} ${dateParts.day}, ${dateParts.year}`,
    isOpen: isOpenRightNow,
    isClosedDay: isFriday,
    message: isFriday
      ? `Today is Friday, so the showroom is closed. We are open Saturday–Thursday from 10:00 AM to 9:30 PM.`
      : isOpenRightNow
        ? `Yes, we're open today from 10:00 AM to 9:30 PM.`
        : `The showroom is currently closed. We are open Saturday–Thursday from 10:00 AM to 9:30 PM.`,
  }
}

export function isOpeningStatusQuestion(question = '') {
  const text = question.toLowerCase()
  return /(open|closed|close|hours|hour|opening|shop|showroom|today|now|friday)/.test(text)
}

export function isLocationQuestion(question = '') {
  const text = question.toLowerCase()
  return /(showroom|location|address|where are you|where is heaven|where can i visit|find your showroom|give me your location|google maps|map location|show me the showroom|where is your showroom)/.test(text)
}

export function isProductsQuestion(question = '') {
  const text = question.toLowerCase()
  return /(furniture|sofa|dining|bedroom|chair|office|storage|outdoor|custom|bespoke|delivery|install|consultation|design)/.test(text)
}

export function getDeterministicBusinessAnswer(question = '') {
  const trimmedQuestion = String(question || '').trim()
  if (!trimmedQuestion) return null

  const text = trimmedQuestion.toLowerCase()

  if (isOpeningStatusQuestion(text)) {
    const status = getOpeningStatus()

    if (/(close|closing|what time do you close|when do you close|closing time)/.test(text)) {
      return {
        reply: status.isClosedDay
          ? 'The showroom is closed on Friday. We reopen Saturday at 10:00 AM.'
          : `Today, the showroom closes at 9:30 PM.`,
      }
    }

    if (/(hours|hour|opening|open when|when are you open)/.test(text)) {
      return {
        reply: 'We are open Saturday–Thursday from 10:00 AM to 9:30 PM. Friday is closed.',
      }
    }

    return { reply: status.message }
  }

  if (isLocationQuestion(trimmedQuestion)) {
    const location = getLocationResponse()
    return { reply: location.message, link: location.link }
  }

  const furnitureAnswer = getFurnitureAnswer(trimmedQuestion)
  if (furnitureAnswer) return { reply: furnitureAnswer }

  return null
}

export function getFurnitureAnswer(question = '') {
  const text = String(question || '').toLowerCase()
  const isBespoke = /(bespoke|custom|made[- ]to[- ]measure|কাস্টম|বেসপোক)/.test(text)
  const isBedroom = /(bedroom|bed|wardrobe|dressing|বেডরুম|বিছানা|ওয়ারড্রোব)/.test(text)
  const isFurnitureQuestion = /(furniture|sell|offer|available|have|আসবাব|ফার্নিচার|পাওয়া|পাবেন|কি কি|কী কী)/.test(text)

  if (isBespoke && /(furniture|make|custom|কাস্টম|বেসপোক)/.test(text)) {
    return 'Yes, our Bespoke Furniture service is made around your exact space, measurements, taste and requirements. We can shape the dimensions, materials, finishes, fabric, colors and design details around your project. A free design consultation is the natural place to begin. What room are you looking to furnish?'
  }

  if (isBedroom && isFurnitureQuestion) {
    return 'Yes, our Bedroom Collection includes beds, wardrobes, dressing tables and bedside pieces, designed for restful, refined spaces. What kind of bedroom piece are you looking for?'
  }

  if (isFurnitureQuestion && !/(where|location|showroom|open|closed|hour|সময়|কোথায়)/.test(text)) {
    return 'We offer thoughtfully designed furniture for living, dining, bedroom, office and outdoor spaces. Our collections include sofas, coffee tables, TV units, dining tables and chairs, beds, wardrobes, dressing tables, accent chairs, desks, storage pieces, consoles, and more. For something more personal, our bespoke furniture service allows you to create pieces tailored to your exact space, measurements, and style preferences. If you tell me which room you’re furnishing, I can help you choose the most suitable options.'
  }

  if (/(delivery|install|installation|ডেলিভারি|ইনস্টল)/.test(text)) {
    return 'Yes, we provide delivery and professional installation in Chattogram.'
  }

  if (/(design consultation|consultation|design)/.test(text)) {
    return 'Yes, we offer design consultation to help shape the right furniture and layout for your space.'
  }

  return null
}
