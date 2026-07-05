import styled from 'styled-components';
import { useCallback, useState } from 'react';
import Map, { NavigationControl, type MapLayerMouseEvent, type ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapMarkers from './MapMarkers';
import MapPolygon from './MapPolygon';
import { MAPBOX_TOKEN, INITIAL_VIEW, MAP_STYLE } from '../../utils/constants';
import type { MarkerData, PolygonData, DrawingMode } from '../../types';

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 0;
  min-height: 200px;
  @media (max-width: 768px) {
    order: 1;
  }
`;

interface MapViewProps {
  markers: MarkerData[];
  polygon: PolygonData | null;
  drawingMode: DrawingMode;
  selectedMarkerId: string | null;
  onAddMarker: (lng: number, lat: number) => void;
  onAddPolygonVertex: (lng: number, lat: number) => void;
  onSelectMarker: (id: string) => void;
}

export default function MapView({
  markers, polygon, drawingMode, selectedMarkerId,
  onAddMarker, onAddPolygonVertex, onSelectMarker,
}: MapViewProps) {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW);

  const handleClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const { lng, lat } = e.lngLat;
      if (drawingMode === 'marker') onAddMarker(lng, lat);
      else if (drawingMode === 'polygon') onAddPolygonVertex(lng, lat);
    },
    [drawingMode, onAddMarker, onAddPolygonVertex]
  );

  return (
    <MapContainer>
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        onClick={handleClick}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        cursor={drawingMode ? 'crosshair' : 'grab'}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        <MapMarkers markers={markers} selectedId={selectedMarkerId} onSelect={onSelectMarker} />
        <MapPolygon polygon={polygon} />
      </Map>
    </MapContainer>
  );
}
