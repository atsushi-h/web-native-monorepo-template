import {
  useDeleteApiTodosById,
  useGetApiTodos,
  usePostApiTodos,
  usePutApiTodosById,
} from '@repo/api-client'
import { useQueryClient } from '@tanstack/react-query'
import type { TodoFeatureProps } from '../types'

export function useTodos(): TodoFeatureProps {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useGetApiTodos()

  const createMutation = usePostApiTodos({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/todos'] })
      },
    },
  })

  const updateMutation = usePutApiTodosById({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/todos'] })
      },
    },
  })

  const deleteMutation = useDeleteApiTodosById({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/todos'] })
      },
    },
  })

  const handleAddTodo = (title: string) => {
    createMutation.mutate({
      data: { title, completed: false },
    })
  }

  const handleToggleTodo = (id: number) => {
    const todo = data?.find((t) => t.id === id)
    if (todo) {
      updateMutation.mutate({
        id: id.toString(),
        data: { completed: !todo.completed },
      })
    }
  }

  const handleUpdateTodo = (id: number, title: string) => {
    updateMutation.mutate({
      id: id.toString(),
      data: { title },
    })
  }

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id: id.toString() })
  }

  const todos = data || []

  return {
    todos,
    isLoading,
    error: error instanceof Error ? error : error ? new Error('Unknown error occurred') : null,
    isEmpty: todos.length === 0,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    onAddTodo: handleAddTodo,
    onToggleTodo: handleToggleTodo,
    onUpdateTodo: handleUpdateTodo,
    onDeleteTodo: handleDeleteTodo,
  }
}
