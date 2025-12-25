import React, { useEffect, useState } from 'react'
import { useInView } from '@hooks/useInView'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

/**
 * Animated counter component
 * Counts from 0 to end value when entering viewport
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const { ref, isInView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCounter = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing: ease-out-quart
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      const currentValue = end * easeProgress

      if (decimals > 0) {
        setDisplayValue(parseFloat(currentValue.toFixed(decimals)))
      } else {
        setDisplayValue(Math.round(currentValue))
      }

      if (now < endTime) {
        requestAnimationFrame(updateCounter)
      } else {
        setDisplayValue(end)
      }
    }

    const frameId = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(frameId)
  }, [isInView, end, duration, decimals])

  const formattedValue = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
