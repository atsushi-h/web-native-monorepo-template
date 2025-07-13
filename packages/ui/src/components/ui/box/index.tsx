'use client'

import React from 'react'
import { View, ViewProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface BoxProps extends ViewProps {
  className?: string
  children?: React.ReactNode
}

export const Box = React.forwardRef<View, BoxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View 
        ref={ref} 
        className={cn('flex', className)} 
        {...props}
      >
        {children}
      </View>
    )
  }
)

Box.displayName = 'Box'