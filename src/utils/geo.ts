import * as turf from '@turf/turf';
import type { MapState, MarkerData } from '../types';

export function calculatePolygonArea(vertices: [number, number][]): number {
  if (vertices.length < 3) return 0;

  const closed = [...vertices, vertices[0]];
  const polygon = turf.polygon([closed]);

  return turf.area(polygon);
}

export function formatArea(sqMeters: number): string {
  if (sqMeters >= 1_000_000) {
    return `${(sqMeters / 1_000_000).toFixed(2)} km²`;
  }
  if (sqMeters >= 10_000) {
    return `${(sqMeters / 10_000).toFixed(2)} ha`;
  }
  return `${sqMeters.toFixed(2)} m²`;
}

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
    const closed = [...state.polygon.vertices, state.polygon.vertices[0]];
    features.push({
      type: 'Feature',
      properties: { type: 'polygon' },
      geometry: { type: 'Polygon', coordinates: [closed] },
    });
  }

  return { type: 'FeatureCollection', features };
}

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
      polygon = { vertices: coords.slice(0, -1) as [number, number][] };
    }
  });

  return { markers, polygon };
}

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
