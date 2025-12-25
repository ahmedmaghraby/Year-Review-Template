import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
  icon?: React.ReactNode
}

/**
 * Animated button component with multiple variants and sizes
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className,
      isLoading = false,
      icon,
      disabled,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onDragStart,
      onDrag,
      onDragEnd,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-brand-darkblue disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-brand-blue to-brand-skyblue text-white hover:shadow-lg hover:shadow-brand-blue/50 active:scale-95',
      secondary:
        'bg-brand-darkblue/50 border border-brand-blue/30 text-brand-skyblue hover:border-brand-blue/60 hover:bg-brand-darkblue/80 active:scale-95',
      ghost:
        'text-brand-skyblue hover:bg-brand-blue/10 hover:text-brand-blue active:bg-brand-blue/20',
    }

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {icon && !isLoading && <span className="flex">{icon}</span>}
        {isLoading && (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
