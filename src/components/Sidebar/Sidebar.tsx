import MarkerList from './MarkerList';
import PolygonInfo from './PolygonInfo';
import { GlobeIcon, ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons';
import type { MarkerData, PolygonData } from '../../types';

interface SidebarProps {
  markers: MarkerData[];
  polygon: PolygonData | null;
  selectedMarkerId: string | null;
  collapsed: boolean;
  onToggle: () => void;
  onSelectMarker: (id: string) => void;
  onRemoveMarker: (id: string) => void;
}

export default function Sidebar({
  markers,
  polygon,
  selectedMarkerId,
  collapsed,
  onToggle,
  onSelectMarker,
  onRemoveMarker,
}: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <GlobeIcon className="sidebar__icon" />
          {!collapsed && (
            <div>
              <h1 className="sidebar__logo">GeoCanvas</h1>
              <p className="sidebar__subtitle">Interactive Map Tool</p>
            </div>
          )}
        </div>
        <button className="sidebar__toggle" onClick={onToggle} title="Toggle sidebar">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar__content">
          <MarkerList
            markers={markers}
            selectedId={selectedMarkerId}
            onSelect={onSelectMarker}
            onRemove={onRemoveMarker}
          />
          <PolygonInfo polygon={polygon} />
        </div>
      )}
    </aside>
  );
}
