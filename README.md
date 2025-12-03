# ChainGo - Blockchain Dashboard

A modern, developer-focused blockchain dashboard for monitoring blocks, transactions, mining operations, and network health.

## Features

- 🔗 Real-time blockchain visualization with GSAP animations
- 📦 Block explorer with search and filtering
- 💸 Transaction monitoring and creation
- ⛏️ Mining console with GPU visualization
- 🌐 Network status and peer management
- 💼 Wallet management interface
- 🏥 System health monitoring

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **shadcn-ui** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **GSAP** - Animation library
- **React Hook Form + Zod** - Form handling and validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd chaingo-front

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn-ui components
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── dashboard/    # Dashboard-specific components
├── pages/            # Route pages
├── hooks/            # Custom React hooks
└── lib/              # Utilities
```

## Key Pages

- `/` - Dashboard with blockchain visualization
- `/blocks` - Block explorer
- `/transactions` - Transaction browser
- `/wallet` - Wallet management
- `/mining` - Mining console
- `/network` - Network status
- `/health` - System health

## License

MIT
