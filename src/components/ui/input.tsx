import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={clsx(
            'w-full px-3 py-2 border rounded-lg',
            'bg-[rgb(var(--card-bg))] text-[rgb(var(--text))]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'transition-all duration-200',
            'placeholder:text-[rgb(var(--text-secondary))]',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-[rgb(var(--border))] focus:border-blue-500',
            disabled && 'opacity-50 cursor-not-allowed bg-[rgb(var(--hover))]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[rgb(var(--text-secondary))]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
