import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export default function Panel({
  title,
  children,
  className = '',
  actions,
}: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      {(title || actions) && (
        <header className="panel__header">
          {title && <h3 className="panel__title">{title}</h3>}
          {actions && <div className="panel__actions">{actions}</div>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}
