import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@lib/utils/cn'

interface GlassCardProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'light' | 'dark'
  hover?: boolean
  glow?: boolean
  glowColor?: 'blue' | 'orange' | 'purple'
}

/**
 * Reusable glassmorphism card component
 * Features backdrop blur, subtle borders, and optional hover effects
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      hover = false,
      glow = false,
      glowColor = 'blue',
      ...motionProps
    },
    ref
  ) => {
    const glowClasses = {
      blue: 'hover:glow-blue-lg',
      orange: 'hover:shadow-orange-500/50',
      purple: 'hover:shadow-purple-500/50',
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass rounded-2xl p-6 transition-all duration-300',
          {
            'default': 'bg-brand-darkblue/50 backdrop-blur-md border border-brand-blue/20',
            'light': 'bg-white/10 backdrop-blur-sm border border-white/20',
            'dark': 'bg-brand-darkblue/80 backdrop-blur-lg border border-brand-blue/10',
          }[variant],
          {
            [`${glowClasses[glowColor]} cursor-pointer`]: hover,
            [`glow-blue`]: glow && glowColor === 'blue',
          },
          className
        )}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ duration: 0.3 }}
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'
