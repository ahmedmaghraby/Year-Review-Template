import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@lib/animations/variants'

/**
 * Hero section with animated headline
 * Background starfield is handled by Layout component
 */
export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Animated background gradients overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-blue/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-brand-skyblue/15 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Company Logo */}
        <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
          <img
            src="https://avatars.slack-edge.com/2025-12-25/10188570210482_7af0ee05f4c154f1c74d_88.png"
            alt="Company Logo"
            className="h-16 w-16 rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text-accent"
          variants={fadeInUp}
        >
          2025 Engineering Impact
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-brand-skyblue mb-8 leading-relaxed"
          variants={fadeInUp}
        >
          6+ production projects • Individual POCs • Micro-Frontend Architecture
        </motion.p>

        {/* CTA Text */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeInUp}
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#stats')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-skyblue text-white font-semibold hover:shadow-lg hover:shadow-brand-blue/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Impact
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-brand-skyblue/60">Scroll to explore</p>
          <svg className="w-6 h-6 text-brand-skyblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
