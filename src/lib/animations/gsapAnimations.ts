import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Create a scroll-triggered fade and slide animation
 * Useful for section reveals
 */
export const createScrollAnimation = (
  trigger: string,
  elements: string,
  options: {
    start?: string
    end?: string
    scrub?: boolean | number
    stagger?: number
  } = {}
) => {
  const { start = 'top 80%', end = 'bottom 20%', scrub = false, stagger = 0.1 } = options

  return gsap.from(elements, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger,
    ease: 'power3.out',
  })
}

/**
 * Animate SVG line drawing (like a timeline connector)
 */
export const drawLine = (
  element: string,
  options: {
    duration?: number
    delay?: number
  } = {}
) => {
  const { duration = 1.5, delay = 0 } = options

  return gsap.fromTo(
    element,
    { strokeDashoffset: 1000 },
    {
      strokeDashoffset: 0,
      duration,
      delay,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

/**
 * Stagger reveals for grid/list items
 */
export const staggerReveal = (
  items: string,
  options: {
    stagger?: number
    duration?: number
    delay?: number
  } = {}
) => {
  const { stagger = 0.1, duration = 0.6, delay = 0 } = options

  return gsap.from(items, {
    opacity: 0,
    y: 30,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: items,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  })
}

/**
 * Parallax scroll effect
 */
export const parallax = (
  element: string,
  speed: number = 0.5,
  options: {
    start?: string
  } = {}
) => {
  const { start = 'top center' } = options

  gsap.to(element, {
    y: window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      start,
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
    ease: 'none',
  })
}

/**
 * Scroll-triggered counter animation
 * Works with numeric elements
 */
export const animateCounter = (
  element: string,
  endValue: number,
  options: {
    duration?: number
    start?: string
  } = {}
) => {
  const { duration = 2, start = 'top 80%' } = options
  const obj = { value: 0 }

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none reverse',
    },
    onUpdate() {
      const el = document.querySelector(element)
      if (el) {
        el.textContent = Math.round(obj.value).toLocaleString()
      }
    },
  })
}

/**
 * Scroll progress indicator
 */
export const scrollProgress = (progressBar: string) => {
  gsap.to(progressBar, {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const el = document.querySelector(progressBar) as HTMLElement
        if (el) {
          el.style.width = `${self.progress * 100}%`
        }
      },
    },
  })
}

/**
 * Flip card animation
 */
export const flipCard = (element: string) => {
  const tl = gsap.timeline()

  tl.to(element, {
    rotationY: 360,
    duration: 0.8,
    ease: 'back.out',
  })

  return tl
}

/**
 * Rotate element continuously
 */
export const rotateInfinite = (element: string, duration: number = 8) => {
  return gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'none',
  })
}

/**
 * Create a timeline sequence
 */
export const createTimeline = () => {
  return gsap.timeline()
}

/**
 * Add to timeline with delay
 */
export const addToTimeline = (
  timeline: gsap.core.Timeline,
  target: string,
  vars: gsap.TweenVars,
  position?: string | number
) => {
  return timeline.to(target, vars, position)
}

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (
  target: string | HTMLElement,
  options: {
    duration?: number
    offset?: number
  } = {}
) => {
  const { duration = 1.5, offset = 0 } = options

  const element = typeof target === 'string' ? document.querySelector(target) : target

  if (!element) return

  const rect = element.getBoundingClientRect()
  const offsetTop = rect.top + window.scrollY - offset

  gsap.to(window, {
    scrollTo: {
      y: offsetTop,
      autoKill: true,
    },
    duration,
    ease: 'power3.inOut',
  })
}

/**
 * Shake animation
 */
export const shake = (
  element: string,
  options: {
    intensity?: number
    duration?: number
  } = {}
) => {
  const { intensity = 10, duration = 0.4 } = options
  const tl = gsap.timeline()

  for (let i = 0; i < 6; i++) {
    tl.to(
      element,
      {
        x: (Math.random() - 0.5) * intensity * 2,
        y: (Math.random() - 0.5) * intensity * 2,
        duration: duration / 6,
      },
      0
    )
  }

  tl.to(element, { x: 0, y: 0, duration: duration / 6 }, '-=0.05')

  return tl
}
