import styled from 'styled-components';
import SidebarHeader from './SidebarHeader';
import MarkerList from './MarkerList';
import PolygonInfo from './PolygonInfo';
import type { MarkerData, PolygonData } from '../../types';

const SidebarWrapper = styled.aside<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)')};
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease, height 0.2s ease;
  flex-shrink: 0;
  @media (max-width: 768px) {
    order: 2;
    width: 100% !important;
    height: ${({ $collapsed }) => ($collapsed ? '52px' : '42vh')};
    border-right: none;
    border-top: 1px solid var(--color-border);
    border-bottom: none;
    box-shadow: ${({ $collapsed }) => ($collapsed ? 'none' : '0 -4px 16px rgba(0,0,0,0.08)')};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid var(--color-border);
  margin: 8px 0;
`;

const Footer = styled.div`
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
`;

const SyncDot = styled.span<{ $synced: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $synced }) => ($synced ? 'var(--color-success)' : 'var(--color-danger)')};
`;

interface SidebarProps {
  markers: MarkerData[];
  polygon: PolygonData | null;
  selectedMarkerId: string | null;
  collapsed: boolean;
  isSynced: boolean;
  onToggle: () => void;
  onSelectMarker: (id: string) => void;
  onRemoveMarker: (id: string) => void;
}

export default function Sidebar({
  markers, polygon, selectedMarkerId, collapsed, isSynced, onToggle, onSelectMarker, onRemoveMarker,
}: SidebarProps) {
  return (
    <SidebarWrapper $collapsed={collapsed}>
      <SidebarHeader
        collapsed={collapsed}
        isMobile={typeof window !== 'undefined' && window.innerWidth <= 768}
        onToggle={onToggle}
      />
      {!collapsed && (
        <>
          <Content>
            <MarkerList
              markers={markers}
              selectedId={selectedMarkerId}
              onSelect={onSelectMarker}
              onRemove={onRemoveMarker}
            />
            <Divider />
            <PolygonInfo polygon={polygon} />
          </Content>
          <Footer>
            <SyncDot $synced={isSynced} />
            {isSynced ? 'Autosaved a moment ago' : 'Unsaved changes'}
          </Footer>
        </>
      )}
    </SidebarWrapper>
  );
}
