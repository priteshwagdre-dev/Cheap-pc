# NEXUS PLAY — Futuristic Gaming Marketplace & Scrollytelling Portal

An ultra-immersive, sci-fi gaming marketplace heavily inspired by the visual aesthetic, scroll choreography, and futuristic architecture of **Techfest IIT Bombay** ([techfest.org](https://techfest.org/)).

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Lenis**, and **Vite**.

---

## 🌌 Visual Direction & Design System (Techfest Inspired)

| System Token | Specification / Value |
| :--- | :--- |
| **Aesthetic** | Sci-Fi / Cyberpunk / Techfest Futurism with glassmorphic surfaces & glowing accents |
| **Deep Void Black** | `#050508` (Base Cosmic Background) |
| **Midnight Obsidian**| `#0B0C14` (HUD Panels & Cards) |
| **Translucent Glass** | `rgba(15, 18, 30, 0.65)` (`backdrop-filter: blur(16px)`) |
| **Electric Cyan** | `#00F0FF` (Interactive Spotlights, Laser Scroll & Active Indicators) |
| **Neon Violet** | `#7000FF` (Ambient Radial Glows & Secondary Highlights) |
| **Solar Amber/Gold** | `#FFB800` (Urgent Deals, Discounts & Primary Action CTAs) |
| **Display Headings** | **Syne** & **Orbitron** (`letter-spacing: 0.12em` uppercase tracking) |
| **Body & UI** | **Space Grotesk** & **Plus Jakarta Sans** |
| **Monospace Meta** | **JetBrains Mono** (`01 //`, timestamps, coordinates, status indicators) |

---

## 🏛️ Core Layout & Section Architecture

### 1. 🛸 Floating HUD Navigation Bar
- **Fixed Glass Surface**: Fixed top navigation encased in a translucent glassmorphic backdrop (`backdrop-filter: blur(16px)`).
- **Split Layout**:
  - **Left**: Techfest-styled NEXUS crest with illuminated polygon frame.
  - **Center**: Primary navigation links with animated glowing hover underlines (`scale-x` laser transitions).
  - **Right**: Compact search bar, live wishlist counter badge, shopping cart counter badge, and high-contrast `SIGN IN // ID` GlowButton.
- **Full-Screen Mobile Overlay**: Giant geometric typography menu with destination portals, quick account switches, and cyber gridlines.

### 2. 🪐 Multi-Layered Parallax Hero Section
A viewport-filling scrollytelling hero that reacts dynamically to both mouse coordinates and vertical scroll:
- **Layer 1 (Farside / Deep Background - 0.1x)**: Starfield, nebula textures, and cyber grid coordinates.
- **Layer 2 (Main Structure + Glow - 0.3x)**: Holographic concentric nexus rings with an animated radial pulse (`#7000FF` & `#00F0FF`).
- **Layer 3 (Centerpiece Title / Game Carousel - 0.5x)**: Wide geometric typography with letter-spacing `0.12em`, discount badges, and primary action buttons.
- **Layer 4 (Foreground Silhouettes - 0.8x)**: Framing sci-fi pillars creating intense visual depth.
- **Layer 5 (Transition Fog System)**: 4 overlapping horizontal drifting mist layers with alpha gradient masks that seamlessly dissolve into the dark void background of the next section.
- **Animated "SCROLL" Indicator**: Vertical laser-line pulse with monospace coordinate tracking.

### 3. 🛡️ Featured Highlight / Syndicate Spotlight Banner
- Full-width spotlight card encased in an illuminated HUD border with glowing corner brackets (`┌ ┐ └ ┘`).
- Dynamic background gradient mesh (`#7000FF` to `#00F0FF`).
- Value propositions with perk badges (`PERK // 01` Lowest Price Guarantee, `PERK // 02` 10% Extra Cashback, `PERK // 03` Closed Beta Access).
- Glowing magnetic CTA button.

### 4. 🔲 Interactive Bento / Portal Cards
- Replaces standard grids with interactive 3D tilt portal cards.
- **Dynamic Cursor Spotlight**: Radial gradient border that tracks exact cursor coordinates across the card surface.
- **Monospace Indexing**: Structured indexes (`01 //`, `02 //`, etc.), category badges, visual previews, bold titles, and animated arrow triggers.

### 5. 🗃️ Pinned Horizontal Scroll Showcase
- Horizontal scrolling track showcasing franchise bundles and masterpieces with progress bar percentage tracking (`0%` to `100%`) and navigation controls.

### 6. 🌐 Futuristic System-Status Footer
- Giant watermark brand typography in the background (`NEXUS // PLAY` in giant ghost lettering).
- Quick-link matrix columns, glowing social icon nodes, and system-status copyright bar:
  `SYS_STATUS: ALL CORES OPERATIONAL // LATENCY: 12ms // NEXUS_SECURE_V4.2`

---

## ⚡ Animation & Micro-Interactions

### 1. Smooth Weighted Scrolling
- Integrated **Lenis** smooth scrolling library for weighted, momentum-based scrolling.

### 2. Dual-Ring Custom Cursor
- Dual-ring interactive cursor with an inner crisp cyan dot and an outer reactive violet/amber spring ring.
- Automatically expands, magnifies, and pulses when hovering over buttons, links, inputs, and bento cards.
- Intelligently disables on mobile touch devices.

### 3. Reusable Techfest UI Primitives
- `<GlowButton />`: Sci-fi chamfered button (`clip-path`) with animated hover light bar, magnetic feel, and glowing variants (`cyan`, `violet`, `amber`, `hud`, `ghost`).
- `<HUDCard />`: Card with luminous corner brackets (`┌ ┐ └ ┘`) and monospace metadata header.
- `<BentoPortalCard />`: Dynamic cursor spotlight with 3D tilt on mousemove.

---

## 🎮 Preserved Core Gaming Marketplace Features

All existing store features, routing, and business logic remain fully functional:
- **Live Search & Autocomplete**: Instant search dropdown matching titles, publishers, and genres.
- **Quick-View Modal**: In-place game inspection, screenshot gallery, platform selector, and 1-click cart addition.
- **Flash Deals & Pre-Order Countdowns**: Real-time ticking clocks for clearance sales and day-one launch dates.
- **Curated Franchise Bundles**: Multi-game bundles with separate individual activation key delivery notices.
- **Random Game Discovery Oracle (`/discover`)**: Matchmaking roll engine for indecisive players.
- **Cart & Promo Coupons**: Quantity adjustments, subtotal/tax calculations, and promo code redemption (`NEXUS10` for 10% off, `CYBER20` for 20% off).
- **Global Wishlist**: One-click heart toggle with header badge count and toast feedback.

---

## 🚀 Getting Started

```bash
# Install dependencies (includes lenis, react, lucide-react, etc.)
npm install

# Start Vite development server
npm run dev

# Compile TypeScript & production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🏷️ Test Promo Codes
- `NEXUS10` — 10% discount on order total
- `CYBER20` — 20% discount on order total
