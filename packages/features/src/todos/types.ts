import type { Todo } from '@repo/api-client'

export interface TodoFeatureProps {
  todos: Todo[]
  isLoading: boolean
  error: Error | null
  isEmpty: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  onAddTodo: (title: string) => void
  onToggleTodo: (id: number) => void
  onUpdateTodo: (id: number, title: string) => void
  onDeleteTodo: (id: number) => void
}
