export interface MarkerData {
  id: string;
  longitude: number;
  latitude: number;
}

export interface PolygonData {
  vertices: [number, number][];
}

export interface MapState {
  markers: MarkerData[];
  polygon: PolygonData | null;
}

export type DrawingMode = 'marker' | 'polygon' | null;
