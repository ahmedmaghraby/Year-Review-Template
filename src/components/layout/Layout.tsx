import React from 'react'
import { Footer } from './Footer'
import { InteractiveStarfield } from '@components/three/InteractiveStarfield'
import { Analytics } from "@vercel/analytics/next"
interface LayoutProps {
  children: React.ReactNode
}

/**
 * Main layout component
 * Wraps the entire app with interactive starfield background
 * Uses native smooth scroll for better performance
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-black">
      <Analytics />
      {/* Interactive Starfield Background - covers entire website */}
      <InteractiveStarfield />

      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
