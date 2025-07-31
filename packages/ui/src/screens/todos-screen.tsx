import type { Todo, TodoFeatureProps } from '@repo/features'
import { H1, XStack, YStack } from 'tamagui'
import { TodoForm, TodoItem, TodoList } from '..'

export function TodosScreen({
  todos,
  isLoading,
  error,
  isEmpty,
  isCreating,
  onAddTodo,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoFeatureProps) {
  return (
    <YStack flex={1} bg='$background'>
      <XStack
        bg='$background'
        borderBottomWidth={1}
        borderBottomColor='$borderColor'
        py='$4'
        px='$4'
      >
        <YStack flex={1} width='100%'>
          <H1 size='$8' mb='$4'>
            Todo App
          </H1>
          <TodoForm onSubmit={onAddTodo} isLoading={isCreating} />
        </YStack>
      </XStack>

      <YStack flex={1} width='100%'>
        <TodoList isLoading={isLoading} error={error} isEmpty={isEmpty}>
          {todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggle={onToggleTodo}
              onUpdate={onUpdateTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </TodoList>
      </YStack>
    </YStack>
  )
}
