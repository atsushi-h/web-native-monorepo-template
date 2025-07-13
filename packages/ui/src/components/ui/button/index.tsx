'use client'

import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface ButtonProps extends PressableProps {
  className?: string
  children?: React.ReactNode
  variant?: 'solid' | 'outline' | 'link' | 'ghost'
  action?: 'primary' | 'secondary' | 'positive' | 'negative'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isDisabled?: boolean
}

const variantClasses = {
  solid: 'bg-primary-500 border border-primary-500',
  outline: 'bg-transparent border border-primary-500',
  link: 'bg-transparent border-0',
  ghost: 'bg-transparent border-0',
}

const actionClasses = {
  primary: 'bg-primary-500 border-primary-500',
  secondary: 'bg-secondary-500 border-secondary-500', 
  positive: 'bg-success-500 border-success-500',
  negative: 'bg-error-500 border-error-500',
}

const sizeClasses = {
  xs: 'px-3 py-2 rounded-md',
  sm: 'px-4 py-2 rounded-md',
  md: 'px-6 py-3 rounded-lg',
  lg: 'px-8 py-4 rounded-lg',
  xl: 'px-10 py-5 rounded-xl',
}

export const Button = React.forwardRef<Pressable, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'solid',
    action = 'primary',
    size = 'md',
    isDisabled = false,
    ...props 
  }, ref) => {
    const variantClass = variantClasses[variant]
    const actionClass = actionClasses[action]
    const sizeClass = sizeClasses[size]
    const disabledClass = isDisabled ? 'opacity-50' : ''
    
    return (
      <Pressable 
        ref={ref} 
        className={cn(
          'flex justify-center items-center',
          variantClass,
          variant === 'solid' ? actionClass : '',
          sizeClass,
          disabledClass,
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </Pressable>
    )
  }
)

Button.displayName = 'Button'