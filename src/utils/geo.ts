import * as turf from '@turf/turf';
import type { MapState, MarkerData } from '../types';

/**
 * Calculates the area of a polygon defined by [lng, lat] vertex pairs.
 * Requires at least 3 vertices; returns 0 otherwise.
 * The vertex list is automatically closed (first vertex appended) to satisfy
 * the GeoJSON Polygon spec before passing to Turf.
 */
export function calculatePolygonArea(vertices: [number, number][]): number {
  if (vertices.length < 3) return 0;
  const closed = [...vertices, vertices[0]];
  const polygon = turf.polygon([closed]);
  return turf.area(polygon); // returns area in square metres
}

/**
 * Formats a square-metre area value into a human-readable string.
 * Thresholds: >= 1 000 000 m² → km², >= 10 000 m² → ha, else m².
 */
export function formatArea(sqMeters: number): string {
  if (sqMeters >= 1_000_000) {
    return `${(sqMeters / 1_000_000).toFixed(2)} km²`;
  }
  if (sqMeters >= 10_000) {
    return `${(sqMeters / 10_000).toFixed(2)} ha`;
  }
  return `${sqMeters.toFixed(2)} m²`;
}

/**
 * Converts internal map state to a GeoJSON FeatureCollection.
 * Each marker becomes a Point feature; the polygon (if ≥ 3 vertices) becomes
 * a Polygon feature. The polygon ring is closed by repeating the first vertex.
 */
export function stateToGeoJSON(state: MapState): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];

  state.markers.forEach((marker) => {
    features.push({
      type: 'Feature',
      properties: { id: marker.id, type: 'marker' },
      geometry: {
        type: 'Point',
        coordinates: [marker.longitude, marker.latitude],
      },
    });
  });

  if (state.polygon && state.polygon.vertices.length >= 3) {
    // GeoJSON polygons must have a closed ring (last coord = first coord)
    const closed = [...state.polygon.vertices, state.polygon.vertices[0]];
    features.push({
      type: 'Feature',
      properties: { type: 'polygon' },
      geometry: { type: 'Polygon', coordinates: [closed] },
    });
  }

  return { type: 'FeatureCollection', features };
}

/**
 * Parses a GeoJSON FeatureCollection back into internal map state.
 * Point features become markers; the first Polygon feature becomes the polygon
 * (closing vertex is stripped since internal state stores open rings).
 */
export function geoJSONToState(geojson: GeoJSON.FeatureCollection): MapState {
  const markers: MarkerData[] = [];
  let polygon: MapState['polygon'] = null;

  geojson.features.forEach((feature) => {
    if (feature.geometry.type === 'Point') {
      const [longitude, latitude] = feature.geometry.coordinates;
      markers.push({
        id: (feature.properties?.id as string) || crypto.randomUUID(),
        longitude,
        latitude,
      });
    }

    if (feature.geometry.type === 'Polygon') {
      const coords = feature.geometry.coordinates[0];
      // Strip the closing vertex to match internal open-ring representation
      polygon = { vertices: coords.slice(0, -1) as [number, number][] };
    }
  });

  return { markers, polygon };
}

/**
 * Serialises `data` to JSON and triggers a browser file download.
 * The object URL is revoked immediately after the click to free memory.
 */
export function downloadJSON(data: object, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
