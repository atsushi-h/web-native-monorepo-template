'use client'

import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface TextProps extends RNTextProps {
  className?: string
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ className, children, size = 'md', ...props }, ref) => {
    return (
      <RNText 
        ref={ref} 
        className={cn(sizeClasses[size], 'text-typography-900 dark:text-typography-50', className)} 
        {...props}
      >
        {children}
      </RNText>
    )
  }
)

Text.displayName = 'Text'