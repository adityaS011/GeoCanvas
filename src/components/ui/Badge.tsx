interface BadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Badge({ label, active, onClick }: BadgeProps) {
  return (
    <span
      className={`badge ${active ? 'badge--active' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  );
}
