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

export function isLocationQuestion(question = '') {
  const text = question.toLowerCase()
  return /(showroom|location|address|where are you|where is heaven|where can i visit|find your showroom|give me your location|google maps|map location|show me the showroom)/.test(text)
}

export function getLocationResponse() {
  return `Our flagship showroom is located at ${businessKnowledge.location.address}.\n\nGoogle Maps: ${businessKnowledge.location.googleMapsUrl}`
}

export function getDhakaDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: businessKnowledge.timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value
    return parts
  }, {})
}

export function getOpeningStatus(date = new Date()) {
  const dateParts = getDhakaDateParts(date)
  const isClosed = businessKnowledge.closedDays.includes(dateParts.weekday)

  return {
    day: dateParts.weekday,
    date: `${dateParts.month} ${dateParts.day}, ${dateParts.year}`,
    isOpen: !isClosed,
    message: isClosed
      ? `Today is ${dateParts.weekday}, so ${businessKnowledge.name} is closed.`
      : `Yes, ${businessKnowledge.name} is open today.`,
  }
}
