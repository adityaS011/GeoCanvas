import styled from 'styled-components';
import MarkerItem from './MarkerItem';
import type { MarkerData } from '../../types';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 8px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4px;
`;

const SectionTitle = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
`;

const CountBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 220px;
  overflow-y: auto;
`;

const EmptyText = styled.p`
  font-size: 12px;
  color: var(--color-text-secondary);
  padding: 8px 0;
`;

interface MarkerListProps {
  markers: MarkerData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function MarkerList({ markers, selectedId, onSelect, onRemove }: MarkerListProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Markers</SectionTitle>
        {markers.length > 0 && (
          <CountBadge>{String(markers.length).padStart(2, '0')}</CountBadge>
        )}
      </SectionHeader>
      {markers.length === 0 ? (
        <EmptyText>Click on the map to add markers</EmptyText>
      ) : (
        <List>
          {markers.map((m, i) => (
            <MarkerItem
              key={m.id}
              marker={m}
              index={i + 1}
              selected={m.id === selectedId}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ))}
        </List>
      )}
    </Section>
  );
}
