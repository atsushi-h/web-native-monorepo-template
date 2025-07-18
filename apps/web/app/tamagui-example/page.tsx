'use client'

import { TamaguiButton } from '@repo/ui/tamagui-button'
import { TamaguiCard } from '@repo/ui/tamagui-card'
import { useState } from 'react'

export default function TamaguiExample() {
  const [message, setMessage] = useState<string>('')

  const handleButtonPress = (buttonType: string) => {
    setMessage(`${buttonType} button was pressed!`)
    // 本番環境ではalertの代わりにtoast通知などを使用
    if (process.env.NODE_ENV === 'development') {
      console.log(`${buttonType} button pressed`)
    }
  }

  return (
    <div style={{ padding: '16px' }}>
      <h1>Tamagui Example</h1>
      {message && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {message}
        </div>
      )}
      <TamaguiCard
        title='Welcome to Tamagui'
        description='This is a cross-platform UI component that works on both web and native!'
        footer={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TamaguiButton onPress={() => handleButtonPress('Primary')} variant='primary'>
              Primary Button
            </TamaguiButton>
            <TamaguiButton onPress={() => handleButtonPress('Secondary')} variant='secondary'>
              Secondary Button
            </TamaguiButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TamaguiButton
            onPress={() => handleButtonPress('Small ghost')}
            customSize='small'
            variant='ghost'
          >
            Small Ghost Button
          </TamaguiButton>
          <TamaguiButton onPress={() => handleButtonPress('Large')} customSize='large'>
            Large Button
          </TamaguiButton>
        </div>
      </TamaguiCard>
    </div>
  )
}
