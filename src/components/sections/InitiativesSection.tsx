import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@components/ui/GlassCard'
import { useInView } from '@hooks/useInView'

interface Initiative {
  id: number
  title: string
  description: string
  icon: string
  tags: string[]
  highlight: string
  gradient: string
  accentColor: string
  stats: Record<string, string>
}

interface InitiativeCardProps {
  initiative: Initiative
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const initiatives: Initiative[] = [
  {
    id: 1,
    title: 'Customer RAG Chatbot',
    description: 'AI-powered customer support chatbot using Retrieval-Augmented Generation',
    icon: '🤖',
    tags: ['LangChain', 'Transformers', 'Python'],
    highlight: 'Proof of Concept',
    gradient: 'from-cyan-500 via-blue-500 to-purple-600',
    accentColor: '#06b6d4',
    stats: { responseTime: '1.2s' },
  },
  {
    id: 2,
    title: 'Email Signature Tool',
    description:
      '20+ employees actively using this tool to generate branded email signatures dynamically',
    icon: '✉️',
    tags: ['React'],
    highlight: '20+ Active Users',
    gradient: 'from-pink-500 via-rose-500 to-orange-500',
    accentColor: '#ec4899',
    stats: { users: '20+' },
  },
  {
    id: 3,
    title: 'Planning-Agile-Poker',
    description: 'Interactive planning poker tool for estimating work across teams',
    icon: '🎯',
    tags: ['React', 'WebSockets', 'Firebase'],
    highlight: '50+ Sessions • 550 Rounds',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10b981',
    stats: { sessions: '50+', rounds: '550+' },
  },
]

/**
 * Ultra-modern Initiatives section with 3D hover effects and magnetic interactions
 */
export const InitiativesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef(null)

  return (
    <section id="initiatives" className="relative px-6 py-20 overflow-hidden md:py-32">
      <div className="mx-auto max-w-7xl" ref={containerRef}>
        {/* Animated Section Header */}
        <motion.div
          className="relative z-10 mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 opacity-50 animate-pulse bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl" />
              <span className="relative text-6xl">⚡</span>
            </div>
          </motion.div>

          <h2 className="relative mb-6 text-5xl font-black tracking-tight md:text-7xl">
            <motion.span
              className="inline-block text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text"
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Key Initiatives
            </motion.span>
          </h2>

          <motion.p
            className="max-w-2xl mx-auto text-xl font-light text-cyan-300/60 md:text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Individual POCs with{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              real impact
            </span>{' '}
            and adoption
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="w-32 h-1 mx-auto mt-8 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Initiatives Grid with Stagger */}
        <motion.div
          className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {initiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              isHovered={hoveredCard === initiative.id}
              onHover={() => setHoveredCard(initiative.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>

        {/* Floating Elements Background */}
        <FloatingElements />
      </div>

      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 rounded-full left-1/4 h-96 w-96 bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 rounded-full right-1/4 h-96 w-96 bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  )
}

const InitiativeCard = ({ initiative, isHovered, onHover, onLeave }: InitiativeCardProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Magnetic hover effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
        },
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        ref={cardRef}
        className="relative h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={onHover}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              className="relative h-full"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                hover
                glow
                glowColor="blue"
                className="relative h-full overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
              >
                {/* Gradient Overlay on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${initiative.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                  style={{ mixBlendMode: 'screen' }}
                />

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${initiative.accentColor}40, transparent)`,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: isHovered ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 flex flex-col h-full p-8">
                  {/* Icon with 3D effect */}
                  <motion.div
                    className="relative mb-6"
                    animate={{
                      rotateY: isHovered ? [0, 10, -10, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.div
                      className="absolute transition-opacity duration-500 rounded-full opacity-0 -inset-4 blur-2xl group-hover:opacity-50"
                      style={{ background: initiative.accentColor }}
                    />
                    <span className="relative block text-7xl drop-shadow-2xl filter">
                      {initiative.icon}
                    </span>
                  </motion.div>

                  {/* Title with shimmer effect */}
                  <h3 className="relative mb-3 text-2xl font-bold">
                    <motion.span
                      className="text-transparent bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text"
                      style={{ backgroundSize: '200% 100%' }}
                      animate={{
                        backgroundPosition: isHovered ? ['0% 50%', '100% 50%'] : '0% 50%',
                      }}
                      transition={{
                        duration: 2,
                        ease: 'linear',
                      }}
                    >
                      {initiative.title}
                    </motion.span>
                  </h3>

                  {/* Highlight badge */}
                  <motion.div
                    className="relative inline-flex items-center gap-2 px-4 py-2 mb-6 overflow-hidden rounded-full"
                    style={{
                      background: `${initiative.accentColor}20`,
                      border: `1px solid ${initiative.accentColor}40`,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: initiative.accentColor, opacity: 0 }}
                      animate={{
                        opacity: isHovered ? 0.1 : 0,
                      }}
                    />
                    <span
                      className="relative text-xs font-semibold tracking-wide"
                      style={{ color: initiative.accentColor }}
                    >
                      {initiative.highlight}
                    </span>
                  </motion.div>

                  {/* Description */}
                  <p className="flex-grow mb-6 leading-relaxed text-cyan-200/70">
                    {initiative.description}
                  </p>

                  {/* Stats Section */}
                  <div className="flex gap-4 mb-6">
                    {Object.entries(initiative.stats).map(([key, value]) => (
                      <motion.div
                        key={key}
                        className="relative flex-1 p-3 overflow-hidden rounded-lg"
                        style={{
                          background: 'rgba(15, 23, 42, 0.5)',
                          border: '1px solid rgba(148, 163, 184, 0.1)',
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="mb-1 text-xs tracking-wider uppercase text-cyan-400/60">
                          {key}
                        </div>
                        <div className="text-lg font-bold text-white">{value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tags with stagger animation */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {initiative.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                        style={{
                          background: `${initiative.accentColor}15`,
                          border: `1px solid ${initiative.accentColor}30`,
                          color: initiative.accentColor,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.1,
                          background: `${initiative.accentColor}25`,
                          border: `1px solid ${initiative.accentColor}60`,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Click indicator */}
                  <motion.div
                    className="absolute flex items-center gap-1 text-xs bottom-4 right-4 text-cyan-400/40"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 10,
                    }}
                  >
                    <span>Click to flip</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Particle effect on hover */}
                {isHovered && <ParticleEffect color={initiative.accentColor} />}
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className="relative h-full"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                className="h-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `2px solid ${initiative.accentColor}40`,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <motion.div
                    className="mb-6 text-6xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✨
                  </motion.div>
                  <h4 className="mb-4 text-2xl font-bold text-white">More details coming soon</h4>
                  <p className="mb-6 text-cyan-200/60">
                    This initiative is making waves across the organization
                  </p>
                  <motion.button
                    className="px-6 py-3 font-semibold rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${initiative.accentColor}, ${initiative.accentColor}CC)`,
                      color: 'white',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Floating decorative elements
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Particle effect component
const ParticleEffect = ({ color }: { color: string }) => {
  const particles = [...Array(12)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -50, -100],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
