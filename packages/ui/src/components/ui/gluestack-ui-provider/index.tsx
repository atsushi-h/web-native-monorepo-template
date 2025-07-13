'use client'

import React from 'react'
import { GluestackUIProvider as GluestackUIProviderInternal } from '@gluestack-ui/themed'
import { config } from './config'

type GluestackUIProviderProps = {
  mode?: 'light' | 'dark' | 'system'
  children: React.ReactNode
}

export const GluestackUIProvider = ({ 
  mode = 'light',
  children 
}: GluestackUIProviderProps) => {
  return (
    <GluestackUIProviderInternal config={config} colorMode={mode}>
      {children}
    </GluestackUIProviderInternal>
  )
}