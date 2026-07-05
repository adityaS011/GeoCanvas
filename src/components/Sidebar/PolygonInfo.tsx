import styled from 'styled-components';
import { calculatePolygonArea, formatArea } from '../../utils/geo';
import type { PolygonData } from '../../types';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

const Label = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

const AreaValue = styled.span`
  display: flex;
  align-items: baseline;
  gap: 3px;
  color: var(--color-primary);
  font-weight: 600;
`;

const AreaNumber = styled.span`
  font-size: 20px;
`;

const AreaUnit = styled.span`
  font-size: 11px;
  color: var(--color-text-secondary);
`;

const EmptyText = styled.p`
  font-size: 12px;
  color: var(--color-text-secondary);
  padding: 8px 0;
`;

interface PolygonInfoProps {
  polygon: PolygonData | null;
}

export default function PolygonInfo({ polygon }: PolygonInfoProps) {
  const vertexCount = polygon?.vertices.length ?? 0;
  const area = polygon ? calculatePolygonArea(polygon.vertices) : 0;
  const [areaNum, areaUnit] = formatArea(area).split(' ');

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Polygon</SectionTitle>
      </SectionHeader>
      {vertexCount === 0 ? (
        <EmptyText>Switch to polygon mode and click to draw vertices</EmptyText>
      ) : (
        <>
          <Row>
            <Label>Vertices</Label>
            <Value>{vertexCount}</Value>
          </Row>
          {vertexCount >= 3 && (
            <Row>
              <Label>Area</Label>
              <AreaValue>
                <AreaNumber>{areaNum}</AreaNumber>
                <AreaUnit>{areaUnit}</AreaUnit>
              </AreaValue>
            </Row>
          )}
          {vertexCount < 3 && (
            <EmptyText>
              Add {3 - vertexCount} more {3 - vertexCount === 1 ? 'vertex' : 'vertices'} to complete
            </EmptyText>
          )}
        </>
      )}
    </Section>
  );
}
