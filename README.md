# MirableCOOP - Interactive Adventure Game

An immersive cooperative adventure game that takes players on a journey through Italian cities. Built with React, Three.js, and modern web technologies, this gamified mobile-first application combines 3D graphics with engaging gameplay mechanics.

## Overview

MirableCOOP is a mission-based adventure game where players:
- Travel through a beautifully rendered 3D map of Italian cities
- Complete location-based challenges and missions
- Earn tokens and unlock rewards through gameplay
- Compete for badges, sponsor achievements, and phigital collectibles
- Participate in instant-win prize opportunities

## Key Features

### 🎮 Immersive 3D Experience
- **Full-screen game map** that expands beyond mobile constraints for maximum immersion
- Interactive 3D map powered by Three.js and React Three Fiber
- Smooth scroll-controlled camera navigation with lerp interpolation
- Enhanced lighting system with optimized ambient and directional lights
- Spatial grid reference for better depth perception
- Modern glassmorphic UI with backdrop blur effects
- Landscape-optimized gameplay with elegant orientation prompts

### 🗺️ Mission-Based Gameplay
- Progress through 10+ Italian cities
- Complete time-limited missions and challenges
- Find hidden ingredients and unlock secret recipes
- Track progress with multiple achievement categories

### 🎁 Reward System
- Token-based economy for in-game currency
- Instant Win feature with prize wheel mechanics
- Badge, Sponsor, and Phigital achievement tracking
- Prize redemption system

### 👤 User Experience
- Smooth onboarding flow with terms acceptance
- Avatar selection and customization
- User profile management
- Customizable game settings (music, sounds, vibration)

## Technology Stack

- **Frontend Framework:** React 18.2.0 with TypeScript
- **3D Graphics:** Three.js 0.154.0 with @react-three/fiber and @react-three/drei
- **Build Tool:** Vite 6.2.0
- **UI Components:** Lucide React icons, Custom component library
- **Styling:** Tailwind CSS (utility-first approach)

## Project Structure

```
├── screens/           # Main application screens
│   ├── WelcomeScreen.tsx
│   ├── AvatarSelectionScreen.tsx
│   ├── HomeScreen.tsx
│   ├── GameMapScreen.tsx
│   ├── GameLoadingScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── components/        # Reusable UI components
│   ├── Layout.tsx
│   └── UIComponents.tsx
├── services/          # API and data services
│   └── api.ts
├── types.ts          # TypeScript type definitions
└── App.tsx           # Main application component
```

## Run Locally

**Prerequisites:** Node.js (v16 or higher recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm build
   ```

## Recent Updates

**Latest improvements include:**
- ✨ Full-screen game map experience with dynamic layout switching
- 🎨 Modern glassmorphic UI with backdrop blur effects
- 📱 Improved responsive design with proper flex layout architecture
- 🎥 Enhanced 3D camera system with smooth scroll-based movement
- 💡 Optimized lighting and spatial reference grid for better visibility
- 🎯 Refined stat counters with individual badge displays

## Development Status

**Current Version:** 0.0.0 (MVP Development)

This application is currently in active development with the following implementation status:
- ✅ Core navigation and screen routing
- ✅ Full-screen 3D map visualization with enhanced UI
- ✅ User onboarding flow with avatar selection
- ✅ Basic game mechanics framework
- ✅ Responsive layout system with mobile and full-screen modes
- ⏳ Backend API integration (currently using mock data)
- ⏳ Prize system implementation
- ⏳ Complete mission mechanics and level progression
- ⏳ Testing and production optimization

## License

Private - All rights reserved
