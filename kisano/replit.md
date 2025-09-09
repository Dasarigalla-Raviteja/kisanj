# KisanMitra - Cultivation Guides Mobile Application

## Overview
KisanMitra (meaning "Farmer's Friend") is a comprehensive mobile-first agricultural support application designed specifically for farmers. The application provides AI-powered plant disease diagnosis, cultivation guides, market access, soil health monitoring, weather information, and agricultural advisory services. Built as a hybrid mobile app using modern web technologies, it serves as a complete digital farming companion with offline capabilities for rural areas.

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
- **UI Component Library**: Complete Radix UI suite (@radix-ui/*) for accessible, headless components
- **Build and Development**: Vite 5.4.19 with TypeScript support and ESLint configuration
- **Styling Framework**: Tailwind CSS with PostCSS for utility-first styling

### Mobile Platform Integration
- **Capacitor Platform**: Complete Capacitor 7.4.3 suite including iOS and Android platforms
- **Device APIs**: Camera (@capacitor/camera), haptic feedback, keyboard management, splash screen
- **Native Features**: Status bar customization, app lifecycle management

### Weather and Location Services
- **Weather Integration**: OpenWeatherMap API integration for real-time weather data
- **Geolocation**: Browser geolocation API with fallback to default locations
- **Location Services**: GPS-based features for nearby shop discovery and location-specific content

### State and Data Management
- **Query Management**: TanStack React Query for efficient data fetching and caching
- **Form Validation**: Zod schema validation for type-safe form handling
- **Local Persistence**: Browser localStorage for offline data storage and user preferences

### Development and Quality Tools
- **Code Quality**: ESLint with TypeScript support and React-specific rules
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Build Optimization**: Vite-based build system with code splitting and optimization