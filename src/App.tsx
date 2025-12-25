import { useEffect } from 'react'
import { Layout } from '@components/layout/Layout'
import { HeroSection } from '@components/sections/HeroSection'
import { StatsSection } from '@components/sections/StatsSection'
import { InitiativesSection } from '@components/sections/InitiativesSection'
import { ClosingSection } from '@components/sections/ClosingSection'

function App() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <InitiativesSection />
      <ClosingSection />
    </Layout>
  )
}

export default App
