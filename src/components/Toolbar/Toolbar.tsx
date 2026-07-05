import { useRef } from 'react';
import { Button, Badge } from '../ui';
import type { DrawingMode, MapState } from '../../types';
import { stateToGeoJSON, geoJSONToState, downloadJSON } from '../../utils/geo';

interface ToolbarProps {
  drawingMode: DrawingMode;
  markers: MapState['markers'];
  polygon: MapState['polygon'];
  onModeChange: (mode: DrawingMode) => void;
  onSave: () => void;
  onClear: () => void;
  onLoadState: (state: MapState) => void;
}

export default function Toolbar({
  drawingMode,
  markers,
  polygon,
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
      <div className="toolbar__group">
        <Badge
          label="Marker"
          active={drawingMode === 'marker'}
          onClick={() => onModeChange(drawingMode === 'marker' ? null : 'marker')}
        />
        <Badge
          label="Polygon"
          active={drawingMode === 'polygon'}
          onClick={() => onModeChange(drawingMode === 'polygon' ? null : 'polygon')}
        />
      </div>

      <div className="toolbar__group">
        <Button variant="primary" onClick={onSave}>Save</Button>
        <Button variant="danger" onClick={onClear}>Clear All</Button>
      </div>

      <div className="toolbar__group">
        <Button variant="ghost" onClick={handleExport}>Export</Button>
        <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
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
  );
}
