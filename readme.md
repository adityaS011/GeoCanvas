# GeoCanvas

An interactive map tool for placing markers, drawing polygons, and calculating geospatial data — built with React, TypeScript, and Mapbox GL.

**Live Demo:** https://keen-creativity-production.up.railway.app

---

## Features

- **Marker Mode** — Click anywhere on the map to drop a marker. Click the active mode again to deselect it.
- **Polygon Mode** — Click to add vertices and draw a polygon. Area is calculated automatically once 3+ vertices are placed.
- **Area Calculation** — Uses Turf.js to compute real-world polygon area in m², ha, or km².
- **Save / Sync** — State persists to `localStorage`. The sidebar footer shows current save status.
- **GeoJSON Export** — Download the current map state as a `.geojson` file.
- **GeoJSON Import** — Load a `.geojson` file to restore markers and polygons.
- **Responsive** — Full desktop layout with collapsible sidebar. On mobile, the sidebar is a bottom sheet (collapsed by default so the map stays fully visible).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Map | Mapbox GL JS via react-map-gl |
| Styling | styled-components |
| Geo Utilities | Turf.js |
| State | React hooks + localStorage |
| Deployment | Railway |

---

## Project Structure

```
src/
├── App.tsx                    # Root layout — toolbar on top, sidebar + map below
├── index.css                  # CSS reset, design tokens (colors, spacing, fonts)
├── types/index.ts             # Shared TypeScript interfaces
├── hooks/
│   ├── useMapState.ts         # All map state (markers, polygon, drawing mode, save)
│   └── useLocalStorage.ts     # Generic localStorage read/write hook
├── utils/
│   ├── constants.ts           # Mapbox token, initial map view, storage key
│   └── geo.ts                 # Area calculation, GeoJSON conversion, file download
└── components/
    ├── ui/
    │   ├── Button.tsx         # Variant-aware button (primary / ghost / danger)
    │   ├── Panel.tsx          # Card panel with optional header and actions
    │   ├── Badge.tsx          # Generic badge
    │   └── Icons.tsx          # SVG icon components
    ├── Toolbar/
    │   └── Toolbar.tsx        # Drawing mode toggle, save, clear, import/export
    ├── Sidebar/
    │   ├── Sidebar.tsx        # Sidebar shell + sync status footer
    │   ├── SidebarHeader.tsx  # App logo + collapse/expand toggle
    │   ├── MarkerList.tsx     # Scrollable list of placed markers
    │   ├── MarkerItem.tsx     # Single marker row (coords + remove button)
    │   └── PolygonInfo.tsx    # Vertex count + calculated area display
    └── Map/
        ├── MapView.tsx        # Mapbox map + click-to-draw handler
        ├── MapMarkers.tsx     # Renders marker pins on the map
        └── MapPolygon.tsx     # Renders polygon fill, outline, and vertex dots
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Mapbox](https://www.mapbox.com/) account and public access token

### Installation

```bash
git clone https://github.com/adityaS011/GeoCanvas.git
cd GeoCanvas
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_MAPBOX_TOKEN=your_mapbox_public_token_here
```

> The token is inlined at build time by Vite. It must be set before running `npm run build`.

### Scripts

```bash
npm run dev       # Start local dev server (http://localhost:5173)
npm run build     # Type-check + production build
npm run preview   # Serve the production build locally
```

---

## How It Works

### Drawing Modes

The toolbar has a segmented toggle for **Marker** and **Polygon** modes. Clicking an active mode deactivates it, returning to pan/zoom. In marker mode each map click drops a pin. In polygon mode each click adds a vertex; a filled polygon renders once 3+ vertices exist.

### State & Persistence

All map state lives in `useMapState`. Any change (add/remove marker, add vertex) marks the state "unsaved". Clicking **Save** persists to `localStorage` and updates the sync indicator in the sidebar footer. **Import** reads a GeoJSON file and rebuilds state; **Export** writes current state to a downloadable `.geojson`.

### GeoJSON Format

Markers are exported as `Point` features and polygons as `Polygon` features inside a `FeatureCollection`. The same format is expected on import.

---

## Deployment

Deployed on [Railway](https://railway.app) using `railway.json`. Set `VITE_MAPBOX_TOKEN` in Railway's environment variables before deploying — it is required at build time.

```bash
npm install -g @railway/cli
railway login
railway init
railway variables --set "VITE_MAPBOX_TOKEN=your_token"
railway up
```
