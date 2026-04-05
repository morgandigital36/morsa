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
    default: 'bg-white dark:bg-gray-800',
    primary: 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800',
    accent: 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-lg shadow-md transition-all duration-200 ${variants[variant]} ${paddings[padding]} ${hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
