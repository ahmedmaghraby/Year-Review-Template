import { useEffect, useState } from 'react'

/**
 * Hook to animate a counter from 0 to a target value
 * Uses requestAnimationFrame for smooth animations
 */
export const useAnimatedCounter = (end: number, duration = 2000, shouldStart = false) => {
  const [value, setValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!shouldStart) {
      setValue(0)
      return
    }

    setIsAnimating(true)
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCounter = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function: ease-out-quart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(end * easeProgress))

      if (now < endTime) {
        requestAnimationFrame(updateCounter)
      } else {
        setValue(end)
        setIsAnimating(false)
      }
    }

    const frameId = requestAnimationFrame(updateCounter)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [end, duration, shouldStart])

  return { value, isAnimating }
}

/**
 * Hook to format and animate a counter with custom formatting
 */
export const useFormattedCounter = (
  end: number,
  duration = 2000,
  shouldStart = false,
  formatter?: (value: number) => string
) => {
  const { value, isAnimating } = useAnimatedCounter(end, duration, shouldStart)
  const [formatted, setFormatted] = useState('0')

  useEffect(() => {
    if (formatter) {
      setFormatted(formatter(value))
    } else {
      // Default formatter: add thousands separator
      setFormatted(value.toLocaleString())
    }
  }, [value, formatter])

  return { value, formatted, isAnimating }
}
