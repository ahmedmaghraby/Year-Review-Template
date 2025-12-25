# 2025 Engineering Impact Website

A visually stunning, modern personal achievements website showcasing 2025 accomplishments with heavy animations, glassmorphism design, and premium micro-interactions.

## 🚀 Tech Stack

- **React 18** + TypeScript - Modern component architecture
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with Lendo brand colors
- **Framer Motion** + **GSAP** - Smooth, performant animations
- **Three.js** + **React Three Fiber** - 3D effects (planned for hero section)
- **Lenis** - Premium smooth scrolling experience

## 🎨 Design Features

- **Dark Theme** using Lendo brand colors
  - Primary Dark Blue: `#090419`
  - Brand Blue: `#0055FF`
  - Sky Blue: `#4DE1FF`
  - Accent Orange: `#FFB460`
- **Glassmorphism** UI components with backdrop blur
- **Gradient Text** using brand colors
- **Smooth Animations** on scroll and interaction
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout, Header, Footer
│   ├── sections/        # Hero, Stats, Skills, Closing (+ more)
│   ├── ui/              # GlassCard, Button, StatCard, SkillCard, AnimatedCounter
│   └── three/           # Three.js components (future)
├── hooks/               # Custom React hooks
│   ├── useInView.ts     # Intersection observer for animations
│   ├── useAnimatedCounter.ts
│   ├── useMediaQuery.ts
│   └── useSmoothScroll.ts # Lenis integration
├── lib/
│   ├── animations/      # Framer Motion variants, GSAP utilities
│   └── utils/           # Utility functions (cn.ts)
├── data/                # Content data (stats, projects, skills)
├── types/               # TypeScript type definitions
├── styles/              # Global CSS and Tailwind imports
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎯 Implemented Sections

### ✅ Completed

1. **Hero Section**
   - Big bold headline with gradient text
   - Animated background with gradients
   - Scroll indicator animation
   - Full viewport height

2. **Stats Section**
   - 8 animated stat cards
   - Counter animations (833 contributions, 618 pushes, etc.)
   - Glassmorphism cards with hover effects
   - Responsive grid (1-4 columns)

3. **Skills Section**
   - 5 skill area cards
   - Icon, title, description, and tech tags
   - Glassmorphism with hover animations
   - Responsive grid

4. **Closing Section**
   - Strong call-to-action statement
   - Animated CTA buttons
   - Links to GitHub and LinkedIn

5. **Layout Components**
   - Fixed header with navigation
   - Mobile menu with hamburger animation
   - Footer with social links
   - Lenis smooth scroll integration

### 📋 Planned Sections

6. **Projects Timeline**
   - 6+ production projects
   - 3 POC initiatives
   - SVG line drawing animation
   - Alternating left/right layout

7. **Architecture Section**
   - Micro-frontend architecture showcase
   - Modular block visualization
   - Technical details and impact

8. **Three.js Hero Background**
   - Particle system with Lendo gradient
   - Mouse-interactive effects
   - Subtle continuous animation

## 🎬 Animation Strategy

### Framer Motion (Component-level)
- Entrance animations (fadeInUp, scaleIn, slideInLeft)
- Hover/tap interactions
- Stagger animations for lists/grids
- Simple sequences

### GSAP (Scroll-triggered)
- ScrollTrigger for section reveals
- SVG line drawing (timeline connector)
- Complex timelines
- High-performance animations

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 🔧 Customization Guide

### Update Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  brand: {
    darkblue: '#090419',
    blue: '#0055FF',
    skyblue: '#4DE1FF',
    orange: '#FFB460',
  },
}
```

### Add New Section

1. Create component in `src/components/sections/YourSection.tsx`
2. Import in `src/App.tsx`
3. Add section ID for navigation

Example:

```typescript
import { YourSection } from '@components/sections/YourSection'

function App() {
  return (
    <Layout>
      <HeroSection />
      <YourSection />
    </Layout>
  )
}
```

### Update Stats Data

Edit `src/data/stats.ts`:

```typescript
export const stats: Stat[] = [
  {
    id: 'unique-id',
    icon: '🚀',
    value: 100,
    label: 'Your Label',
    description: 'Your description',
  },
  // ... more stats
]
```

### Update Projects

Edit `src/data/projects.ts` and `src/data/skills.ts`.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px (1 column layouts)
- **Tablet**: 768px - 1024px (2 column layouts)
- **Desktop**: 1024px+ (3-4 column layouts)

## ⚡ Performance Features

- Code splitting (Three.js and animations in separate chunks)
- Lazy loading for images
- Intersection observer for animations
- Optimized Tailwind build
- No unnecessary re-renders with React.memo and memoization

## 🎨 CSS Classes

### Utility Classes

```css
.glass              /* Glassmorphism base */
.glass-light        /* Lighter variant */
.gradient-text      /* Blue → Sky Blue gradient text */
.gradient-text-accent /* Blue → Sky Blue → Orange gradient */
.glow-blue          /* Blue glow effect */
.glow-blue-lg       /* Larger blue glow */
.glow-blue-xl       /* Extra large blue glow with inset */
```

## 🔑 Key Files to Know

1. **`tailwind.config.js`** - Design system (colors, animations, typography)
2. **`src/lib/animations/variants.ts`** - Framer Motion animation definitions
3. **`src/lib/animations/gsapAnimations.ts`** - GSAP utilities and helpers
4. **`src/hooks/useInView.ts`** - Core hook for triggering scroll animations
5. **`src/components/ui/GlassCard.tsx`** - Base component for all cards

## 🚀 Next Steps

1. **Add Three.js ParticleBackground** to hero section
2. **Build ProjectsTimeline** section with SVG animations
3. **Implement ArchitectureSection** with modular block visualization
4. **Add ProjectsTimeline** with 6+ production projects
5. **Optimize images** and add project screenshots
6. **Deploy to Vercel/Netlify** with custom domain
7. **Add analytics** (optional)
8. **SEO optimization** (meta tags, schema markup)

## 📝 Code Quality

- TypeScript for type safety
- ESLint & Prettier for code formatting
- Tailwind CSS for consistent styling
- Modular component architecture
- Reusable animation patterns
- Custom hooks for shared logic

## 🎯 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (iOS 15+)
- Chrome Mobile (latest)

## 📄 License

MIT License - Feel free to use this for your projects!

---

**Built with ❤️ using React, TypeScript, Framer Motion & GSAP**
