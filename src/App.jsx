import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import pic1 from './assets/pic1.png'
import pic2 from './assets/pic2.png'
import pic3 from './assets/pic3.png'
import pic4 from './assets/pic4.png'
import pic5 from './assets/pic5.png'
import pic6 from './assets/pic6.png'
import pic7 from './assets/pic7.png'
import pic8 from './assets/pic8.png'
import pic9 from './assets/pic9.png'
import pic11 from '../picture/pic11.png'
import pic12 from '../picture/pic12.png'
import pic13 from '../picture/pic13.png'
import pic14 from '../picture/pic14.png'
import pic15 from '../picture/pic15.png'
import pic16 from '../picture/pic16.png'
import pic17 from '../picture/pic17.png'
import pic18 from '../picture/pic18.png'
import pic19 from '../picture/pic19.png'
import pic20 from '../picture/pic20.png'
import pic21 from '../picture/pic21.png'
import facebookIcon from './assets/social-facebook.svg'
import instagramIcon from './assets/social-instagram.svg'
import youtubeIcon from './assets/social-youtube.svg'
import whatsappIcon from './assets/social-whatsapp.svg'
import showroomPinIcon from './assets/icons8-showroom-pin.svg'
import owner23 from './owner/pic23.jpg'
import owner24 from './owner/pic24.jpg'
import Chatbot from './chatbot/Chatbot'
import { businessKnowledge } from './chatbot/businessKnowledge'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { label: 'Collections', href: '#collections' },
  { label: 'Work', href: '#work' },
  { label: 'Showroom', href: '#showroom' },
  { label: 'Contact', href: '#contact' },
]

const storyItems = [
  {
    label: 'SOFA COLLECTION',
    title: 'Modern Lounge Sofa',
    description: 'Sofas, coffee tables, TV units and consoles shaped around the way you live.',
    image: pic1,
    alt: 'Heaven Furniture Mart custom sofa',
    tag: 'Made for your room',
  },
  {
    label: 'DINING COLLECTION',
    title: 'Dining Collection',
    description: 'Dining tables, chairs and cabinets designed for generous everyday gatherings.',
    image: pic2,
    alt: 'Luxury dining furniture collection by Heaven Furniture Mart',
    tag: 'DESIGNED FOR GATHERING',
  },
  {
    label: 'BEDROOM COLLECTION',
    title: 'Bedroom Collection',
    description: 'Beds, wardrobes, dressing tables and bedside pieces designed for restful, refined spaces.',
    image: pic3,
    alt: 'Elegant bedroom furniture collection by Heaven Furniture Mart',
    tag: 'CRAFTED FOR RESTFUL LIVING',
  },
  {
    label: 'CHAIR COLLECTION',
    title: 'Refined Accent Chair',
    description: 'Detailed craftsmanship and sculpted comfort for beautifully balanced interiors.',
    image: pic4,
    alt: 'Luxury accent chair furniture by Heaven Furniture Mart',
    tag: 'CRAFTED FOR COMFORT',
  },
  {
    label: 'BESPOKE COLLECTION',
    title: 'Bespoke Furniture',
    description: 'Furniture designed around your exact space, measurements, taste and requirements.',
    image: pic5,
    alt: 'Bespoke dining furniture crafted by Heaven Furniture Mart',
    tag: 'DESIGNED. CRAFTED. CUSTOMIZED.',
  },
  {
    label: 'LIVING COLLECTION',
    title: 'Living Room Collection',
    description: 'Thoughtfully crafted sofas, tables and accent pieces designed to bring comfort and character to modern living spaces.',
    image: pic6,
    alt: 'Contemporary living room furniture collection',
    tag: 'CRAFTED FOR EVERYDAY LIVING',
  },
  {
    label: 'OFFICE COLLECTION',
    title: 'Refined Office Furniture',
    description: 'Elegant desks, chairs and storage pieces designed to create productive spaces without compromising on comfort or character.',
    image: pic7,
    alt: 'Refined office furniture collection',
    tag: 'DESIGNED TO WORK BEAUTIFULLY',
  },
  {
    label: 'STORAGE COLLECTION',
    title: 'Architectural Storage',
    description: 'Beautifully proportioned cabinets, consoles and storage solutions created to bring order, function and understated elegance to every room.',
    image: pic8,
    alt: 'Architectural storage furniture collection',
    tag: 'FUNCTION WITH CHARACTER',
  },
  {
    label: 'OUTDOOR COLLECTION',
    title: 'Outdoor Living Collection',
    description: 'Durable and refined furniture designed to extend the comfort and character of your home into outdoor spaces.',
    image: pic9,
    alt: 'Premium outdoor furniture collection',
    tag: 'MADE FOR OPEN-AIR LIVING',
  },
]

const furnitureImages = [
  ...storyItems.map(({ image, alt }) => ({ image, alt })),
  { image: pic11, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic12, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic13, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic14, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic15, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic16, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic17, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic18, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic19, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic20, alt: 'Heaven Furniture Mart furniture collection detail' },
  { image: pic21, alt: 'Heaven Furniture Mart furniture collection detail' },
]

const processSteps = [
  {
    title: 'Discover',
    description: 'Tell us about your space, needs and vision.',
    icon: 'chat',
  },
  {
    title: 'Design',
    description: 'We refine dimensions, materials and details together.',
    icon: 'design',
  },
  {
    title: 'Craft',
    description: 'Our team turns the approved design into furniture.',
    icon: 'craft',
  },
  {
    title: 'Deliver',
    description: 'We deliver and professionally install your finished piece.',
    icon: 'truck',
  },
]

const featureList = [
  { title: 'Free Design Consultation', icon: 'ruler' },
  { title: 'Made For Your Space', icon: 'expand' },
  { title: 'Premium Craftsmanship', icon: 'badge' },
  { title: 'Visit Our Showroom', icon: 'location' },
  { title: 'Delivery & Installation', icon: 'home' },
  { title: 'Easy Payment Options', icon: 'card' },
  { title: 'Trusted by happy homeowners', icon: 'home' },
]

const achievementItems = [
  {
    image: owner23,
    category: 'RECOGNITION',
    title: 'Built in Chattogram, made to last',
    description: 'A growing furniture studio shaped by local craft, trusted relationships and ambitious spaces.',
    alt: 'Heaven Furniture Mart receiving recognition at a furniture event',
  },
  {
    image: owner24,
    category: 'OUR PEOPLE',
    title: 'A team with a point of view',
    description: 'The people behind every measured detail, thoughtful finish and carefully delivered room.',
    alt: 'Heaven Furniture Mart team',
  },
]

const faqItems = [
  { question: 'Can furniture be made to my measurements?', answer: 'Yes. We shape dimensions, materials, finishes and details around your room and how you use it.' },
  { question: 'How do I begin a project?', answer: 'Start with a conversation. Share your space, references and requirements, and our team will guide the next step.' },
  { question: 'Do you deliver and install?', answer: 'Every finished piece can be delivered and professionally installed by our team in Chattogram.' },
]

function Icon({ name }) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'chat':
      return (
        <svg {...sharedProps}>
          <path d="M8 10h8M8 14h5M7 18l-3 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7Z" />
        </svg>
      )
    case 'design':
      return (
        <svg {...sharedProps}>
          <path d="M4 18V6m0 0h11l5 6-5 6H4Z" />
          <path d="m7 9 2 2 3-3" />
        </svg>
      )
    case 'craft':
      return (
        <svg {...sharedProps}>
          <path d="M8 5h3v4H8zm5 0h3v4h-3zm-8 7h14l-1 8H7l-2-8Z" />
          <path d="M9 15h6" />
        </svg>
      )
    case 'truck':
      return (
        <svg {...sharedProps}>
          <path d="M2 7h11v8H2zm11 3h4l3 3v2h-7v-5Z" />
          <circle cx="7" cy="17" r="1.5" />
          <circle cx="17" cy="17" r="1.5" />
        </svg>
      )
    case 'ruler':
      return (
        <svg {...sharedProps}>
          <path d="M6 4h12a2 2 0 0 1 2 2v12l-3-1-3 1-3-1-3 1-3-1V6a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6M9 11h6M9 14h4" />
        </svg>
      )
    case 'expand':
      return (
        <svg {...sharedProps}>
          <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
          <path d="M4 8l4 4M20 8l-4 4M4 16l4-4M20 16l-4-4" />
        </svg>
      )
    case 'badge':
      return (
        <svg {...sharedProps}>
          <path d="M12 3 8 5v4c0 2.5 1.3 4.8 4 6 2.7-1.2 4-3.5 4-6V5l-4-2Z" />
          <path d="M9.5 12.5 11 14l3.5-3.5" />
        </svg>
      )
    case 'location':
      return (
        <svg {...sharedProps}>
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...sharedProps}>
          <path d="M6.5 4.5 9 4l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5-.5 2.5a2 2 0 0 1-2.2 1.6C10.8 18.4 5.6 13.2 4.9 6.7A2 2 0 0 1 6.5 4.5Z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      )
    case 'home':
      return (
        <svg {...sharedProps}>
          <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5Z" />
        </svg>
      )
    case 'card':
      return (
        <svg {...sharedProps}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 9.5h19" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      )
    case 'play':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

function FurnitureShowcase() {
  const showcaseRef = useRef(null)
  const positionRef = useRef(furnitureImages.length)
  const logicalIndexRef = useRef(0)
  const animationRef = useRef(null)
  const dragRef = useRef(null)

  useLayoutEffect(() => {
    const showcase = showcaseRef.current

    if (!showcase) {
      return undefined
    }

    const cards = Array.from(showcase.querySelectorAll('[data-showcase-card]'))
    const stage = showcase.querySelector('[data-showcase-stage]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = furnitureImages.length
    const visibleRadius = 4.5
    const normalizeIndex = (index) => ((index % total) + total) % total
    const normalizeTrackPosition = (position) => total + normalizeIndex(Math.round(position))

    const updateCards = (position) => {
      const stageWidth = stage.clientWidth
      const cardWidth = cards[0]?.offsetWidth ?? 0
      const radius = Math.max(0, stageWidth / 2 - cardWidth / 2 - 12)
      const verticalRadius = Math.min(115, stage.clientHeight * 0.2)

      cards.forEach((card, index) => {
        const relative = index - position
        const angle = (relative / total) * Math.PI * 2
        const distance = Math.abs(relative)
        const x = Math.sin(angle) * radius
        const y = (1 - Math.cos(angle)) * verticalRadius
        const scale = Math.max(0.56, 1 - distance * 0.075)
        const opacity = distance <= visibleRadius ? Math.max(0.18, 1 - distance * 0.18) : 0
        const rotation = Math.sin(angle) * 15

        gsap.set(card, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          scale,
          rotation,
          opacity,
          zIndex: Math.round(100 - distance),
        })
      })
    }

    const setPosition = (position) => {
      positionRef.current = position
      logicalIndexRef.current = normalizeIndex(position)
      updateCards(position)
    }

    const settleTo = (target) => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      const current = positionRef.current
      while (target - current > total / 2) target -= total
      while (current - target > total / 2) target += total

      animationRef.current = gsap.to(positionRef, {
        current: target,
        duration: reduceMotion ? 0 : 0.7,
        ease: 'power3.out',
        onUpdate: () => updateCards(positionRef.current),
        onComplete: () => {
          const normalizedPosition = normalizeTrackPosition(target)
          positionRef.current = normalizedPosition
          logicalIndexRef.current = normalizeIndex(normalizedPosition)
          updateCards(normalizedPosition)
        },
      })
    }

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return
      }

      animationRef.current?.kill()
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startPosition: positionRef.current,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocity: 0,
        axis: null,
      }
      showcase.setPointerCapture(event.pointerId)
      showcase.classList.add('is-dragging')
    }

    const onPointerMove = (event) => {
      const drag = dragRef.current

      if (!drag) {
        return
      }

      const now = performance.now()
      const deltaX = event.clientX - drag.startX
      const deltaY = event.clientY - drag.startY

      if (!drag.axis && Math.hypot(deltaX, deltaY) > 6) {
        drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
      }

      if (drag.axis === 'vertical') {
        dragRef.current = null
        showcase.releasePointerCapture(event.pointerId)
        showcase.classList.remove('is-dragging')
        return
      }

      if (drag.axis !== 'horizontal') {
        return
      }

      const deltaTime = Math.max(1, now - drag.lastTime)
      drag.velocity = (event.clientX - drag.lastX) / deltaTime
      drag.lastX = event.clientX
      drag.lastTime = now
      setPosition(drag.startPosition - deltaX / 180)
    }

    const onPointerUp = (event) => {
      const drag = dragRef.current

      if (!drag) {
        return
      }

      dragRef.current = null
      showcase.releasePointerCapture(event.pointerId)
      showcase.classList.remove('is-dragging')
      settleTo(Math.round(positionRef.current - drag.velocity * 12))
    }

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        settleTo(Math.round(positionRef.current) - 1)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        settleTo(Math.round(positionRef.current) + 1)
      }
    }

    const ctx = gsap.context(() => {
      updateCards(positionRef.current)
      gsap.fromTo(cards, { scale: 0.82 }, {
        scale: (index) => {
          const distance = Math.abs(index - positionRef.current)
          return Math.max(0.56, 1 - distance * 0.075)
        },
        duration: 0.9,
        stagger: 0.025,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: showcase,
          start: 'top 78%',
          once: true,
        },
      })
    }, showcaseRef)

    showcase.addEventListener('pointerdown', onPointerDown)
    showcase.addEventListener('pointermove', onPointerMove)
    showcase.addEventListener('pointerup', onPointerUp)
    showcase.addEventListener('pointercancel', onPointerUp)
    showcase.addEventListener('keydown', onKeyDown)
    const onResize = () => updateCards(positionRef.current)
    window.addEventListener('resize', onResize)

    return () => {
      animationRef.current?.kill()
      showcase.removeEventListener('pointerdown', onPointerDown)
      showcase.removeEventListener('pointermove', onPointerMove)
      showcase.removeEventListener('pointerup', onPointerUp)
      showcase.removeEventListener('pointercancel', onPointerUp)
      showcase.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])

  return (
    <section className="furniture-showcase" ref={showcaseRef} tabIndex="0" aria-label="Explore our premier furniture by dragging">
      <div className="showcase-stage" data-showcase-stage>
        <div className="showcase-cards" aria-live="polite">
          {[...furnitureImages, ...furnitureImages, ...furnitureImages].map((item, index) => (
            <div className="showcase-card" data-showcase-card key={`${index}-${item.image}`}>
              <img src={item.image} alt={item.alt} draggable="false" loading={index < 28 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const unlockTimerRef = useRef(null)

  useEffect(() => {
    return () => window.clearTimeout(unlockTimerRef.current)
  }, [])

  const changeSlide = (nextIndex) => {
    if (unlockTimerRef.current) {
      return
    }

    setActiveIndex((nextIndex + achievementItems.length) % achievementItems.length)
    unlockTimerRef.current = window.setTimeout(() => {
      unlockTimerRef.current = null
    }, 700)
  }

  return (
    <section className="work-showcase section-shell" id="work">
      <div className="work-heading" data-reveal>
        <p className="section-label">WORK / ACHIEVEMENTS</p>
        <h2>A studio with something to say.</h2>
        <p>People, projects and milestones that continue to shape Heaven Furniture Mart.</p>
      </div>
      <div className="work-gallery" data-reveal>
        <div className="work-stack" aria-live="polite">
          {achievementItems.map((item, index) => {
            const depth = (index - activeIndex + achievementItems.length) % achievementItems.length
            const isFront = depth === 0
            const offset = isFront ? 0 : 54
            const scale = isFront ? 1 : 0.9

            return (
              <article
                className={`work-stack-card ${isFront ? 'is-front' : ''}`}
                key={item.title}
                role="button"
                tabIndex={isFront ? 0 : -1}
                aria-label={isFront ? `Show next project after ${item.title}` : item.title}
                onClick={isFront ? () => changeSlide(activeIndex + 1) : undefined}
                onKeyDown={isFront ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    changeSlide(activeIndex + 1)
                  }
                } : undefined}
                style={{
                  transform: `translate3d(calc(-50% + ${offset}px), -50%, 0) scale(${scale})`,
                  opacity: isFront ? 1 : 0.72,
                  zIndex: achievementItems.length - depth,
                }}
              >
                <img className="work-feature-image" src={item.image} alt={item.alt} />
                <div className="work-overlay">
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                </div>
                {isFront && (
                  <div className="work-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(achievementItems.length).padStart(2, '0')}</div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="faq section-shell" aria-labelledby="faq-title">
      <div className="faq-heading" data-reveal>
        <p className="section-label">COMMON QUESTIONS</p>
        <h2 id="faq-title">A considered process, clearly explained.</h2>
      </div>
      <div className="faq-list" data-reveal>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span>{item.question}</span>
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function WhyHeavenIllustration() {
  return (
    <div className="why-heaven-illustration" data-reveal aria-label="Illustration of a considered living room interior">
      <svg viewBox="0 0 640 520" role="img" aria-hidden="true">
        <path className="illustration-wall" d="M52 55h536v356H52z" />
        <path className="illustration-arch" d="M112 298V144c0-42 34-76 76-76s76 34 76 76v154" />
        <path className="illustration-window" d="M149 282V155c0-22 18-40 40-40s40 18 40 40v127" />
        <path className="illustration-window-line" d="M189 116v166M149 196h80" />
        <path className="illustration-floor" d="M52 411h536l-28 54H80z" />
        <path className="illustration-rug" d="m174 397 295 0 60 68H113z" />

        <path className="illustration-cabinet" d="M449 196h91v204h-91z" />
        <path className="illustration-cabinet-top" d="M441 196h107l-8-12H449z" />
        <path className="illustration-cabinet-line" d="M449 270h91M449 338h91M495 196v204" />
        <circle className="illustration-brass" cx="483" cy="232" r="3" />
        <circle className="illustration-brass" cx="507" cy="232" r="3" />
        <circle className="illustration-brass" cx="483" cy="303" r="3" />
        <circle className="illustration-brass" cx="507" cy="303" r="3" />
        <path className="illustration-vase" d="M474 178h28l-4 15h-20z" />
        <path className="illustration-plant" d="M488 178c-2-30 7-55 25-74M489 166c-20-18-33-37-34-61M500 139c18-14 31-30 36-50" />
        <path className="illustration-leaf" d="M513 105c11-12 23-14 28-15-1 10-7 21-24 25M456 107c-10-11-17-22-17-31 12 3 22 12 26 24M502 128c9-14 20-21 30-23-2 13-11 25-26 31" />

        <path className="illustration-lamp" d="M376 179 356 335M336 335h39M345 179h62l-12-37h-38z" />
        <path className="illustration-lamp-glow" d="M350 181h53" />
        <circle className="illustration-brass" cx="366" cy="204" r="4" />

        <path className="illustration-chair" d="M114 315c0-24 19-43 43-43h61c23 0 42 19 42 43v73H114z" />
        <path className="illustration-chair-seat" d="M105 365h118c15 0 27 12 27 27v10H105z" />
        <path className="illustration-chair-leg" d="m127 402-10 49M228 402l10 49" />
        <path className="illustration-chair-detail" d="M141 287v75M233 287v75" />

        <path className="illustration-sofa" d="M191 342c0-27 22-49 49-49h164c27 0 49 22 49 49v56H191z" />
        <path className="illustration-sofa-seat" d="M182 368h289v43H182z" />
        <path className="illustration-sofa-arm" d="M182 349h28v62h-28zM443 349h28v62h-28z" />
        <path className="illustration-sofa-leg" d="m213 411-8 40M442 411l8 40" />
        <path className="illustration-cushion" d="M248 313h61v47h-61zM318 313h61v47h-61zM388 313h42v47h-42z" />

        <path className="illustration-table" d="M273 406h111l-12 25H285z" />
        <path className="illustration-table-leg" d="m295 431-7 31M362 431l7 31" />
        <path className="illustration-table-detail" d="M294 401h69" />
        <circle className="illustration-brass" cx="326" cy="394" r="5" />
      </svg>
    </div>
  )
}

function ShowroomLocation() {
  const { location } = businessKnowledge

  return (
    <section className="showroom-location section-shell" id="showroom" aria-labelledby="showroom-location-title">
      <div className="showroom-location-header" data-reveal>
        <div className="showroom-location-copy">
          <span className="showroom-location-pin" aria-hidden="true"><img src={showroomPinIcon} alt="" /></span>
          <div>
            <p className="section-label">FLAGSHIP SHOWROOM LOCATION</p>
            <h2 id="showroom-location-title">{location.address}</h2>
          </div>
        </div>
        <a
          className="showroom-location-button"
          href={location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${location.businessName} in Google Maps`}
        >
          Open in Google Maps <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('collections')
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [craftVideoPlaying, setCraftVideoPlaying] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const craftVideoRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 24)

      const activeSection = navItems.reduce((currentSection, item) => {
        const section = document.querySelector(item.href)
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.38) {
          return item.href.slice(1)
        }
        return currentSection
      }, 'collections')

      setActiveNavItem(activeSection)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        element.classList.add('in-view')
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((element) => observer.observe(element))

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-story-block]').forEach((block) => {
        const copy = block.querySelector('[data-story-copy]')

        if (copy) {
          gsap.fromTo(
            copy,
            {
              opacity: 0.35,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top 82%',
                end: 'top 35%',
                scrub: 0.5,
              },
            },
          )
        }
      })

      const heroSection = document.querySelector('.hero-video-section')
      const heroShell = document.querySelector('.hero-video-shell')
      const heroCopy = document.querySelector('.hero-video-copy')

      if (heroSection && heroShell && heroCopy) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top 78%',
            end: '+=260',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        })

        heroTimeline.fromTo(
          heroShell,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', ease: 'none' },
          0,
        )
        heroTimeline.fromTo(
          heroCopy,
          { y: 70, opacity: 0.2 },
          { y: 0, opacity: 1, ease: 'none' },
          0,
        )
      }

      const section = document.querySelector('.video-highlight')
      const stage = section?.querySelector('.video-highlight-stage')
      const frame = document.querySelector('.video-frame')
      const text = document.querySelector('.video-cta')

      if (!section || !stage || !frame || !text) {
        return
      }

      if (window.innerWidth >= 860) {
        gsap.set(frame, {
          clearProps: 'all',
        })
        gsap.set(text, { y: 0, opacity: 1 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: '+=600',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        tl.to(text, { y: -120, opacity: 0.15, ease: 'none' }, 0)

        tl.fromTo(
          frame,
          {
            width: 'min(38vw, 420px)',
          },
          {
            width: () => {
              const stageW = stage.clientWidth
              const availableWidth = stageW - text.offsetWidth - 32
              return `${Math.min(stageW * 0.92, availableWidth, 1100)}px`
            },
            ease: 'none',
          },
          0,
        )
      } else {
        gsap.set(frame, { clearProps: 'all' })
        gsap.set(text, { y: 0, opacity: 1 })
      }
    }, '.page-shell')

    ScrollTrigger.refresh()

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <div className="page-shell">
      <header className={`topbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="brand-block">
          <span className="brand-name">HE<span className="brand-accent">A</span>VEN</span>
          <span className="brand-sub">FURNITURE MART</span>
        </div>

        <nav className={`nav desktop-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={activeNavItem === item.href.slice(1) ? 'active' : undefined}
              aria-current={activeNavItem === item.href.slice(1) ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero-video-section" id="collections">
          <div className="hero-video-stage">
            <div className="hero-video-reveal">
            <div className="hero-video-shell">
              <video
                key="hero-video"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Heaven Furniture Mart luxury furniture"
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onPlay={() => setVideoReady(true)}
                onError={() => {
                  if (import.meta.env.DEV) {
                    console.error('Hero video failed to load:', '/images/hero-video.mp4')
                  }
                  setVideoReady(false)
                }}
              >
                <source src="/images/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="hero-video-overlay" />

              <div className="video-status" aria-label={videoReady ? 'Video playing indicator' : 'Video preview loading'}>
                <span className="video-status-dot" aria-hidden="true" />
                <span>{videoReady ? 'PLAYING' : 'PREVIEW'}</span>
              </div>
            </div>
            </div>

            <div className="hero-video-copy">
              <p className="eyebrow">Heaven Furniture Mart</p>
              <h1>Furniture,<br />crafted around you.</h1>
            </div>
          </div>
        </section>

        <section className="collection-intro section-shell">
          <div className="section-head" data-reveal>
            <p className="section-label">DESIGNED. CRAFTED. CUSTOMIZED.</p>
            <h2>Furniture made around the way you live.</h2>
            <p>Heaven Furniture Mart creates bespoke furniture and interior solutions for homes and workspaces in Chattogram. From the first idea to final installation, every piece is shaped around your space, style and requirements.</p>
          </div>
        </section>

        <section className="video-highlight section-shell" id="bespoke">
          <div className="video-highlight-stage">
            <div className="video-frame">
              <video
                ref={craftVideoRef}
                className="is-visible"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={pic2}
                aria-label="Luxury furniture craftsmanship video"
                onCanPlay={() => setCraftVideoPlaying(true)}
                onPlay={() => setCraftVideoPlaying(true)}
                onPause={() => setCraftVideoPlaying(false)}
                onError={() => {
                  if (import.meta.env.DEV) {
                    console.error('Craft video failed to load:', '/images/craft-video.mp4')
                  }
                  setCraftVideoPlaying(false)
                }}
              >
                <source src="/images/craft-video.mp4" type="video/mp4" />
              </video>
              <div className="video-status" aria-label="Video playing indicator">
                <span className="video-status-dot" aria-hidden="true" />
                <span>PLAYING</span>
              </div>
            </div>
            <div className="video-cta">
              <div className="video-cta-content">
                  <p className="section-label">FROM MATERIAL TO MASTERPIECE</p>
                  <h2>Crafted around your space.</h2>
                <p>
                    From the first idea to final installation, every detail is considered for your home.
                </p>
                <button
                  type="button"
                  className="play-button"
                  aria-label={craftVideoPlaying ? 'Pause craftsmanship video' : 'Play craftsmanship video'}
                  onClick={() => {
                    if (craftVideoRef.current?.paused) {
                      craftVideoRef.current.play()
                    } else {
                      craftVideoRef.current?.pause()
                    }
                  }}
                >
                  <Icon name="play" />
                  <span>{craftVideoPlaying ? 'PAUSE THE PROCESS' : 'WATCH THE PROCESS'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="featured section-shell" id="featured-collection">
          <div className="section-head" data-reveal>
            <p className="section-label">OUR COLLECTIONS</p>
            <h2>Pieces with presence.</h2>
            <p>
              Explore a curated selection of furniture designed to bring warmth, character and balance to your space.
            </p>
          </div>

          <div className="storytelling">
            {storyItems.map((item, index) => (
              <article
                key={item.title}
                className={`story-block ${index % 2 === 1 ? 'reverse' : ''}`}
                data-story-block
              >
                <div className="story-media" data-story-media>
                  <div className="story-media-inner">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      data-story-image
                    />
                  </div>
                </div>

                <div className="story-copy" data-story-copy>
                  <div className="story-header">
                    <span className="story-label">{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.tag && (
                    <div className="story-details-row">
                      <span className="story-tag">{item.tag}</span>
                    </div>
                  )}
                  <a href="#contact" className="story-link">
                    VIEW DETAILS <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bespoke-spotlight section-shell">
          <div className="spotlight-copy" data-reveal>
            <p className="section-label">BESPOKE FURNITURE</p>
            <h2>Your Space. Your Measurements. Your Style. Your Furniture.</h2>
            <ul className="detail-list">
              <li>Dimensions</li>
              <li>Materials</li>
              <li>Finishes</li>
              <li>Fabric</li>
              <li>Colors</li>
              <li>Design details</li>
            </ul>
            <a href="#contact" className="button button-primary small-button">
              START YOUR PROJECT <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="spotlight-image" data-reveal>
            <img
              src={pic1}
              alt="Heaven Furniture Mart bespoke furniture"
            />
            <div className="spotlight-note">
              <span>MADE TO MEASURE</span>
              <strong>Every dimension has a reason.</strong>
            </div>
          </div>
        </section>

        <section className="craftsmanship section-shell">
          <div className="craft-heading-stage">
            <div className="section-head narrow-head" data-reveal>
              <p className="section-label">THE HEAVEN STANDARD</p>
              <h2>Details you can feel.</h2>
            </div>
            <span className="heading-particles" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <span className={`heading-particle particle-${index + 1}`} key={index} />
              ))}
            </span>
          </div>

          <div className="craft-layout">
            <FurnitureShowcase />
          </div>
        </section>

        <div className="section-transition" role="separator" aria-label="End of craftsmanship section" />
        <AchievementShowcase />
        <section className="process section-shell">
          <div className="section-head dark-head" data-reveal>
            <p className="section-label">HOW IT WORKS</p>
            <h2>From idea to installation.</h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div className="step-card" key={step.title} data-reveal>
                <div className="step-icon">
                  <Icon name={step.icon} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="why-heaven section-shell">
          <div className="why-heaven-content">
            <div className="why-heaven-copy">
              <div className="section-head" data-reveal>
                <p className="section-label">WHY HEAVEN</p>
                <h2>Thoughtful from start to finish.</h2>
                <p>Every piece begins with listening, then takes shape through considered design, careful craft and a genuinely personal service.</p>
              </div>

              <div className="feature-list" aria-label="Why choose Heaven Furniture Mart">
                {featureList.map((feature) => (
                  <div className="feature-list-item" key={feature.title} data-reveal>
                    <span className="feature-list-marker" aria-hidden="true" />
                    <h3>{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <WhyHeavenIllustration />
          </div>
        </section>

        <ShowroomLocation />

        <section className="showroom-hours section-shell">
          <div className="showroom-hours-heading" data-reveal>
            <span className="showroom-hours-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
                <path d="M4 10h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Z" />
                <path d="M7 19v2m10-2v2M7 14h10" />
              </svg>
            </span>
            <div>
              <p className="section-label">SHOWROOM</p>
              <h2>Showroom Visiting Hours</h2>
              <p>Walk-ins welcome anytime during open hours. No appointment necessary.</p>
            </div>
          </div>
          <div className="showroom-hours-status" data-reveal>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>Open Sat – Thu: 10:00 AM – 9:30 PM <b>•</b> Friday: Closed</span>
          </div>
          <div className="showroom-hours-rule" aria-hidden="true" />
          <div className="showroom-hours-days" data-reveal>
            <div className="showroom-day"><strong>Saturday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day"><strong>Sunday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day"><strong>Monday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day"><strong>Tuesday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day"><strong>Wednesday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day"><strong>Thursday</strong><span>10:00 AM – 9:30 PM</span></div>
            <div className="showroom-day is-closed"><strong>Friday</strong><span>Closed</span></div>
          </div>
        </section>

        <section className="testimonial section-shell">
          <div className="quote-block" data-reveal>
            <div className="quote-meta">
              <div className="quote-avatar">
                <img src="/images/managing-director-h.png" alt="Abul Kalam Bhuiyan, Managing Director" />
              </div>
              <div>
                <strong>Abul Kalam Bhuiyan</strong>
                <span>Managing Director</span>
              </div>
            </div>
          </div>
        </section>

        <FaqSection />

        <section className="final-cta section-shell" id="contact">
          <form className="contact-form" data-reveal onSubmit={(event) => {
            event.preventDefault()
            setFormSubmitted(true)
          }}>
            <div className="form-header">
              <p className="section-label">CONTACT</p>
              <h3>Tell us about your idea.</h3>
            </div>
            <div className="form-grid">
              <label>
                <span>Full Name</span>
                <input type="text" placeholder="Your name" required />
              </label>
              <label>
                <span>Phone Number</span>
                <input type="tel" placeholder="Your phone" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" placeholder="Your email" required />
              </label>
              <label>
                <span>Project Type</span>
                <select defaultValue="" required>
                  <option value="" disabled>Select a project type</option>
                  <option>Living Room</option>
                  <option>Bedroom</option>
                  <option>Dining</option>
                  <option>Office &amp; Study</option>
                  <option>Bespoke Furniture</option>
                  <option>Interior Solution</option>
                </select>
              </label>
              <label className="full-width">
                <span>Project Details</span>
                <textarea rows="4" placeholder="Tell us what you’re imagining" required />
              </label>
            </div>
            <button type="submit" className="button button-primary submit-button">
              {formSubmitted ? 'REQUEST RECEIVED' : 'SEND REQUEST'} <span aria-hidden="true">→</span>
            </button>
            {formSubmitted && <p className="form-success" role="status">Thank you. We’ll be in touch shortly.</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-main">
          <div className="footer-brand" data-reveal>
            <div className="brand-block footer-block">
              <span className="brand-name">HE<span className="brand-accent">A</span>VEN</span>
              <span className="brand-sub">FURNITURE MART</span>
            </div>
            <p className="footer-description">Premium furniture & bespoke craftsmanship designed to elevate your living experience.</p>
          </div>

          <div className="footer-contact" data-reveal>
            <p className="footer-kicker">VISIT / CONTACT</p>
            <div className="footer-contact-list">
              <div className="footer-contact-row"><span className="footer-contact-icon" aria-hidden="true"><Icon name="location" /></span><span>Opposite of RAK Ceramics<br />Agrabad Access Road<br />Chattogram</span></div>
              <a className="footer-contact-row" href="tel:+8801960481983"><span className="footer-contact-icon" aria-hidden="true"><Icon name="phone" /></span><span>+880 1960-481983</span></a>
              <a className="footer-contact-row" href="mailto:heavenfurnituremart@gmail.com"><span className="footer-contact-icon" aria-hidden="true"><Icon name="mail" /></span><span>heavenfurnituremart@gmail.com</span></a>
            </div>
          </div>

          <div className="footer-links" data-reveal>
            <p className="footer-kicker">EXPLORE</p>
            <a href="#collections">Collections <span aria-hidden="true">↗</span></a>
            <a href="#bespoke">Bespoke <span aria-hidden="true">↗</span></a>
            <a href="#showroom">Showroom <span aria-hidden="true">↗</span></a>
            <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
          </div>

          <div className="footer-social" data-reveal>
            <p className="footer-kicker">FOLLOW US</p>
            <div className="footer-social-grid">
              <a href="https://www.facebook.com/HeavenFurnitureMart" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
              <a href="https://www.instagram.com/heaven_furniture_ltd" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
              <a href="https://www.youtube.com/@HeavenFurnitureMart" target="_blank" rel="noreferrer" aria-label="YouTube"><img src={youtubeIcon} alt="" /></a>
              <a href="https://wa.me/8801960481983" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><img src={whatsappIcon} alt="" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Heaven Furniture Mart. All rights reserved.</span>
          <strong>DESIGNED <i aria-hidden="true">•</i> CRAFTED <i aria-hidden="true">•</i> CUSTOMIZED</strong>
        </div>
      </footer>
      <Chatbot />
    </div>
  )
}

export default App
