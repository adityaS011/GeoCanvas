import MarkerList from './MarkerList';
import PolygonInfo from './PolygonInfo';
import type { MarkerData, PolygonData } from '../../types';

interface SidebarProps {
  markers: MarkerData[];
  polygon: PolygonData | null;
  selectedMarkerId: string | null;
  onSelectMarker: (id: string) => void;
  onRemoveMarker: (id: string) => void;
}

export default function Sidebar({
  markers,
  polygon,
  selectedMarkerId,
  onSelectMarker,
  onRemoveMarker,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__logo">GeoCanvas</h1>
        <p className="sidebar__subtitle">Interactive Map Tool</p>
      </div>

      <div className="sidebar__content">
        <MarkerList
          markers={markers}
          selectedId={selectedMarkerId}
          onSelect={onSelectMarker}
          onRemove={onRemoveMarker}
        />
        <PolygonInfo polygon={polygon} />
      </div>
    </aside>
  );
}
