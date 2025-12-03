# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ChainGo is a blockchain explorer and management dashboard built with React, TypeScript, Vite, and shadcn-ui. It provides real-time visualization of blockchain data including blocks, transactions, mining operations, network status, and wallet management.

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Core Technology Stack
- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn-ui (Radix UI primitives + Tailwind CSS)
- **Routing**: React Router DOM
- **State Management**: TanStack Query for server state
- **Animations**: GSAP for blockchain visualization
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom animations

### Directory Structure

```
src/
├── components/
│   ├── ui/           # shadcn-ui components (50+ Radix UI primitives)
│   ├── layout/       # Layout components (Navbar, Footer, Layout wrapper)
│   └── dashboard/    # Dashboard-specific components
│       ├── AnimatedBlockchainGSAP.tsx  # GSAP-powered blockchain visualization
│       ├── AnimatedBackground.tsx       # Background effects
│       ├── StatsCard.tsx               # Statistics display cards
│       ├── TransactionPool.tsx         # Transaction pool viewer
│       └── MiningStatus.tsx            # Mining status indicator
├── pages/           # Route pages (Index, Blocks, Transactions, Mining, etc.)
├── hooks/           # Custom React hooks (use-toast, use-mobile)
└── lib/            # Utilities (utils.ts with cn() helper)
```

### Key Components and Pages

**Main Pages** (all using `<Layout>` wrapper with Navbar/Footer):
- `/` - Dashboard with animated blockchain visualization, stats cards, transaction pool
- `/blocks` - Block explorer with search, filters, and block details
- `/blocks/:hash` - Individual block detail view
- `/transactions` - Transaction browser with search and filtering
- `/transactions/create` - Create new transaction form
- `/wallet` - Wallet management interface
- `/mining` - Mining console with GPU visualization and real-time logs
- `/network` - Network status and peer information
- `/health` - System health monitoring

**Component Architecture**:
- All pages wrap content in `<Layout>` which provides consistent Navbar and Footer
- `components/ui/*` contains pre-built shadcn-ui components (do not modify unless necessary)
- Dashboard components use GSAP for smooth animations
- Glass morphism styling with `glass-card` utility class

### Routing Structure

React Router DOM handles all routing in `App.tsx`:
- BrowserRouter wraps all routes
- QueryClientProvider provides TanStack Query context
- LoadingScreen component displays on initial load
- TooltipProvider enables tooltips throughout app

### Styling Conventions

- Uses Tailwind CSS with custom configuration
- Path alias `@` maps to `./src` directory
- Glass morphism cards with `glass-card` class
- Custom animations: `animate-fade-in`, `animate-slide-in-left`, `animate-shimmer`, `animate-pulse`
- Responsive design with mobile-first approach using Tailwind breakpoints
- Color scheme uses CSS variables defined in Tailwind config

### Data Flow

Currently using mock/generated data in pages:
- Blocks are generated with `generateBlocks()` helper functions
- Transaction data is mocked in component state
- Mining stats update via `useEffect` intervals
- All data is client-side only (no backend API calls yet)

### State Management

- Local state with `useState` for UI interactions
- TanStack Query setup available for future API integration
- React Hook Form for form state management
- Toast notifications via Sonner

## Development Guidelines

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx` within `<Routes>`
3. Wrap content in `<Layout>` component
4. Use existing shadcn-ui components from `components/ui/`

### Working with shadcn-ui Components
- Components are pre-configured in `components/ui/`
- Import and use directly: `import { Button } from "@/components/ui/button"`
- Customize via className prop with Tailwind classes
- Use `cn()` utility from `lib/utils.ts` for conditional classes

### Styling New Components
- Prefer Tailwind utility classes over custom CSS
- Use semantic color variables (`text-foreground`, `bg-background`, `border-border`)
- Apply glass morphism with `glass-card` class
- Add animations with existing Tailwind animation classes

### Form Handling
- Use React Hook Form with Zod schema validation
- Form components from shadcn-ui provide built-in accessibility
- Display validation errors inline with form fields

## Important Notes

- Dev server runs on IPv6 `[::]` port 8080 (see `vite.config.ts`)
- Path alias `@` configured in both `tsconfig` and `vite.config.ts`
- TypeScript strict mode enabled
- ESLint configured with React hooks and refresh plugins
