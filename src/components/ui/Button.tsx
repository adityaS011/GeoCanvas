import styled, { css } from 'styled-components';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

const variants: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: var(--color-primary); color: white; border-color: var(--color-primary);
    &:hover { background: var(--color-primary-hover); border-color: var(--color-primary-hover); }
  `,
  secondary: css`
    background: var(--color-surface); color: var(--color-text);
    &:hover { background: var(--color-bg); }
  `,
  danger: css`
    color: var(--color-danger); border-color: var(--color-danger); background: transparent;
    &:hover { background: var(--color-danger); color: white; }
  `,
  ghost: css`
    border: none; background: transparent; color: var(--color-text-secondary);
    &:hover { color: var(--color-text); background: var(--color-bg); }
  `,
};

const StyledButton = styled.button<{ $variant: Variant; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  ${({ $variant }) => variants[$variant]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%; justify-content: center;`}
`;

const ButtonIcon = styled.span`
  display: flex;
  font-size: 16px;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({ variant = 'secondary', icon, fullWidth, children, ...props }: ButtonProps) {
  return (
    <StyledButton $variant={variant} $fullWidth={fullWidth} {...props}>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      {children}
    </StyledButton>
  );
}
