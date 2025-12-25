import React from 'react'
import { motion } from 'framer-motion'
import { StatCard } from '@components/ui/StatCard'
import { stats } from '@data/stats'

/**
 * Stats section showcasing 2025 achievements
 * Displays animated counters for key metrics
 */
export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="relative py-20 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-bold gradient-text">2025 Impact by Numbers</h2>
          <p className="text-lg text-brand-skyblue/70">Quantified contributions and achievements across all projects</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              suffix={stat.suffix || ''}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-skyblue/5 to-transparent rounded-full blur-3xl -z-10" />
      </div>
    </section>
  )
}
