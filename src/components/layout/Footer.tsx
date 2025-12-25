import React from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com', icon: '⚙️' },
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
  { label: 'Email', url: 'mailto:ahmed@example.com', icon: '✉️' },
]

/**
 * Footer with social links and copyright
 */
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-blue/10 bg-brand-darkblue/50 py-12">
      <motion.div
        className="mx-auto max-w-6xl px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-skyblue transition-colors hover:bg-brand-blue/20 hover:text-brand-blue"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 85, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-brand-skyblue/60">
              © {new Date().getFullYear()} Ahmed Maghraby. All rights reserved.
            </p>
            <p className="text-xs text-brand-skyblue/40">
              Built with React, TypeScript, Framer Motion & Three.js
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
