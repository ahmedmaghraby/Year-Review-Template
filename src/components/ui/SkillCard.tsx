import React from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { useInView } from '@hooks/useInView'
import { cardHover } from '@lib/animations/variants'

interface SkillCardProps {
  title: string
  description: string
  icon: string
  skills: string[]
  delay?: number
}

/**
 * Skill card displaying a key skill area with related technologies
 */
export const SkillCard: React.FC<SkillCardProps> = ({ title, description, icon, skills, delay = 0 }) => {
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
          <div className="text-5xl">{icon}</div>

          {/* Title and Description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-brand-skyblue/70">{description}</p>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-blue/20">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-xs text-brand-skyblue border border-brand-blue/20 hover:border-brand-blue/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
