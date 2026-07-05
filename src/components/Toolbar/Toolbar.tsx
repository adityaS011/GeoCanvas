import styled from 'styled-components';
import { useRef } from 'react';
import { Button } from '../ui';
import { MarkerIcon, PolygonIcon, SaveIcon, TrashIcon, ExportIcon, ImportIcon } from '../ui/Icons';
import type { DrawingMode, MapState } from '../../types';
import { stateToGeoJSON, geoJSONToState, downloadJSON } from '../../utils/geo';

const ToolbarWrapper = styled.div`
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: var(--toolbar-height);
  gap: 8px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 12px;
    gap: 10px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 768px) { flex: 1; }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 768px) { justify-content: flex-end; }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: var(--color-border);
  @media (max-width: 768px) { display: none; }
`;

const ToggleGroup = styled.div`
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-bg);
`;

const ToggleBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--color-primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--color-text)')};
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  min-height: 44px;
  &:not(:last-child) { border-right: 1px solid var(--color-border); }
  &:hover {
    background: ${({ $active }) => ($active ? 'var(--color-primary-hover)' : 'var(--color-border)')};
  }
  @media (max-width: 768px) { padding: 0 10px; }
`;

const BtnLabel = styled.span`
  @media (max-width: 480px) { display: none; }
`;

interface ToolbarProps {
  drawingMode: DrawingMode;
  markers: MapState['markers'];
  polygon: MapState['polygon'];
  onModeChange: (mode: DrawingMode) => void;
  onSave: () => void;
  onClear: () => void;
  onLoadState: (state: MapState) => void;
}

export default function Toolbar({ drawingMode, markers, polygon, onModeChange, onSave, onClear, onLoadState }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => downloadJSON(stateToGeoJSON({ markers, polygon }), 'geocanvas-export.geojson');

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try { onLoadState(geoJSONToState(JSON.parse(ev.target?.result as string))); }
      catch { alert('Invalid GeoJSON file'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <ToolbarWrapper>
      <Left>
        <ToggleGroup>
          <ToggleBtn $active={drawingMode === 'marker'} onClick={() => onModeChange(drawingMode === 'marker' ? null : 'marker')}>
            <MarkerIcon /><BtnLabel>Marker</BtnLabel>
          </ToggleBtn>
          <ToggleBtn $active={drawingMode === 'polygon'} onClick={() => onModeChange(drawingMode === 'polygon' ? null : 'polygon')}>
            <PolygonIcon /><BtnLabel>Polygon</BtnLabel>
          </ToggleBtn>
        </ToggleGroup>
        <Separator />
        <Group>
          <Button variant="primary" icon={<SaveIcon />} onClick={onSave}><BtnLabel>Save</BtnLabel></Button>
          <Button variant="ghost" icon={<TrashIcon />} onClick={onClear}><BtnLabel>Clear</BtnLabel></Button>
        </Group>
      </Left>
      <Right>
        <Button variant="ghost" icon={<ExportIcon />} onClick={handleExport}><BtnLabel>Export</BtnLabel></Button>
        <Button variant="ghost" icon={<ImportIcon />} onClick={() => fileInputRef.current?.click()}><BtnLabel>Import</BtnLabel></Button>
        <input ref={fileInputRef} type="file" accept=".geojson,.json" onChange={handleImport} hidden />
      </Right>
    </ToolbarWrapper>
  );
}
