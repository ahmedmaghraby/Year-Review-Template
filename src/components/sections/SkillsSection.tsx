import React from 'react'
import { motion } from 'framer-motion'
import { SkillCard } from '@components/ui/SkillCard'
import { skills } from '@data/skills'

/**
 * Skills section showcasing technical expertise
 */
export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-20 px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-bold gradient-text">Core Competencies</h2>
          <p className="text-lg text-brand-skyblue/70">Technical skills and areas of expertise</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              title={skill.title}
              description={skill.description}
              icon={skill.icon}
              skills={skill.skills}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-skyblue/5 to-transparent rounded-full blur-3xl -z-10" />
      </div>
    </section>
  )
}
