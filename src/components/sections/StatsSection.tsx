import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
  AnimatePresence,
} from 'framer-motion'

const stats = [
  {
    id: 'contributions',
    icon: '🚀',
    value: 833,
    label: 'Lines of Impact',
    description: 'Every commit tells a story of innovation',
    gradient: 'from-green-400 via-green-300 to-emerald-400',
    accentColor: '#FBEC80',
    particleCount: 20,
  },
  {
    id: 'pushes',
    icon: '🔁',
    value: 618,
    label: 'Iterations to Excellence',
    description: 'Continuous refinement and deployment cycles',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    accentColor: '#06b6d4',
    particleCount: 18,
  },
  {
    id: 'mrs',
    icon: '🔀',
    value: 210,
    label: 'Code Reviews Mastered',
    description: 'Collaborative solutions that shipped to production',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    accentColor: '#89E985',
    particleCount: 15,
  },
  {
    id: 'work-items',
    icon: '✅',
    value: 360,
    suffix: '+',
    label: 'Work Items',
    description: 'Tasks and deliverables completed throughout 2025',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: '#f59e0b',
    particleCount: 12,
  },
]

/**
 * Ultra-modern Stats section with 3D effects and interactive counters
 */
export const StatsSection = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="relative px-6 py-20 overflow-hidden md:py-32" ref={sectionRef}>
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Epic Section Header */}
        <motion.div
          className="relative mb-20 text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated year badge */}
          <motion.div
            className="relative inline-block mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              type: 'spring',
              stiffness: 150,
              damping: 12,
            }}
          >
            <motion.div
              className="relative px-8 py-3 overflow-hidden border rounded-full border-green-500/30 bg-gradient-to-r from-green-600/20 via-green-600/20 to-emerald-600/20 backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType:'mirror',
                  repeatDelay: 3,
                  ease: 'linear',

                }}
              />
              <span className="relative text-sm font-bold tracking-wider text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                2025 Numbers
              </span>
            </motion.div>
          </motion.div>

          {/* Main title with stagger effect */}
          <div className="relative inline-block">
            <h2 className="mb-6 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
              {['My', 'Year', 'in', 'Code'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4 md:mr-6"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : { opacity: 0, y: 50, rotateX: -90 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="text-transparent bg-gradient-to-br from-white via-green-100 to-emerald-200 bg-clip-text drop-shadow-2xl">
                    {word}
                  </span>
                </motion.span>
              ))}
            </h2>

            {/* Glowing underline */}
            <motion.div
              className="absolute h-1 rounded-full -bottom-2 left-1/2 bg-gradient-to-r from-transparent via-green-500 to-transparent"
              initial={{ width: 0, x: '-50%' }}
              animate={isInView ? { width: '80%', x: '-50%' } : { width: 0, x: '-50%' }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{
                boxShadow: '0 0 20px rgba(137, 233, 133, 0.5)',
              }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="max-w-3xl mx-auto mt-8 text-xl font-light text-green-300/60 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Every number represents{' '}
            <span className="font-semibold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
              hours of passion
            </span>
            , countless iterations, and real impact
          </motion.p>
        </motion.div>

        {/* Stats Grid with 3D perspective */}
        <motion.div
          className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          style={{ perspective: 2000 }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 1.2,
              },
            },
          }}
        >
          {stats.map((stat) => (
            <EnhancedStatCard
              key={stat.id}
              stat={stat}
              isActive={activeCard === stat.id}
              onHover={() => setActiveCard(stat.id)}
              onLeave={() => setActiveCard(null)}
            />
          ))}
        </motion.div>

        {/* Floating achievement badges */}
        <FloatingBadges />
      </div>

      {/* Epic background effects */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none"> */}
        {/* Animated gradient orbs */}
        {/* <motion.div
          className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-green-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        /> */}

        {/* Grid overlay */}
        {/* <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(137, 233, 133, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(137, 233, 133, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div> */}
    </section>
  )
}

interface StatData {
  id: string
  icon: string
  value: number
  label: string
  description: string
  gradient: string
  accentColor: string
  particleCount: number
  prefix?: string
  suffix?: string
}

const EnhancedStatCard = ({ stat, isActive, onHover, onLeave }: { stat: StatData; isActive: boolean; onHover: () => void; onLeave: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, { once: true })
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Counter animation
  useEffect(() => {
    if (isCardInView && !hasAnimated) {
      setHasAnimated(true)
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCount(stat.value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isCardInView, hasAnimated, stat.value])

  // 3D mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    onLeave()
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
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
      ref={cardRef}
      variants={cardVariants}
      className="relative group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={onHover}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <div
          className="relative p-8 overflow-hidden rounded-3xl backdrop-blur-xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-500`}
            style={{
              mixBlendMode: 'overlay',
              opacity: isActive ? 0.15 : 0,
            }}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${stat.accentColor}60, transparent)`,
              opacity: 0,
            }}
            animate={{
              opacity: isActive ? 0.4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Particle burst effect */}
          <AnimatePresence>
            {isActive && <ParticleBurst color={stat.accentColor} count={stat.particleCount} />}
          </AnimatePresence>

          <div className="relative z-10">
            {/* Icon with 3D bounce */}
            <motion.div
              className="relative inline-block mb-6 text-6xl"
              animate={{
                rotateY: isActive ? [0, 15, -15, 0] : 0,
                scale: isActive ? [1, 1.15, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute transition-opacity duration-500 rounded-full opacity-0 -inset-4 blur-2xl"
                style={{
                  background: stat.accentColor,
                  opacity: isActive ? 0.6 : 0,
                }}
              />
              <span className="relative drop-shadow-2xl filter">{stat.icon}</span>
            </motion.div>

            {/* Counter with gradient */}
            <div className="mb-4">
              <motion.div
                className="text-6xl font-black tracking-tight md:text-7xl"
                style={{
                  background: `linear-gradient(135deg, ${stat.accentColor}, white)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(137, 233, 133, 0.3))',
                }}
              >
                {stat.prefix}
                {stat.value.toLocaleString()}
                {stat.suffix || ''}
              </motion.div>

              {/* Progress bar */}
              <motion.div
                className="h-1 mt-3 overflow-hidden rounded-full bg-white/10"
                initial={{ scaleX: 0 }}
                animate={isCardInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: stat.accentColor }}
                  initial={{ scaleX: 0 }}
                  animate={isCardInView ? { scaleX: count / stat.value } : { scaleX: 0 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </motion.div>
            </div>

            {/* Label */}
            <h3 className="mb-2 text-xl font-bold tracking-tight text-white">{stat.label}</h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-green-300/60">{stat.description}</p>

            {/* Decorative corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{
                background: `radial-gradient(circle at top right, ${stat.accentColor}, transparent 70%)`,
              }}
              animate={{
                scale: isActive ? 1.5 : 1,
                opacity: isActive ? 0.2 : 0.1,
              }}
            />

            {/* Interactive indicator */}
            <motion.div
              className="absolute flex items-center gap-1 text-xs bottom-4 right-4"
              style={{ color: stat.accentColor }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 10,
              }}
            >
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                →
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Particle burst animation
const ParticleBurst = ({ color, count }: { color: string; count: number }) => {
  const particles = [...Array(count)].map((_, i) => {
    const angle = (i / count) * Math.PI * 2
    return {
      id: i,
      x: Math.cos(angle) * 100,
      y: Math.sin(angle) * 100,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.2,
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full left-1/2 top-1/2"
          style={{
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Floating achievement badges
const FloatingBadges = () => {
  const badges = [
    { icon: '⭐', label: 'Top Performer', delay: 0 },
    { icon: '🏆', label: 'Code Quality', delay: 0.5 },
    { icon: '🎯', label: 'Goal Crusher', delay: 1 },
    { icon: '💎', label: 'Innovation', delay: 1.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute"
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + (i % 2) * 70}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [20, -40, -100],
            x: [0, (i % 2 ? 1 : -1) * 30, 0],
            rotate: [0, (i % 2 ? 1 : -1) * 20, 0],
          }}
          transition={{
            duration: 4,
            delay: badge.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full border-green-500/30 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm">
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-sm font-semibold text-green-300">{badge.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
