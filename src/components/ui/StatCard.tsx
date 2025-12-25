import React from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { AnimatedCounter } from './AnimatedCounter'
import { useInView } from '@hooks/useInView'
import { cardHover } from '@lib/animations/variants'

interface StatCardProps {
  icon: string
  value: number
  label: string
  description: string
  suffix?: string
  prefix?: string
  delay?: number
}

/**
 * Stat card with animated counter
 * Displays a key metric with icon and description
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  description,
  suffix = '',
  delay = 0,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <GlassCard
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        hover
        glow
        glowColor="blue"
        className="h-full"
      >
        <div className="flex flex-col gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 text-2xl rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-skyblue/20">
            {icon}
          </div>

          {/* Value */}
          <div>
            <div className="text-3xl font-bold gradient-text-accent">
              <AnimatedCounter end={value} duration={2000} suffix={suffix} />
            </div>
          </div>

          {/* Label and Description */}
          <div>
            <h3 className="mb-1 text-lg font-semibold text-white">{label}</h3>
            <p className="text-sm text-brand-skyblue/70">{description}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
