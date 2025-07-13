'use client'

import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { cn } from '@gluestack-ui/nativewind-utils'

export interface InputFieldProps extends TextInputProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isDisabled?: boolean
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  ({ 
    className, 
    size = 'md',
    isDisabled = false,
    ...props 
  }, ref) => {
    const sizeClass = sizeClasses[size]
    
    return (
      <TextInput 
        ref={ref} 
        className={cn(
          'flex-1 h-full text-typography-900 dark:text-typography-50 bg-transparent',
          sizeClass,
          className
        )}
        editable={!isDisabled}
        placeholderTextColor="#A1A1AA"
        {...props}
      />
    )
  }
)

InputField.displayName = 'InputField'