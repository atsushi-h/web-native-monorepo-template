import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver, validator as zodValidator } from 'hono-openapi/zod'
import type { Env } from '../../app'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from './handlers'
import {
  CreateTodoSchema,
  ErrorSchema,
  ParamSchema,
  TodoListSchema,
  TodoSchema,
  UpdateTodoSchema,
} from './schemas'
import {
  handleCreateTodoError,
  handleParamValidationError,
  handleUpdateTodoError,
} from './validation'

const todos = new Hono<{ Bindings: Env }>()
  // Get all todos
  .get(
    '/',
    describeRoute({
      description: 'Get all todos',
      summary: 'Retrieve a list of all todo items',
      tags: ['todos'],
      responses: {
        200: {
          description: 'List of todos retrieved successfully',
          content: {
            'application/json': {
              schema: resolver(TodoListSchema),
            },
          },
        },
      },
    }),
    getAllTodos,
  )
  // Get a single todo by ID
  .get(
    '/:id',
    describeRoute({
      description: 'Get a todo by ID',
      summary: 'Retrieve a specific todo item by its ID',
      tags: ['todos'],
      responses: {
        200: {
          description: 'Todo retrieved successfully',
          content: {
            'application/json': {
              schema: resolver(TodoSchema),
            },
          },
        },
        404: {
          description: 'Todo not found',
          content: {
            'application/json': {
              schema: resolver(ErrorSchema),
            },
          },
        },
      },
    }),
    zodValidator('param', ParamSchema, handleParamValidationError),
    getTodoById,
  )
  // Create a new todo
  .post(
    '/',
    describeRoute({
      description: 'Create a new todo',
      summary: 'Create a new todo item',
      tags: ['todos'],
      responses: {
        201: {
          description: 'Todo created successfully',
          content: {
            'application/json': {
              schema: resolver(TodoSchema),
            },
          },
        },
        400: {
          description: 'Invalid request body',
          content: {
            'application/json': {
              schema: resolver(ErrorSchema),
            },
          },
        },
      },
    }),
    zodValidator('json', CreateTodoSchema, handleCreateTodoError),
    createTodo,
  )
  // Update a todo
  .put(
    '/:id',
    describeRoute({
      description: 'Update a todo',
      summary: 'Update an existing todo item',
      tags: ['todos'],
      responses: {
        200: {
          description: 'Todo updated successfully',
          content: {
            'application/json': {
              schema: resolver(TodoSchema),
            },
          },
        },
        404: {
          description: 'Todo not found',
          content: {
            'application/json': {
              schema: resolver(ErrorSchema),
            },
          },
        },
        400: {
          description: 'Invalid request body',
          content: {
            'application/json': {
              schema: resolver(ErrorSchema),
            },
          },
        },
      },
    }),
    zodValidator('param', ParamSchema, handleParamValidationError),
    zodValidator('json', UpdateTodoSchema, handleUpdateTodoError),
    updateTodo,
  )
  // Delete a todo
  .delete(
    '/:id',
    describeRoute({
      description: 'Delete a todo',
      summary: 'Delete a specific todo item',
      tags: ['todos'],
      responses: {
        204: {
          description: 'Todo deleted successfully',
        },
        404: {
          description: 'Todo not found',
          content: {
            'application/json': {
              schema: resolver(ErrorSchema),
            },
          },
        },
      },
    }),
    zodValidator('param', ParamSchema, handleParamValidationError),
    deleteTodo,
  )

export default todos
export type TodosApp = typeof todos
