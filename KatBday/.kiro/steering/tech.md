# Technical Stack & Build System

## Core Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: TailwindCSS v4 with custom design tokens
- **Animations**: Framer Motion + Lottie for whimsical interactions
- **State Management**: Zustand for lightweight state
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form for elegant form handling
- **Backend**: Supabase (with mock data support for development)

## Development Environment
- **Node.js**: ES2020+ support required
- **Package Manager**: npm (package-lock.json present)
- **TypeScript**: Strict configuration with multiple tsconfig files
- **Linting**: ESLint with React-specific rules

## Build Commands
```bash
# Development server with hot reload
npm run dev

# Production build (TypeScript compilation + Vite build)
npm run build

# Lint code with ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Configuration Files
- **Environment**: `.env` (copy from `.env.example`)
- **TypeScript**: Multiple configs (app, node, base)
- **Tailwind**: Custom design tokens for Kat's aesthetic
- **PostCSS**: Configured for TailwindCSS processing
- **Vite**: Standard React setup

## Design System
- **Colors**: Custom palette (blush, peach, mint, lavender, charcoal, ivory)
- **Fonts**: Poppins (headers), Inter (body), Dancing Script (decorative)
- **Animations**: Gentle, natural movements with cubic-bezier easing
- **Shadows**: Soft shadows for depth without harshness

## Environment Variables
```bash
VITE_USE_MOCK_DATA=true          # Toggle mock data for development
VITE_SUPABASE_URL=your_url       # Supabase URL (production only)
VITE_SUPABASE_ANON_KEY=your_key  # Supabase key (production only)
VITE_ENABLE_AUDIO=true           # Audio clip support
VITE_ANIMATION_DURATION=300      # Animation timing
VITE_LOG_LEVEL=INFO              # Logging level
```

## Performance Standards
- **Load Time**: <3 seconds
- **Animations**: 60fps target
- **Bundle Size**: Optimized with Vite tree-shaking
- **Mobile**: Touch-friendly, responsive design