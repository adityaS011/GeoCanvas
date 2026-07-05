export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export const INITIAL_VIEW = {
  longitude: 77.5946,
  latitude: 12.9716,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';

export const STORAGE_KEY = 'geocanvas-map-state';
