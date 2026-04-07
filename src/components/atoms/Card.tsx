import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const variants = {
    default: 'neo-card border border-slate-100 dark:border-slate-700/50',
    primary: 'neo-card border border-primary-light dark:border-primary-main/50',
    accent: 'neo-card border border-accent-green dark:border-green-800/50',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-lg transition-all duration-200 ${variants[variant]} ${paddings[padding]} ${hoverable ? 'hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
