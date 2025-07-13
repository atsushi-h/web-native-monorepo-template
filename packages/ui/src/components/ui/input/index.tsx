'use client'

import React from 'react'
import { View, ViewProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface InputProps extends ViewProps {
  className?: string
  children?: React.ReactNode
  variant?: 'outline' | 'underlined' | 'rounded'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isDisabled?: boolean
  isInvalid?: boolean
}

const variantClasses = {
  outline: 'border border-outline-300 rounded-md',
  underlined: 'border-b border-outline-300',
  rounded: 'border border-outline-300 rounded-full',
}

const sizeClasses = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-5 py-4',
  xl: 'px-6 py-5',
}

export const Input = React.forwardRef<View, InputProps>(
  ({ 
    className, 
    children, 
    variant = 'outline',
    size = 'md',
    isDisabled = false,
    isInvalid = false,
    ...props 
  }, ref) => {
    const variantClass = variantClasses[variant]
    const sizeClass = sizeClasses[size]
    const disabledClass = isDisabled ? 'opacity-50' : ''
    const invalidClass = isInvalid ? 'border-error-500' : ''
    
    return (
      <View 
        ref={ref} 
        className={cn(
          'flex-row items-center bg-background-0 dark:bg-background-900',
          variantClass,
          sizeClass,
          disabledClass,
          invalidClass,
          className
        )}
        {...props}
      >
        {children}
      </View>
    )
  }
)

Input.displayName = 'Input'