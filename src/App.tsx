import { Layout } from '@components/layout/Layout'
import { HeroSection } from '@components/sections/HeroSection'
import { StatsSection } from '@components/sections/StatsSection'
import { InitiativesSection } from '@components/sections/InitiativesSection'
import { SkillsSection } from '@components/sections/SkillsSection'
import { ClosingSection } from '@components/sections/ClosingSection'

function App() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <InitiativesSection />
      <SkillsSection />
      <ClosingSection />
    </Layout>
  )
}

export default App
