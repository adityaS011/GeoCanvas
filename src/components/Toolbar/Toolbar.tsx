import { useRef } from 'react';
import { Button } from '../ui';
import {
  MarkerIcon,
  PolygonIcon,
  SaveIcon,
  TrashIcon,
  ExportIcon,
  ImportIcon,
  CheckCircleIcon,
} from '../ui/Icons';
import type { DrawingMode, MapState } from '../../types';
import { stateToGeoJSON, geoJSONToState, downloadJSON } from '../../utils/geo';

interface ToolbarProps {
  drawingMode: DrawingMode;
  markers: MapState['markers'];
  polygon: MapState['polygon'];
  isSynced: boolean;
  onModeChange: (mode: DrawingMode) => void;
  onSave: () => void;
  onClear: () => void;
  onLoadState: (state: MapState) => void;
}

export default function Toolbar({
  drawingMode,
  markers,
  polygon,
  isSynced,
  onModeChange,
  onSave,
  onClear,
  onLoadState,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const geojson = stateToGeoJSON({ markers, polygon });
    downloadJSON(geojson, 'geocanvas-export.geojson');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const geojson = JSON.parse(event.target?.result as string);
        const state = geoJSONToState(geojson);
        onLoadState(state);
      } catch {
        alert('Invalid GeoJSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <div className="toolbar__group">
          <Button
            variant={drawingMode === 'marker' ? 'primary' : 'secondary'}
            icon={<MarkerIcon />}
            onClick={() => onModeChange(drawingMode === 'marker' ? null : 'marker')}
          >
            Marker
          </Button>
          <Button
            variant={drawingMode === 'polygon' ? 'primary' : 'secondary'}
            icon={<PolygonIcon />}
            onClick={() => onModeChange(drawingMode === 'polygon' ? null : 'polygon')}
          >
            Polygon
          </Button>
        </div>

        <div className="toolbar__group">
          <Button variant="primary" icon={<SaveIcon />} onClick={onSave}>
            Save
          </Button>
          <Button variant="ghost" icon={<TrashIcon />} onClick={onClear}>
            Clear all
          </Button>
        </div>
      </div>

      <div className="toolbar__right">
        {isSynced && (
          <span className="toolbar__status">
            <CheckCircleIcon className="toolbar__status-dot" />
            SYNCED
          </span>
        )}

        <div className="toolbar__group">
          <Button variant="ghost" icon={<ExportIcon />} onClick={handleExport}>
            Export
          </Button>
          <Button
            variant="ghost"
            icon={<ImportIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".geojson,.json"
            onChange={handleImport}
            hidden
          />
        </div>
      </div>
    </div>
  );
}
