import { TamaguiButton } from '@repo/ui/tamagui-button'
import { TamaguiCard } from '@repo/ui/tamagui-card'
import { StyleSheet } from 'react-native'
import { YStack } from 'tamagui'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title'>Hello World</ThemedText>
      <YStack gap='$4' mt='$4'>
        <TamaguiCard
          title='Tamagui in React Native'
          description='This card is rendered using Tamagui!'
          footer={
            <TamaguiButton
              onPress={() => console.log('Button pressed!')}
              variant='primary'
              customSize='medium'
            >
              Press Me
            </TamaguiButton>
          }
        >
          <TamaguiButton onPress={() => console.log('Secondary!')} variant='secondary'>
            Secondary Button
          </TamaguiButton>
        </TamaguiCard>
      </YStack>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
