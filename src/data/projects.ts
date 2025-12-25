import { Project } from '@types/index'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Admin Portal Modernization',
    description: 'Led the modernization of legacy admin portal with latest React patterns and performance optimizations',
    technologies: ['React', 'TypeScript', 'Micro-Frontends', 'Webpack'],
    date: '2025-Q1',
    status: 'active',
  },
  {
    id: 'project-2',
    title: 'Design System V2',
    description: 'Architected and implemented a comprehensive design system with 50+ components',
    technologies: ['React', 'Tailwind CSS', 'Storybook', 'TypeScript'],
    date: '2024-Q4',
    status: 'completed',
  },
  {
    id: 'project-3',
    title: 'Performance Optimization Initiative',
    description: 'Reduced bundle size by 40% and improved Core Web Vitals across multiple products',
    technologies: ['webpack', 'Code Splitting', 'Tree Shaking', 'Performance Monitoring'],
    date: '2025-Q2',
    status: 'active',
  },
  {
    id: 'project-4',
    title: 'Real-time Data Platform',
    description: 'Built real-time data synchronization system for collaborative features',
    technologies: ['React', 'WebSockets', 'Redux', 'Node.js'],
    date: '2024-Q3',
    status: 'completed',
  },
  {
    id: 'project-5',
    title: 'Mobile App Integration',
    description: 'Integrated web platform with native mobile apps using React Native bridges',
    technologies: ['React Native', 'JavaScript', 'Native Modules'],
    date: '2025-Q1',
    status: 'active',
  },
  {
    id: 'project-6',
    title: 'Analytics Dashboard',
    description: 'Created comprehensive analytics dashboard with real-time data visualization',
    technologies: ['React', 'D3.js', 'WebGL', 'TypeScript'],
    date: '2024-Q2',
    status: 'completed',
  },
]

export const pocs: Project[] = [
  {
    id: 'poc-1',
    title: 'Customer RAG Chatbot',
    description: 'Proof-of-concept AI-powered customer support chatbot using RAG (Retrieval-Augmented Generation)',
    technologies: ['LangChain', 'OpenAI', 'React', 'Python'],
    date: '2025-Q3',
    status: 'active',
    isPOC: true,
  },
  {
    id: 'poc-2',
    title: 'Lendo Email Signature Generator',
    description: '20+ employees actively using this tool to generate branded email signatures dynamically',
    technologies: ['React', 'Canvas API', 'Node.js', 'Email APIs'],
    date: '2025-Q2',
    status: 'active',
    isPOC: true,
  },
  {
    id: 'poc-3',
    title: 'Planning-Agile-Poker',
    description: 'Interactive planning poker tool used for estimating work across teams - 50+ sessions, 550+ rounds',
    technologies: ['React', 'WebSockets', 'Firebase', 'Framer Motion'],
    date: '2025-Q4',
    status: 'active',
    isPOC: true,
  },
]
