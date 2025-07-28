import { useTodos } from '@repo/features'
import { TodosScreen } from '@repo/ui'

import type { Route } from './+types/todos'

export function meta(_args: Route.MetaArgs) {
  return [{ title: 'Todo App' }, { name: 'description', content: 'Manage your todos' }]
}

export default function TodosPage() {
  const todosProps = useTodos()
  return <TodosScreen {...todosProps} />
}
