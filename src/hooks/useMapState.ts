import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { MarkerData, PolygonData, MapState, DrawingMode } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEY } from '../utils/constants';

const EMPTY_STATE: MapState = { markers: [], polygon: null };

export function useMapState() {
  const [saved, persist] = useLocalStorage<MapState>(STORAGE_KEY, EMPTY_STATE);
  const [markers, setMarkers] = useState<MarkerData[]>(saved.markers);
  const [polygon, setPolygon] = useState<PolygonData | null>(saved.polygon);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('marker');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const addMarker = useCallback((lng: number, lat: number) => {
    setMarkers((prev) => [
      ...prev,
      { id: uuid(), longitude: lng, latitude: lat },
    ]);
  }, []);

  const removeMarker = useCallback(
    (id: string) => {
      setMarkers((prev) => prev.filter((m) => m.id !== id));
      if (selectedMarkerId === id) setSelectedMarkerId(null);
    },
    [selectedMarkerId]
  );

  const addPolygonVertex = useCallback((lng: number, lat: number) => {
    setPolygon((prev) => ({
      vertices: [...(prev?.vertices ?? []), [lng, lat]],
    }));
  }, []);

  const clearAll = useCallback(() => {
    setMarkers([]);
    setPolygon(null);
    setSelectedMarkerId(null);
    persist(EMPTY_STATE);
  }, [persist]);

  const save = useCallback(() => {
    persist({ markers, polygon });
  }, [markers, polygon, persist]);

  const loadState = useCallback(
    (state: MapState) => {
      setMarkers(state.markers);
      setPolygon(state.polygon);
      persist(state);
    },
    [persist]
  );

  return {
    markers,
    polygon,
    drawingMode,
    selectedMarkerId,
    setDrawingMode,
    setSelectedMarkerId,
    addMarker,
    removeMarker,
    addPolygonVertex,
    clearAll,
    save,
    loadState,
  };
}
