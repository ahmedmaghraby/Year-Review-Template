import { Skill } from '@types/index'

export const skills: Skill[] = [
  {
    id: 'frontend-arch',
    title: 'Frontend Architecture',
    description: 'Designing scalable, maintainable frontend systems and patterns',
    icon: '🏗️',
    skills: ['Component Architecture', 'State Management', 'Module Federation', 'Performance Patterns'],
  },
  {
    id: 'react-micro',
    title: 'React & Micro-Frontends',
    description: 'Building modern React applications with micro-frontend architecture',
    icon: '⚛️',
    skills: ['React 18', 'TypeScript', 'Hooks', 'Micro-Frontends', 'Module Federation'],
  },
  {
    id: 'perf-opt',
    title: 'Performance Optimization',
    description: 'Optimizing web applications for speed and efficiency',
    icon: '⚡',
    skills: ['Code Splitting', 'Bundle Analysis', 'Lazy Loading', 'Core Web Vitals', 'Profiling'],
  },
  {
    id: 'ui-systems',
    title: 'Scalable UI Systems',
    description: 'Creating reusable, well-documented component systems',
    icon: '🎨',
    skills: ['Design Systems', 'Component Libraries', 'Tailwind CSS', 'Storybook'],
  },
  {
    id: 'poc-proto',
    title: 'POCs & Rapid Prototyping',
    description: 'Quickly validating ideas and building proofs of concept',
    icon: '🚀',
    skills: ['Rapid Development', 'Full-Stack', 'Testing', 'Iteration'],
  },
]
