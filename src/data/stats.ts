import type { Stat } from '../types'

export const stats: Stat[] = [
  {
    id: 'contributions',
    icon: '🚀',
    value: 833,
    label: 'Total Contributions',
    description: 'Commits and code contributions across all projects',
  },
  {
    id: 'pushes',
    icon: '🔁',
    value: 618,
    label: 'Code Pushes',
    description: 'Production deployments and code iterations',
  },
  {
    id: 'mrs',
    icon: '🔀',
    value: 210,
    label: 'Opened MRs',
    description: 'Merge requests and code reviews',
  },
  {
    id: 'projects',
    icon: '📦',
    value: 6,
    prefix: '+',
    label: 'Projects',
    description: 'Production projects worked on',
  },
]
