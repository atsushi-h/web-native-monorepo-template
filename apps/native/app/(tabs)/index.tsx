import { Image } from 'expo-image'
import { Platform, StyleSheet } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { 
  Box,
  Button, 
  ButtonText,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
} from '@repo/ui'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type='defaultSemiBold'>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type='defaultSemiBold'>app</ThemedText> directory. This will move the current{' '}
          <ThemedText type='defaultSemiBold'>app</ThemedText> to{' '}
          <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Step 4: gluestack-ui v2 Demo</ThemedText>
        <ThemedText>
          Check out the new gluestack-ui v2 components with custom theming:
        </ThemedText>
        
        <Box className="p-4 bg-background-50 dark:bg-background-900 rounded-lg mt-4">
          <VStack space="md">
            <Heading size="lg" className="text-primary-600 dark:text-primary-400">
              Welcome to gluestack-ui v2!
            </Heading>
            
            <Text size="md" className="text-typography-700 dark:text-typography-300">
              これはカスタムテーマが適用されたコンポーネントのデモです。
            </Text>
            
            <Input variant="outline" size="md" className="bg-white dark:bg-background-800">
              <InputField 
                placeholder="Enter text here..."
                className="text-typography-900 dark:text-typography-50"
              />
            </Input>
            
            <HStack space="sm">
              <Button 
                size="md" 
                variant="solid" 
                action="primary"
                className="flex-1"
              >
                <ButtonText>Primary</ButtonText>
              </Button>
              
              <Button 
                size="md" 
                variant="outline" 
                action="secondary"
                className="flex-1"
              >
                <ButtonText className="text-secondary-600 dark:text-secondary-400">Secondary</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
