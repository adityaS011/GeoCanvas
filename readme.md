# GeoCanvas - Interactive Map Application

An interactive map application built with React, TypeScript, and Mapbox GL JS for performing basic geospatial operations.

## Features

- **Map Integration** - Mapbox GL JS centered on Bengaluru with navigation controls
- **Markers** - Click to place markers, view coordinates in sidebar, remove individually
- **Polygon Drawing** - Draw polygons by clicking vertices, area calculated via Turf.js
- **Save & Load** - Map state persists in localStorage across sessions
- **GeoJSON Export/Import** - Export markers and polygons as `.geojson`, import existing files
- **Responsive** - Adapts layout for mobile and desktop

## Tech Stack

- React 18 + TypeScript
- Vite
- Mapbox GL JS + react-map-gl
- Turf.js (area calculation)

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/adityaS011/GeoCanvas.git
cd GeoCanvas

# 2. Install dependencies
npm install

# 3. Add your Mapbox token
cp .env.example .env
# Edit .env and add your token from https://account.mapbox.com/access-tokens/

# 4. Start dev server
npm run dev
```

## Project Structure

```
src/
  components/
    Map/          MapView, MapMarkers, MapPolygon
    Sidebar/      Sidebar, MarkerList, PolygonInfo
    Toolbar/      Drawing mode toggles, save/clear/export actions
    ui/           Reusable Button, Panel, Badge components
  hooks/          useMapState, useLocalStorage
  utils/          geo helpers, constants
  types/          TypeScript interfaces
```

## Usage

1. **Add Markers** - Select "Marker" mode and click anywhere on the map
2. **Draw Polygon** - Select "Polygon" mode and click to place vertices (min 3)
3. **Save** - Click "Save" to persist state to localStorage
4. **Clear** - Click "Clear All" to reset the map
5. **Export** - Download current state as a GeoJSON file
6. **Import** - Load a GeoJSON file to display on the map
