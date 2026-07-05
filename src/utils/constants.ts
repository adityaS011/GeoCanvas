export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export const INITIAL_VIEW = {
  longitude: 77.5946,
  latitude: 12.9716,
  zoom: 12,
} as const;

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

export const STORAGE_KEY = 'geocanvas-map-state';
