import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import type { GetProps } from 'tamagui'
import { H2, Paragraph, ScrollView, Spinner, styled, YStack } from 'tamagui'

export interface TodoListProps {
  children: ReactNode
  isLoading?: boolean
  error?: Error | null
  isEmpty?: boolean
}

const Container = styled(YStack, {
  name: 'TodoListContainer',
  flex: 1,
  width: '100%',
  p: '$4',
  gap: '$4',
})

const EmptyState = styled(YStack, {
  name: 'TodoEmptyState',
  flex: 1,
  p: '$8',
  gap: '$4',
})

const ErrorState = styled(YStack, {
  name: 'TodoErrorState',
  flex: 1,
  p: '$8',
  gap: '$4',
  bg: '$red1',
})

const LoadingState = styled(YStack, {
  name: 'TodoLoadingState',
  flex: 1,
  p: '$8',
})

const TodoScrollView = styled(ScrollView, {
  name: 'TodoScrollView',
  flex: 1,
  width: '100%',
})

export function TodoList({
  children,
  isLoading = false,
  error = null,
  isEmpty = false,
}: TodoListProps) {
  if (isLoading) {
    return (
      <Container>
        <LoadingState>
          <Spinner size='large' color='$color' />
          <Paragraph size='$5' color='$color' opacity={0.6}>
            Loading todos...
          </Paragraph>
        </LoadingState>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <ErrorState>
          <AlertCircle size={48} color='$red10' />
          <H2 size='$6' color='$red10'>
            Error loading todos
          </H2>
          <Paragraph size='$4' color='$red10'>
            {error.message || 'An unexpected error occurred'}
          </Paragraph>
        </ErrorState>
      </Container>
    )
  }

  if (isEmpty && !isLoading) {
    return (
      <Container>
        <EmptyState>
          <CheckCircle2 size={48} color='$green10' opacity={0.5} />
          <H2 size='$6' color='$color' opacity={0.6}>
            No todos yet
          </H2>
          <Paragraph size='$4' color='$color' opacity={0.5}>
            Create your first todo to get started!
          </Paragraph>
        </EmptyState>
      </Container>
    )
  }

  return (
    <Container>
      <TodoScrollView showsVerticalScrollIndicator={false}>
        <YStack gap='$2'>{children}</YStack>
      </TodoScrollView>
    </Container>
  )
}

export type TodoListComponentProps = GetProps<typeof TodoList>
