import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'neo-button text-primary-main dark:text-primary-light font-bold active:neo-pressed',
    secondary: 'neo-button text-slate-600 dark:text-slate-300 active:neo-pressed',
    ghost: 'bg-transparent transition-colors hover:bg-slate-300 dark:hover:bg-slate-700 text-primary-main dark:text-white',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-4 py-2 text-base rounded-lg',
    large: 'px-6 py-3 text-lg rounded-xl',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
