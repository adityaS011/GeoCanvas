import styled from 'styled-components';
import { GlobeIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '../ui/Icons';

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 52px;
  flex-shrink: 0;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const IconWrapper = styled.span`
  color: var(--color-primary);
  flex-shrink: 0;
  display: flex;
`;

const Logo = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
  white-space: nowrap;
`;

const Subtitle = styled.p`
  font-size: 11px;
  color: var(--color-text-secondary);
  margin-top: 1px;
  white-space: nowrap;
`;

const Toggle = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
  &:hover { background: var(--color-bg); color: var(--color-text); }
`;

interface SidebarHeaderProps {
  collapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export default function SidebarHeader({ collapsed, isMobile, onToggle }: SidebarHeaderProps) {
  const toggleIcon = isMobile
    ? collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />
    : collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />;

  return (
    <Header>
      <Brand>
        <IconWrapper><GlobeIcon /></IconWrapper>
        {!collapsed && (
          <div>
            <Logo>GeoCanvas</Logo>
            <Subtitle>Interactive Map Tool</Subtitle>
          </div>
        )}
      </Brand>
      <Toggle onClick={onToggle} title="Toggle sidebar">
        {toggleIcon}
      </Toggle>
    </Header>
  );
}
