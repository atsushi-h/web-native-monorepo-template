'use client'

import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface HeadingProps extends RNTextProps {
  className?: string
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

const sizeClasses = {
  xs: 'text-lg font-semibold',
  sm: 'text-xl font-semibold',
  md: 'text-2xl font-semibold',
  lg: 'text-3xl font-bold',
  xl: 'text-4xl font-bold',
  '2xl': 'text-5xl font-bold',
  '3xl': 'text-6xl font-bold',
  '4xl': 'text-7xl font-bold',
  '5xl': 'text-8xl font-bold',
  '6xl': 'text-9xl font-bold',
}

export const Heading = React.forwardRef<RNText, HeadingProps>(
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

Heading.displayName = 'Heading'