# Mirable COOP - Gamified Loyalty App

A phigital (physical + digital) promotional game app for Coop Italy, featuring travel blogger-themed treasure hunts across Italian cities.

## Tech Stack

- **Framework**: React / Next.js
- **3D Graphics**: Three.js
- **Platform**: Mobile-first web app

## Project Overview

### Core Concept

A 10-week gamified promotion combining:
- **Instant Win** - Token-based spin mechanic for immediate prizes
- **Map Exploration** - Find hidden items across Italian city maps
- **Phigital Integration** - QR totem scanning in physical stores
- **Final Draw** - Badge collection unlocks draw entry

### Key Features

#### Token System
- Users earn tokens via purchases (1 token per ¬15 spent)
- Tokens used for Instant Win spins
- Daily win limits apply

#### City Exploration Game
- 10 cities released over 10 weeks
- Each city contains:
  - 12 items to find on the map
  - 1 hidden treasure (requires store visit + code)
  - 1 hidden logo
  - 2 scenarios with 5 clues each
  - Special missions linked to Instant Win
- Time-limited gameplay with hint system
- Compass navigation interface

#### Progression & Rewards
- Complete city = earn badge
- 10 badges = 1 final draw entry
- Instant Win prizes (digital vouchers, physical prizes)
- Hidden treasure prizes (e.g., ¬30 Coop voucher)

#### Avatar System
- Character selection at onboarding
- Graphics change based on chosen avatar

### User Flow

1. **Onboarding**: First view banner ’ Consent/regulations ’ Avatar selection
2. **Home**: Access Instant Win, view prizes, enter game
3. **Game**: Select city ’ View map ’ Find items ’ Complete scenarios
4. **Store Integration**: Visit store ’ Scan QR totem ’ Get clue + code ’ Open treasure
5. **Rewards**: Instant Win spins, badge collection, final draw entry

## Development Approach

Starting with minimal scaffolding, then iterative feature development:

### Phase 1: Foundation
- [ ] Next.js project setup
- [ ] Three.js integration
- [ ] Basic routing structure
- [ ] Component architecture

### Phase 2: Core Mechanics (MVP)
- [ ] Single city map with item discovery
- [ ] Basic Instant Win spin
- [ ] User state management

### Phase 3: Full Features
- [ ] All 10 cities
- [ ] Token economy
- [ ] Badge/progression system
- [ ] QR code scanning
- [ ] Prize redemption flow

## Reference Documents

- `Assets/Creative/Mirable _ App Game UX.pdf` - UI/UX wireframes and screen flows
- `Assets/Creative/Mirable _ Game flow.pdf` - System flowchart and game logic

## Notes

- Heavy phigital component requires coordination with in-store totem deployment
- Weekly city releases need content pipeline planning
- Token economy balance TBD
- Consider progressive tutorial to manage feature complexity
