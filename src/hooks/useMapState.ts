import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { MarkerData, PolygonData, MapState, DrawingMode } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEY } from '../utils/constants';

const EMPTY_STATE: MapState = { markers: [], polygon: null };

/**
 * Central state manager for the map.
 *
 * Owns markers, polygon, drawing mode, and selection state.
 * Any mutation marks the state as "unsaved" (isSynced = false).
 * Calling save() or loadState() persists to localStorage and resets the flag.
 */
export function useMapState() {
  // Load the last saved state from localStorage as the initial value
  const [saved, persist] = useLocalStorage<MapState>(STORAGE_KEY, EMPTY_STATE);

  const [markers, setMarkers] = useState<MarkerData[]>(saved.markers);
  const [polygon, setPolygon] = useState<PolygonData | null>(saved.polygon);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('marker');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  // Tracks whether in-memory state matches what is saved to localStorage
  const [isSynced, setIsSynced] = useState(true);

  const markDirty = () => setIsSynced(false);

  const addMarker = useCallback((lng: number, lat: number) => {
    setMarkers((prev) => [
      ...prev,
      { id: uuid(), longitude: lng, latitude: lat },
    ]);
    markDirty();
  }, []);

  const removeMarker = useCallback(
    (id: string) => {
      setMarkers((prev) => prev.filter((m) => m.id !== id));
      // Clear selection if the removed marker was selected
      if (selectedMarkerId === id) setSelectedMarkerId(null);
      markDirty();
    },
    [selectedMarkerId]
  );

  const addPolygonVertex = useCallback((lng: number, lat: number) => {
    setPolygon((prev) => ({
      // Append the new vertex to the existing list (or start fresh)
      vertices: [...(prev?.vertices ?? []), [lng, lat]],
    }));
    markDirty();
  }, []);

  const clearAll = useCallback(() => {
    setMarkers([]);
    setPolygon(null);
    setSelectedMarkerId(null);
    persist(EMPTY_STATE);
    setIsSynced(true);
  }, [persist]);

  const save = useCallback(() => {
    persist({ markers, polygon });
    setIsSynced(true);
  }, [markers, polygon, persist]);

  // Replaces entire state (used after GeoJSON import)
  const loadState = useCallback(
    (state: MapState) => {
      setMarkers(state.markers);
      setPolygon(state.polygon);
      persist(state);
      setIsSynced(true);
    },
    [persist]
  );

  return {
    markers,
    polygon,
    drawingMode,
    selectedMarkerId,
    isSynced,
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
