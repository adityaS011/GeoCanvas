import { Panel } from '../ui';
import type { MarkerData } from '../../types';

interface MarkerListProps {
  markers: MarkerData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function MarkerList({
  markers,
  selectedId,
  onSelect,
  onRemove,
}: MarkerListProps) {
  if (markers.length === 0) {
    return (
      <Panel title="Markers">
        <p className="empty-text">Click on the map to add markers</p>
      </Panel>
    );
  }

  return (
    <Panel title={`Markers (${markers.length})`}>
      <ul className="marker-list">
        {markers.map((m, i) => (
          <li
            key={m.id}
            className={`marker-item ${m.id === selectedId ? 'marker-item--selected' : ''}`}
            onClick={() => onSelect(m.id)}
          >
            <div className="marker-item__info">
              <span className="marker-item__index">{i + 1}</span>
              <span className="marker-item__coords">
                {m.latitude.toFixed(4)}, {m.longitude.toFixed(4)}
              </span>
            </div>
            <button
              className="marker-item__remove"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(m.id);
              }}
              title="Remove marker"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
