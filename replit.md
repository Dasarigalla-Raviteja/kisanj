# KisanMitra - Agricultural Support Mobile Application

## Overview
KisanMitra (meaning "Farmer's Friend") is a comprehensive mobile-first agricultural support application designed specifically for farmers in India. The application provides AI-powered plant disease diagnosis, weather monitoring, soil health tracking, marketplace functionality, and cultivation guidance. Built as a Progressive Web App with native mobile capabilities, KisanMitra serves as a complete digital farming assistant that works effectively in rural areas with limited connectivity.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18.3.1 with TypeScript for type safety and modern development practices
- **Build System**: Vite 5.4.19 configured for mobile-first development with hot module replacement
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for consistent styling
- **Routing**: React Router DOM 6.30.1 for client-side navigation with comprehensive route handling
- **State Management**: TanStack React Query 5.83.0 for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Mobile Development Strategy
- **Hybrid Approach**: Capacitor 7.4.3 for cross-platform mobile deployment (iOS/Android) with native integrations
- **Progressive Web App**: Offline-first design with service workers for rural connectivity challenges
- **Native Capabilities**: Camera access for plant diagnosis, GPS for location services, push notifications, haptic feedback
- **Responsive Design**: Mobile-first CSS with safe area handling and Android-optimized design system
- **Performance**: Optimized for low-end devices with efficient bundle splitting and lazy loading

### Component Architecture
- **Atomic Design Pattern**: Reusable UI components following design system principles
- **Page Components**: Feature-specific route components with clear separation of concerns
- **Custom Hooks**: Shared stateful logic for common operations like authentication and data fetching
- **Utility Functions**: Helper functions for cart management, weather integration, and data persistence

### Data Management
- **Local Storage Strategy**: Comprehensive localStorage implementation for offline functionality
- **User Authentication**: Complete signup/login flow with automatic authentication persistence
- **Cart Management**: Reactive cart service with real-time updates and persistence
- **Notification System**: Local notification management with categorization and persistence
- **Cultivation Data**: Saved cultivation guides, fertilizer guidance, and soil test results
- **Treatment Tracking**: Active treatment monitoring with progress tracking

### Styling and Design System
- **CSS Framework**: Tailwind CSS with custom agricultural color palette and mobile-optimized spacing
- **Component Styling**: CSS variables for consistent theming with agricultural-focused design tokens
- **Typography**: Inter font family optimized for mobile readability
- **Animation System**: Custom animations for enhanced user experience
- **Mobile Optimization**: Touch-friendly interfaces with proper spacing and gesture support

## External Dependencies

### Core Development Stack
- **React Ecosystem**: React 18.3.1, React Router DOM 6.30.1, React Hook Form with validation
- **UI Component Library**: Radix UI primitives (@radix-ui/*) for accessible, headless components
- **Build Tooling**: Vite 5.4.19 with TypeScript support and ESLint configuration
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach

### Mobile Platform Integration
- **Capacitor Core**: Cross-platform native runtime for web apps with native device access
- **Native Plugins**: App lifecycle management, haptic feedback, keyboard handling, splash screen, status bar
- **Platform Optimization**: Android and iOS specific configurations for deployment

### Weather Services
- **OpenWeatherMap API**: Real-time weather data and forecasting integration
- **Location Services**: GPS-based location detection for localized weather information
- **Weather Data Management**: Custom weather service with caching and offline fallback

### State Management and Utilities
- **TanStack React Query**: Server state management with caching, background updates, and optimistic updates
- **Class Variance Authority**: Type-safe component variant management
- **clsx & tailwind-merge**: Utility for conditional CSS class composition
- **Date Handling**: Date-fns for date manipulation and formatting