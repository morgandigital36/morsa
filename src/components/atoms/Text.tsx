import { ReactNode, HTMLAttributes, createElement } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'arabic';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'inverse' | 'success' | 'error';
  align?: 'left' | 'center' | 'right';
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function Text({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  children,
  as,
  className = '',
  ...props
}: TextProps) {
  const variants = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    body: 'text-base',
    caption: 'text-sm',
    arabic: 'text-2xl md:text-3xl font-arabic leading-relaxed',
  };

  const weights = {
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colors = {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    inverse: 'text-white',
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
  };

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const elementType = as || (variant.startsWith('h') ? variant : 'p');

  return createElement(
    elementType,
    {
      className: `${variants[variant]} ${weights[weight]} ${colors[color]} ${aligns[align]} ${className}`,
      ...props,
    },
    children
  );
}
