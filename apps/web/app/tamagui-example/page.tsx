'use client'

import { TamaguiButton } from '@repo/ui/tamagui-button'
import { TamaguiCard } from '@repo/ui/tamagui-card'
import { YStack } from 'tamagui'

export default function TamaguiExample() {
  return (
    <YStack flex={1} p='$4' gap='$4'>
      <TamaguiCard
        title='Welcome to Tamagui'
        description='This is a cross-platform UI component that works on both web and native!'
        footer={
          <YStack gap='$2'>
            <TamaguiButton onPress={() => alert('Primary button clicked!')} variant='primary'>
              Primary Button
            </TamaguiButton>
            <TamaguiButton onPress={() => alert('Secondary button clicked!')} variant='secondary'>
              Secondary Button
            </TamaguiButton>
          </YStack>
        }
      >
        <YStack gap='$2'>
          <TamaguiButton onPress={() => alert('Small button!')} customSize='small' variant='ghost'>
            Small Ghost Button
          </TamaguiButton>
          <TamaguiButton onPress={() => alert('Large button!')} customSize='large'>
            Large Button
          </TamaguiButton>
        </YStack>
      </TamaguiCard>
    </YStack>
  )
}
