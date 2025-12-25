import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  lerp?: number
  smoothTouch?: boolean
  touchMultiplier?: number
}

/**
 * Hook to initialize smooth scrolling with Lenis
 * Should be called once in your main app component
 */
export const useSmoothScroll = (options: LenisOptions = {}) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const {
      duration = 0.8, // Reduced for lower latency
      easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp = 0.15, // Increased for snappier response
      smoothTouch = false,
      touchMultiplier = 1.5,
    } = options

    try {
      // Initialize Lenis with optimized settings
      const lenis = new Lenis({
        duration,
        easing,
        lerp,
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch,
        touchMultiplier,
      })

      lenisRef.current = lenis

      // RAF loop for Lenis - optimized
      let frameId: number

      const raf = (time: number) => {
        lenis.raf(time)
        frameId = requestAnimationFrame(raf)
      }

      frameId = requestAnimationFrame(raf)

      return () => {
        cancelAnimationFrame(frameId)
        try {
          lenis.destroy()
        } catch (e) {
          // Handle cleanup errors
        }
      }
    } catch (error) {
      console.warn('Lenis initialization failed:', error)
      return () => {}
    }
  }, [])

  return lenisRef.current
}

/**
 * Hook to scroll to a specific element or position
 */
export const useScrollTo = () => {
  return (target: string | HTMLElement | { top: number; left: number }, options?: { duration?: number }) => {
    const lenis = new Lenis()

    if (typeof target === 'string') {
      const element = document.querySelector(target)
      if (element) {
        lenis.scrollTo(element, options)
      }
    } else if (target instanceof HTMLElement) {
      lenis.scrollTo(target, options)
    } else {
      lenis.scrollTo(target, options)
    }
  }
}
