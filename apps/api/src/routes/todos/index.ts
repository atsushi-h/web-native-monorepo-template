import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { Env } from '../../app'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from './handlers'
import { CreateTodoSchema, ParamSchema, UpdateTodoSchema } from './schemas'
import {
  handleCreateTodoError,
  handleParamValidationError,
  handleUpdateTodoError,
} from './validation'

const todos = new Hono<{ Bindings: Env }>()
  // Get all todos
  .get('/', getAllTodos)
  // Get a single todo by ID
  .get('/:id', zValidator('param', ParamSchema, handleParamValidationError), getTodoById)
  // Create a new todo
  .post('/', zValidator('json', CreateTodoSchema, handleCreateTodoError), createTodo)
  // Update a todo
  .put(
    '/:id',
    zValidator('param', ParamSchema, handleParamValidationError),
    zValidator('json', UpdateTodoSchema, handleUpdateTodoError),
    updateTodo,
  )
  // Delete a todo
  .delete('/:id', zValidator('param', ParamSchema, handleParamValidationError), deleteTodo)

export default todos
export type TodosApp = typeof todos
