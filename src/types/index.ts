export interface Stat {
  id: string
  icon: string
  value: number
  label: string
  description: string
  suffix?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  date: string
  status: 'active' | 'completed'
  image?: string
  link?: string
  isPOC?: boolean
}

export interface Skill {
  id: string
  title: string
  description: string
  icon: string
  skills: string[]
}

export interface ArchitectureBlock {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
}
