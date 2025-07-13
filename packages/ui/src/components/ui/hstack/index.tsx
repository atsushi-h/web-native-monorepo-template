'use client'

import React from 'react'
import { View, ViewProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface HStackProps extends ViewProps {
  className?: string
  children?: React.ReactNode
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  reversed?: boolean
}

const spaceClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
}

export const HStack = React.forwardRef<View, HStackProps>(
  ({ className, children, space, reversed = false, ...props }, ref) => {
    const spaceClass = space ? spaceClasses[space] : ''
    const directionClass = reversed ? 'flex-row-reverse' : 'flex-row'
    
    return (
      <View 
        ref={ref} 
        className={cn('flex', directionClass, 'items-center', spaceClass, className)} 
        {...props}
      >
        {children}
      </View>
    )
  }
)

HStack.displayName = 'HStack'