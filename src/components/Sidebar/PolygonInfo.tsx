import styled from 'styled-components';
import { calculatePolygonArea, formatArea } from '../../utils/geo';
import { Section, SectionHeader, SectionTitle, Row, Label, Value, EmptyText } from '../ui/Primitives';
import type { PolygonData } from '../../types';

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
