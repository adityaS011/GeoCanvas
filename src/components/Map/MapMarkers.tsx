import { Marker } from 'react-map-gl';
import type { MarkerData } from '../../types';

interface MapMarkersProps {
  markers: MarkerData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MapMarkers({
  markers,
  selectedId,
  onSelect,
}: MapMarkersProps) {
  return (
    <>
      {markers.map((m) => (
        <Marker
          key={m.id}
          longitude={m.longitude}
          latitude={m.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onSelect(m.id);
          }}
        >
          <div
            className={`map-marker ${m.id === selectedId ? 'map-marker--selected' : ''}`}
            title={`${m.latitude.toFixed(4)}, ${m.longitude.toFixed(4)}`}
          />
        </Marker>
      ))}
    </>
  );
}
