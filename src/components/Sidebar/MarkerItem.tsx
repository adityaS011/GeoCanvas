import styled from 'styled-components';
import type { MarkerData } from '../../types';

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 6px 8px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.12s;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { color: var(--color-danger); }
  @media (max-width: 768px) { opacity: 1; }
`;

const Item = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;
  background: ${({ $selected }) => ($selected ? 'var(--color-surface)' : 'transparent')};
  box-shadow: ${({ $selected }) => ($selected ? 'inset 3px 0 0 var(--color-primary)' : 'none')};
  &:hover { background: var(--color-surface); }
  &:hover ${RemoveButton} { opacity: 1; }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemIndex = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemCoords = styled.span`
  font-size: 13px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  color: var(--color-text-secondary);
`;

interface MarkerItemProps {
  marker: MarkerData;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function MarkerItem({ marker, index, selected, onSelect, onRemove }: MarkerItemProps) {
  return (
    <Item $selected={selected} onClick={() => onSelect(marker.id)}>
      <ItemInfo>
        <ItemIndex>{index}</ItemIndex>
        <ItemCoords>
          {marker.latitude.toFixed(4)},&nbsp;&nbsp;{marker.longitude.toFixed(4)}
        </ItemCoords>
      </ItemInfo>
      <RemoveButton
        onClick={(e) => { e.stopPropagation(); onRemove(marker.id); }}
        title="Remove marker"
      >
        &times;
      </RemoveButton>
    </Item>
  );
}
