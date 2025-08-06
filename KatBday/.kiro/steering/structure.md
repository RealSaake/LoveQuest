# Project Structure & Organization

## Root Directory
```
love-quest/
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output
├── node_modules/           # Dependencies
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.*.json         # TypeScript configurations
└── README.md               # Project documentation
```

## Source Code Organization
```
src/
├── components/             # React components by feature
│   ├── Timeline/          # Relationship timeline with vine animations
│   ├── Quests/           # Daily challenges and adventures
│   ├── MemoryVault/      # Photo and memory storage
│   ├── KeepsakeChest/    # Digital treasures and rewards
│   └── Shared/           # Reusable UI components
├── hooks/                # Custom React hooks
├── services/             # API and data services
├── utils/                # Utility functions
├── mocks/                # Mock data for development
├── assets/               # Images, icons, static files
├── config.ts             # Centralized configuration
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## Component Architecture
- **Feature-based**: Components organized by major features (Timeline, Quests, etc.)
- **Shared Components**: Reusable UI elements in `Shared/` directory
- **Index Exports**: Each directory has `index.ts` for clean imports
- **Co-location**: Related files (component, styles, tests) kept together

## File Naming Conventions
- **Components**: PascalCase (e.g., `MemoryVault.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTimeline.ts`)
- **Utils**: camelCase (e.g., `dateHelpers.ts`)
- **Types**: PascalCase with `.types.ts` suffix
- **Constants**: UPPER_SNAKE_CASE in `constants.ts` files

## Import/Export Patterns
- **Barrel Exports**: Use `index.ts` files for clean imports
- **Absolute Imports**: Prefer `src/` relative imports
- **Type Imports**: Use `import type` for TypeScript types
- **Default Exports**: For main component files
- **Named Exports**: For utilities and helpers

## Configuration Management
- **Centralized Config**: All settings in `src/config.ts`
- **Environment Variables**: Prefixed with `VITE_`
- **Type Safety**: Full TypeScript validation for config
- **Fail Fast**: Configuration errors caught at startup

## Development Patterns
- **Mock Data**: Toggle via `VITE_USE_MOCK_DATA` environment variable
- **Feature Flags**: Controlled through configuration
- **Error Boundaries**: Graceful error handling with whimsical fallbacks
- **Accessibility**: WCAG 2.1 AA compliance throughout