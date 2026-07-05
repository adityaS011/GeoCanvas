import { Panel } from '../ui';
import { calculatePolygonArea, formatArea } from '../../utils/geo';
import type { PolygonData } from '../../types';

interface PolygonInfoProps {
  polygon: PolygonData | null;
}

export default function PolygonInfo({ polygon }: PolygonInfoProps) {
  const vertexCount = polygon?.vertices.length ?? 0;
  const area = polygon ? calculatePolygonArea(polygon.vertices) : 0;

  return (
    <Panel title="Polygon">
      {vertexCount === 0 ? (
        <p className="empty-text">
          Switch to polygon mode and click to draw vertices
        </p>
      ) : (
        <div className="polygon-info">
          <div className="polygon-info__row">
            <span className="polygon-info__label">Vertices</span>
            <span className="polygon-info__value">{vertexCount}</span>
          </div>
          {vertexCount >= 3 && (
            <div className="polygon-info__row">
              <span className="polygon-info__label">Area</span>
              <span className="polygon-info__value polygon-info__value--highlight">
                {formatArea(area)}
              </span>
            </div>
          )}
          {vertexCount < 3 && (
            <p className="empty-text">
              Add {3 - vertexCount} more {3 - vertexCount === 1 ? 'vertex' : 'vertices'} to
              complete polygon
            </p>
          )}
        </div>
      )}
    </Panel>
  );
}
