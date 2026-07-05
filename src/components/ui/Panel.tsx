import styled from 'styled-components';
import type { ReactNode } from 'react';

const PanelWrapper = styled.section`
  background: var(--color-bg);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
`;

const PanelTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
`;

const PanelActions = styled.div`
  display: flex;
  align-items: center;
`;

const PanelBody = styled.div`
  padding: 8px 14px;
`;

interface PanelProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Panel({ title, children, actions }: PanelProps) {
  return (
    <PanelWrapper>
      {(title || actions) && (
        <PanelHeader>
          {title && <PanelTitle>{title}</PanelTitle>}
          {actions && <PanelActions>{actions}</PanelActions>}
        </PanelHeader>
      )}
      <PanelBody>{children}</PanelBody>
    </PanelWrapper>
  );
}
