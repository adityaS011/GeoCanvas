import styled from 'styled-components';
import { Marker } from 'react-map-gl';
import type { MarkerData } from '../../types';

const MapMarker = styled.div<{ $selected: boolean }>`
  width: 14px;
  height: 14px;
  background: ${({ $selected }) => ($selected ? 'var(--color-primary-hover)' : 'var(--color-primary)')};
  border: 2.5px solid white;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.15s ease;
  transform: ${({ $selected }) => ($selected ? 'scale(1.4)' : 'scale(1)')};
  &:hover { transform: scale(1.4); background: var(--color-primary-hover); }
`;

interface MapMarkersProps {
  markers: MarkerData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapMarkers({ markers, selectedId, onSelect }: MapMarkersProps) {
  return (
    <>
      {markers.map((m) => (
        <Marker
          key={m.id}
          longitude={m.longitude}
          latitude={m.latitude}
          anchor="bottom"
          onClick={(e) => { e.originalEvent.stopPropagation(); onSelect(m.id); }}
        >
          <MapMarker
            $selected={m.id === selectedId}
            title={`${m.latitude.toFixed(4)}, ${m.longitude.toFixed(4)}`}
          />
        </Marker>
      ))}
    </>
  );
}
