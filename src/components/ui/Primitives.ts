/**
 * Shared styled primitives used across sidebar sections and other panels.
 * These are the design system's base layout elements — reusable building
 * blocks that keep component files focused on logic, not boilerplate CSS.
 */
import styled from 'styled-components';

/** Flex column container for a sidebar section (e.g. Markers, Polygon) */
export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

/** Row between section title and optional actions (e.g. count badge) */
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 8px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4px;
`;

/** Uppercase label for a section title */
export const SectionTitle = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
`;

/** Key–value row used in info panels (e.g. Vertices → 3) */
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

/** Left-side label inside a Row */
export const Label = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
`;

/** Right-side value inside a Row */
export const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

/** Placeholder text shown when a section has no content */
export const EmptyText = styled.p`
  font-size: 12px;
  color: var(--color-text-secondary);
  padding: 8px 0;
`;

/** Thick horizontal divider between major sidebar sections */
export const Divider = styled.hr`
  border: none;
  border-top: 2px solid var(--color-border);
  margin: 8px 0;
`;
