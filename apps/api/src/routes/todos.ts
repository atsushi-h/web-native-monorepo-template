import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { Env } from '../app'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../todos/handlers'
import { CreateTodoSchema, ParamSchema, UpdateTodoSchema } from '../todos/schema'
import {
  handleCreateTodoError,
  handleParamValidationError,
  handleUpdateTodoError,
} from '../todos/validation'

const todos = new Hono<{ Bindings: Env }>()

// Get all todos
todos.get('/', getAllTodos)

// Get a single todo by ID
todos.get('/:id', zValidator('param', ParamSchema, handleParamValidationError), getTodoById)

// Create a new todo
todos.post('/', zValidator('json', CreateTodoSchema, handleCreateTodoError), createTodo)

// Update a todo
todos.put(
  '/:id',
  zValidator('param', ParamSchema, handleParamValidationError),
  zValidator('json', UpdateTodoSchema, handleUpdateTodoError),
  updateTodo,
)

// Delete a todo
todos.delete('/:id', zValidator('param', ParamSchema, handleParamValidationError), deleteTodo)

export default todos
export type TodosApp = typeof todos
