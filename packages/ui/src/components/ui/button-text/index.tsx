'use client'

import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface ButtonTextProps extends RNTextProps {
  className?: string
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  xs: 'text-xs font-medium',
  sm: 'text-sm font-medium',
  md: 'text-base font-medium',
  lg: 'text-lg font-medium',
  xl: 'text-xl font-medium',
}

export const ButtonText = React.forwardRef<RNText, ButtonTextProps>(
  ({ className, children, size = 'md', ...props }, ref) => {
    return (
      <RNText 
        ref={ref} 
        className={cn(sizeClasses[size], 'text-white dark:text-white', className)} 
        {...props}
      >
        {children}
      </RNText>
    )
  }
)

ButtonText.displayName = 'ButtonText'