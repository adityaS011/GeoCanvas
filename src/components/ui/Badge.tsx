import styled from 'styled-components';

const StyledBadge = styled.span<{ $active?: boolean }>``;

interface BadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Badge({ label, active, onClick }: BadgeProps) {
  return (
    <StyledBadge
      $active={active}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </StyledBadge>
  );
}
