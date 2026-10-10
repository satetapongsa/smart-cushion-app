# WAVY COMPANY - Smart Cushion Dashboard

Web application for real-time ergonomic posture tracking and pressure distribution analytics for Wavy Cushion hardware.

## System Architecture

```text
+-----------------------------------------------------------+
|                   Physical Sensor Layer                   |
|  - Dual Ischial Pressure Transducers                      |
|  - BLE 5.0 Peripheral (Forma / Wavy Protocol)             |
+-----------------------------------------------------------+
                             |
                             | BLE GATT / Simulated Stream
                             v
+-----------------------------------------------------------+
|                   Client Ingestion Engine                 |
|  - Telemetry Stream Parser & Smoothing                    |
|  - Weight Balance Calculator (L/R Delta Ratio)            |
|  - State Engine (Oscillation Simulation & Presets)        |
+-----------------------------------------------------------+
                             |
                             | Reactive State (React Hooks)
                             v
+-----------------------------------------------------------+
|                     Presentation Layer                    |
|  - SVG Heatmap Projection (Radial Gradients & Isobars)    |
|  - Time-series Posture Trend Vector Canvas                |
|  - Telemetry KPI Cards & Session Timers                   |
|  - Actuation & Calibration Dialogs                        |
+-----------------------------------------------------------+
```

### Core Architecture Components

1. **Hardware & Ingestion Abstraction**
   - Ingests raw bilateral pressure metrics (kPa) and weight distribution percentage.
   - Built-in simulation fallback simulates micro-postural adjustments (sinusoidal deviation) and test states (Balanced, Leaning Left/Right, Slouching).

2. **Metrics & Decision Engine**
   - Posture scoring algorithm derived from lateral asymmetry and peak sacral load.
   - Break scheduler tracking active duration against ergonomic interval thresholds.

3. **Presentation & Rendering**
   - Zero-dependency custom SVG contour and gradient rendering for low latency and consistent cross-platform performance.
   - Modular modal interfaces for sensor baseline zeroing (calibration) and session reporting.

## Technology Stack

- Runtime: React 19
- Build Tool: Vite 6
- Styling: Custom CSS Design System (CSS custom properties, zero external CSS runtime overhead)
- Icons: Lucide React

## Project Structure

```text
smart-cushion-app/
├── src/
│   ├── App.jsx        # Root application, state coordinator, and dashboard views
│   ├── App.css        # Dashboard layout, heatmap styling, and modal definitions
│   ├── index.css      # Design tokens, color system, and resets
│   └── main.jsx       # React application entry point
├── public/            # Static assets and icons
├── index.html         # Application shell and font declarations
└── vite.config.js     # Bundler configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation and Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Compile and bundle assets for production
npm run build
```

The production output will be generated inside the `dist/` directory.

## Repository Setup & Deployment

```bash
# Set origin remote
git remote add origin https://github.com/satetapongsa/smart-cushion-app.git

# Set main branch and push
git branch -M main
git push -u origin main
```
