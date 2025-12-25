import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@lib/animations/variants'

/**
 * Closing section with call-to-action
 */
export const ClosingSection: React.FC = () => {
  return (
    <section id="closing" className="relative py-20 px-6 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-blue/10 to-brand-skyblue/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Statement */}
        <motion.h2 className="mb-6 text-5xl md:text-6xl font-bold gradient-text-accent" variants={fadeInUp}>
          2025 was about scale, ownership, and impact.
        </motion.h2>

        {/* Description */}
        <motion.p className="mb-12 text-lg md:text-xl text-brand-skyblue/80 leading-relaxed" variants={fadeInUp}>
          Building scalable systems, taking ownership of architectural decisions, and delivering measurable impact across
          production environments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-skyblue text-white font-semibold hover:shadow-lg hover:shadow-brand-blue/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg bg-brand-darkblue/50 border border-brand-blue/30 text-brand-skyblue font-semibold hover:border-brand-blue/60 hover:bg-brand-darkblue/80 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect with Me
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div className="my-12 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />

        {/* Footer Text */}
        <motion.p className="text-sm text-brand-skyblue/50" variants={fadeInUp}>
          Let's build something amazing together
        </motion.p>
      </motion.div>
    </section>
  )
}
