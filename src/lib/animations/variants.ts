import { Variants } from 'framer-motion'

// Easing functions
export const EASING = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  spring: [0.68, -0.55, 0.265, 1.55],
}

// Duration constants (in seconds)
export const DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
}

/**
 * Fade in from bottom with upward motion
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: DURATIONS.fast },
  },
}

/**
 * Fade in from top with downward motion
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Scale in from center with fade
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Stagger container for child animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Stagger grid - faster stagger for grids
 */
export const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Child variant for staggered animations
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Float animation - continuous subtle up/down motion
 */
export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * Glow pulse animation
 */
export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 85, 255, 0.3)',
      '0 0 40px rgba(0, 85, 255, 0.6)',
      '0 0 20px rgba(0, 85, 255, 0.3)',
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * Text reveal - for headline animations
 */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
      delay: custom * 0.05,
    },
  }),
}

/**
 * Hover scale effect
 */
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING.smooth,
    },
  },
}

/**
 * Tap/click animation
 */
export const tapScale: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: {
      duration: DURATIONS.fast,
    },
  },
}

/**
 * Button press animation with glow
 */
export const buttonPress: Variants = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(0, 85, 255, 0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(0, 85, 255, 0.4)',
    transition: {
      duration: DURATIONS.fast,
      ease: EASING.smooth,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 0 10px rgba(0, 85, 255, 0.2)',
    transition: {
      duration: DURATIONS.fast,
    },
  },
}

/**
 * Card hover - lift and glow
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 50px rgba(0, 85, 255, 0.3)',
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Number counter animation - for stat cards
 */
export const numberCounter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.slow,
    },
  },
}

/**
 * Timeline item - alternate left/right
 */
export const timelineItemLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

export const timelineItemRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}

/**
 * Scroll reveal - triggered by scroll animations
 */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.smooth,
    },
  },
}
