import { useEffect, useState } from 'react'

/**
 * Hook to detect if a media query matches
 * Useful for responsive behavior
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Avoid SSR issues by checking if window exists
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia(query)

    // Set initial state
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    setIsReady(true)

    // Create a listener
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // Legacy support
      media.addListener(listener)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [query])

  // Return false until ready to avoid hydration mismatch
  return isReady ? matches : false
}

// Convenience hooks for common breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1440px)')

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * Hook to detect dark mode preference
 */
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
