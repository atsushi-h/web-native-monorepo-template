import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import type { Env } from '../app'
import { getDb } from '../db'
import { todosTable } from '../db/schema'

// Zod schemas for validation
const ParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'Invalid ID format')
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val > 0, 'ID must be positive'),
})

const CreateTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be 255 characters or less'),
  completed: z.boolean().default(false),
})

const UpdateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be 255 characters or less')
      .optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.completed !== undefined,
    'At least one field (title or completed) is required',
  )

// Custom error handlers for backward compatibility with tests
// Using explicit function declarations to avoid complex type constraints
// biome-ignore lint/suspicious/noExplicitAny: zValidator Hook type is complex
function handleParamValidationError(result: any, c: any) {
  if (!result.success) {
    return c.json({ error: 'Invalid ID' }, 400)
  }
}

// biome-ignore lint/suspicious/noExplicitAny: zValidator Hook type is complex
function handleCreateTodoError(result: any, c: any) {
  if (!result.success) {
    const issues = result.error?.issues || []
    const firstIssue = issues[0]

    if (!firstIssue) {
      return c.json({ error: 'Invalid JSON' }, 400)
    }

    // Handle missing required field (title)
    if (
      firstIssue.code === 'invalid_type' &&
      firstIssue.expected === 'string' &&
      firstIssue.received === 'undefined' &&
      firstIssue.path?.[0] === 'title'
    ) {
      return c.json({ error: 'Title is required and must be a string' }, 400)
    }

    // Handle wrong type for title
    if (
      firstIssue.code === 'invalid_type' &&
      firstIssue.expected === 'string' &&
      firstIssue.path?.[0] === 'title'
    ) {
      return c.json({ error: 'Title is required and must be a string' }, 400)
    }

    // Handle title validation errors
    if (firstIssue?.path?.[0] === 'title') {
      if (firstIssue.code === 'too_small') {
        return c.json({ error: 'Title cannot be empty' }, 400)
      }
      if (firstIssue.code === 'too_big') {
        return c.json({ error: 'Title must be 255 characters or less' }, 400)
      }
    }

    // Handle completed field errors
    if (firstIssue?.path?.[0] === 'completed' && firstIssue.code === 'invalid_type') {
      return c.json({ error: 'Completed must be a boolean' }, 400)
    }

    return c.json({ error: 'Invalid JSON' }, 400)
  }
}

// biome-ignore lint/suspicious/noExplicitAny: zValidator Hook type is complex
function handleUpdateTodoError(result: any, c: any) {
  if (!result.success) {
    const issues = result.error?.issues || []
    const firstIssue = issues[0]

    if (!firstIssue) {
      return c.json({ error: 'Validation failed' }, 400)
    }

    if (firstIssue?.message === 'At least one field (title or completed) is required') {
      return c.json({ error: 'At least one field (title or completed) is required' }, 400)
    }
    if (firstIssue?.path?.[0] === 'title') {
      if (firstIssue.code === 'too_small') {
        return c.json({ error: 'Title cannot be empty' }, 400)
      }
      if (firstIssue.code === 'too_big') {
        return c.json({ error: 'Title must be 255 characters or less' }, 400)
      }
      if (firstIssue.code === 'invalid_type') {
        return c.json({ error: 'Title must be a string' }, 400)
      }
      return c.json({ error: 'Title must be a string' }, 400)
    }
    if (firstIssue?.path?.[0] === 'completed') {
      return c.json({ error: 'Completed must be a boolean' }, 400)
    }
    return c.json({ error: 'Validation failed' }, 400)
  }
}

// テスト環境でのモックDB使用のため
async function getMockDb() {
  // 動的インポートでテストヘルパーを取得（テスト環境でのみ利用可能）
  try {
    const { mockDb } = await import('../../tests/utils/test-helpers')
    return mockDb
  } catch {
    return null
  }
}

function isTestEnvironment(env: Env): boolean {
  return env.DATABASE_URL?.startsWith('mock://') ?? false
}

const todos = new Hono<{ Bindings: Env }>()

// Get all todos
todos.get('/', async (c) => {
  try {
    if (isTestEnvironment(c.env)) {
      const mockDb = await getMockDb()
      if (mockDb) {
        const todos = await mockDb.getAllTodos()
        return c.json(todos)
      }
    }

    const db = getDb(c.env)
    const todos = await db.select().from(todosTable)
    return c.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
})

// Get a single todo by ID
todos.get('/:id', zValidator('param', ParamSchema, handleParamValidationError), async (c) => {
  try {
    const { id } = c.req.valid('param')

    if (isTestEnvironment(c.env)) {
      const mockDb = await getMockDb()
      if (mockDb) {
        const todo = await mockDb.getTodoById(id)
        if (!todo) {
          return c.json({ error: 'Todo not found' }, 404)
        }
        return c.json(todo)
      }
    }

    const db = getDb(c.env)
    const [todo] = await db.select().from(todosTable).where(eq(todosTable.id, id))

    if (!todo) {
      return c.json({ error: 'Todo not found' }, 404)
    }

    return c.json(todo)
  } catch (error) {
    console.error('Error fetching todo:', error)
    return c.json({ error: 'Failed to fetch todo' }, 500)
  }
})

// Create a new todo
todos.post('/', zValidator('json', CreateTodoSchema, handleCreateTodoError), async (c) => {
  try {
    const { title, completed } = c.req.valid('json')

    if (isTestEnvironment(c.env)) {
      const mockDb = await getMockDb()
      if (mockDb) {
        const newTodo = await mockDb.createTodo({ title, completed })
        return c.json(newTodo, 201)
      }
    }

    const db = getDb(c.env)
    const [newTodo] = await db
      .insert(todosTable)
      .values({
        title,
        completed,
      })
      .returning()

    return c.json(newTodo, 201)
  } catch (error) {
    console.error('Error creating todo:', error)
    return c.json({ error: 'Failed to create todo' }, 500)
  }
})

// Update a todo
todos.put(
  '/:id',
  zValidator('param', ParamSchema, handleParamValidationError),
  zValidator('json', UpdateTodoSchema, handleUpdateTodoError),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const updateData = c.req.valid('json')

      if (isTestEnvironment(c.env)) {
        const mockDb = await getMockDb()
        if (mockDb) {
          const updatedTodo = await mockDb.updateTodo(id, updateData)
          if (!updatedTodo) {
            return c.json({ error: 'Todo not found' }, 404)
          }
          return c.json(updatedTodo)
        }
      }

      const db = getDb(c.env)
      const [updatedTodo] = await db
        .update(todosTable)
        .set(updateData)
        .where(eq(todosTable.id, id))
        .returning()

      if (!updatedTodo) {
        return c.json({ error: 'Todo not found' }, 404)
      }

      return c.json(updatedTodo)
    } catch (error) {
      console.error('Error updating todo:', error)
      return c.json({ error: 'Failed to update todo' }, 500)
    }
  },
)

// Delete a todo
todos.delete('/:id', zValidator('param', ParamSchema, handleParamValidationError), async (c) => {
  try {
    const { id } = c.req.valid('param')

    if (isTestEnvironment(c.env)) {
      const mockDb = await getMockDb()
      if (mockDb) {
        const deleted = await mockDb.deleteTodo(id)
        if (!deleted) {
          return c.json({ error: 'Todo not found' }, 404)
        }
        return c.json({ message: 'Todo deleted successfully' })
      }
    }

    const db = getDb(c.env)
    const [deletedTodo] = await db.delete(todosTable).where(eq(todosTable.id, id)).returning()

    if (!deletedTodo) {
      return c.json({ error: 'Todo not found' }, 404)
    }

    return c.json({ message: 'Todo deleted successfully', todo: deletedTodo })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return c.json({ error: 'Failed to delete todo' }, 500)
  }
})

export default todos
export type TodosApp = typeof todos
