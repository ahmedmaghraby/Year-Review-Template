import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@lib/animations/variants'
import { StarCollectorGame } from './StarCollectorGame'

/**
 * Closing section with call-to-action and interactive game
 */
export const ClosingSection: React.FC = () => {
  return (
    <section id="closing" className="relative px-6 py-20 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-brand-blue/10 to-brand-skyblue/10 blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Statement */}
        <motion.h2 className="mb-6 text-5xl font-bold md:text-6xl gradient-text-accent" variants={fadeInUp}>
          2025 was about scale, ownership, and impact.
        </motion.h2>

        {/* Description */}
        <motion.p className="mb-12 text-lg leading-relaxed md:text-xl text-brand-skyblue/80" variants={fadeInUp}>
          Building scalable systems, taking ownership of architectural decisions, and delivering measurable impact across
          production environments.
        </motion.p>

        {/* Divider */}
        <motion.div className="h-px my-12 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />

        {/* Footer Text */}
        <motion.p className="mb-12 text-sm text-brand-skyblue/50" variants={fadeInUp}>
          Let's ready for an even bigger 2026!
        </motion.p>
                {/* Game Section */}
        <motion.div variants={fadeInUp}>
          <StarCollectorGame />
        </motion.div>

        {/* Divider */}
        <motion.div className="h-px my-12 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" variants={fadeInUp} />

        {/* Closing Message */}
        <motion.div className="text-center" variants={fadeInUp}>
          <p className="mb-2 text-sm text-brand-skyblue/60">Best of luck</p>
          <h3 className="text-3xl font-bold md:text-4xl gradient-text-accent">Ahmed Maghraby</h3>
        </motion.div>

      </motion.div>
    </section>
  )
}
