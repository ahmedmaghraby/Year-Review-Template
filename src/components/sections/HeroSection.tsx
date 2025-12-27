import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@lib/animations/variants'
import lendoLogo from '../../assets/lendo_logo.png'

/**
 * Hero section with typing effect that reveals each line step by step
 * Background starfield is handled by Layout component
 */
export const HeroSection: React.FC = () => {
  const lines = [
    'In 2025, Lendo became stronger than the sun\'s gravity.',
    'We made the Earth swim through the universe of digital financing.',
    'Powered by the strength of our engineering team.',
    'And I\'m just one small gear in this great machine.',
    'Let\'s explore what I built in 2025.',
  ]

  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    // Disable scrolling while typing is in progress
    if (currentLineIndex < lines.length) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scrolling when typing is complete
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
      setShowScrollIndicator(true)
    }
  }, [currentLineIndex, lines.length, showScrollIndicator])

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      return
    }

    const currentLine = lines[currentLineIndex]
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = ''
          }
          newLines[currentLineIndex] += currentLine[currentCharIndex]
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, 30) // Typing speed

      return () => clearTimeout(timeout)
    } else {
      // Move to next line after a delay
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, 400) // Delay before next line

      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, lines])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen px-6 pt-24 overflow-hidden"
    >
      {/* Animated background gradients overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-blue/15 to-transparent blur-3xl" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-brand-skyblue/15 to-transparent blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Company Logo */}
        <motion.div className="flex justify-center mb-8" variants={fadeInUp}>
          <img
            src={lendoLogo}
            alt="Company Logo"
            className="w-16 h-16 rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl gradient-text-accent"
          variants={fadeInUp}
        >
          2025 Impact
        </motion.h1>

        {/* Typing effect lines */}
        <div className="flex flex-col justify-center mb-8 text-xl leading-relaxed md:text-2xl text-brand-skyblue min-h-48">
          <AnimatePresence mode="popLayout">
            {displayedLines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 last:mb-0"
              >
                {line}
                {idx === currentLineIndex && currentCharIndex < lines[idx].length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-1 h-6 ml-1 bg-brand-skyblue"
                  />
                )}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Text - appears after typing is done */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#stats')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-brand-blue to-brand-skyblue hover:shadow-lg hover:shadow-brand-blue/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Impact
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll indicator - appears after typing is complete */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="absolute -translate-x-1/2 bottom-8 left-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-brand-skyblue/60">Scroll to explore</p>
              <svg
                className="w-6 h-6 text-brand-skyblue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
