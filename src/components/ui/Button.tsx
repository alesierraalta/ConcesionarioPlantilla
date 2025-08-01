'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  ripple?: boolean
  glow?: boolean
  magnetic?: boolean
}

const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary', 
  outline: 'btn-outline',
  white: 'btn-white',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'btn-lg',
  xl: 'px-10 py-5 text-xl rounded-3xl'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled,
    children,
    icon,
    fullWidth = false,
    ripple = false,
    glow = false,
    magnetic = false,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(
          'btn focus-visible transition-all duration-300 ease-out relative overflow-hidden',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed',
          glow && 'animate-pulse-glow',
          'hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-lg',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {!loading && icon && (
          <span className="transition-transform duration-200 hover:scale-102">
            {icon}
          </span>
        )}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }