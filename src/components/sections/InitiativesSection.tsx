import React from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@components/ui/GlassCard'
import { useInView } from '@hooks/useInView'
import { cardHover } from '@lib/animations/variants'

const initiatives = [
  {
    id: 1,
    title: 'Customer RAG Chatbot',
    description: 'AI-powered customer support chatbot using Retrieval-Augmented Generation',
    icon: '🤖',
    tags: ['LangChain', 'OpenAI', 'React', 'Python'],
    highlight: 'Proof of Concept',
  },
  {
    id: 2,
    title: 'Lendo Email Signature Generator',
    description: '20+ employees actively using this tool to generate branded email signatures dynamically',
    icon: '✉️',
    tags: ['React', 'Canvas API', 'Node.js'],
    highlight: '20+ Active Users',
  },
  {
    id: 3,
    title: 'Planning-Agile-Poker',
    description: 'Interactive planning poker tool for estimating work across teams',
    icon: '🎯',
    tags: ['React', 'WebSockets', 'Firebase'],
    highlight: '50+ Sessions • 550 Rounds',
  },
]

/**
 * Initiatives section showcasing individual POC projects
 */
export const InitiativesSection: React.FC = () => {
  return (
    <section id="initiatives" className="relative py-20 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-bold gradient-text">Key Initiatives</h2>
          <p className="text-lg text-brand-skyblue/70">Individual POCs with real impact and adoption</p>
        </motion.div>

        {/* Initiatives Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {initiatives.map((initiative, index) => (
            <InitiativeCard key={initiative.id} initiative={initiative} delay={index * 0.15} />
          ))}
        </motion.div>

        {/* Decorative background */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-brand-skyblue/5 to-transparent rounded-full blur-3xl -z-10" />
      </div>
    </section>
  )
}

interface InitiativeCardProps {
  initiative: (typeof initiatives)[0]
  delay?: number
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      <GlassCard
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        hover
        glow
        glowColor="blue"
        className="h-full flex flex-col"
      >
        <div className="flex flex-col gap-6 h-full">
          {/* Icon and Title */}
          <div>
            <div className="text-5xl mb-4">{initiative.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{initiative.title}</h3>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-xs font-medium text-brand-skyblue mb-4">
              {initiative.highlight}
            </div>
          </div>

          {/* Description */}
          <p className="text-brand-skyblue/70 flex-grow">{initiative.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-blue/20">
            {initiative.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-xs text-brand-skyblue border border-brand-blue/20 hover:border-brand-blue/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
