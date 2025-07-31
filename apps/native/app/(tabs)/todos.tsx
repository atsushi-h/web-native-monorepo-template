import { useTodos } from '@repo/features'
import { TodosScreen } from '@repo/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack } from 'tamagui'

export default function TodosPage() {
  const todosProps = useTodos()
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} paddingTop={insets.top}>
      <TodosScreen {...todosProps} />
    </YStack>
  )
}
