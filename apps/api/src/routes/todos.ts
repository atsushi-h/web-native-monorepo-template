import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import type { Env } from '../app'
import { getDb } from '../db'
import { todosTable } from '../db/schema'

const todos = new Hono<{ Bindings: Env }>()

// Get all todos
todos.get('/', async (c) => {
  try {
    const db = getDb(c.env)
    const todos = await db.select().from(todosTable)
    return c.json(todos)
  } catch (error) {
    console.error('Error fetching todos:', error)
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
})

// Get a single todo by ID
todos.get(
  '/:id',
  validator('param', (value, c) => {
    const idParam = (value as Record<string, string>).id
    if (!idParam) {
      return c.json({ error: 'ID parameter is required' }, 400)
    }
    const id = Number.parseInt(idParam)
    if (Number.isNaN(id) || id <= 0) {
      return c.json({ error: 'Invalid ID' }, 400)
    }
    return { id }
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')

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
  },
)

// Create a new todo
todos.post(
  '/',
  validator('json', (value, c) => {
    if (!value || typeof value !== 'object') {
      return c.json({ error: 'Invalid JSON' }, 400)
    }

    const { title, completed } = value as Record<string, unknown>

    if (!title || typeof title !== 'string') {
      return c.json({ error: 'Title is required and must be a string' }, 400)
    }

    if (title.trim().length === 0) {
      return c.json({ error: 'Title cannot be empty' }, 400)
    }

    if (title.length > 255) {
      return c.json({ error: 'Title must be 255 characters or less' }, 400)
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return c.json({ error: 'Completed must be a boolean' }, 400)
    }

    return {
      title: title.trim(),
      completed: completed ?? false,
    }
  }),
  async (c) => {
    try {
      const { title, completed } = c.req.valid('json')

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
  },
)

// Update a todo
todos.put(
  '/:id',
  validator('param', (value, c) => {
    const idParam = (value as Record<string, string>).id
    if (!idParam) {
      return c.json({ error: 'ID parameter is required' }, 400)
    }
    const id = Number.parseInt(idParam)
    if (Number.isNaN(id) || id <= 0) {
      return c.json({ error: 'Invalid ID' }, 400)
    }
    return { id }
  }),
  validator('json', (value, c) => {
    if (!value || typeof value !== 'object') {
      return c.json({ error: 'Invalid JSON' }, 400)
    }

    const { title, completed } = value as Record<string, unknown>

    if (!title && completed === undefined) {
      return c.json({ error: 'At least one field (title or completed) is required' }, 400)
    }

    if (title !== undefined) {
      if (typeof title !== 'string') {
        return c.json({ error: 'Title must be a string' }, 400)
      }
      if (title.trim().length === 0) {
        return c.json({ error: 'Title cannot be empty' }, 400)
      }
      if (title.length > 255) {
        return c.json({ error: 'Title must be 255 characters or less' }, 400)
      }
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return c.json({ error: 'Completed must be a boolean' }, 400)
    }

    const updateData: { title?: string; completed?: boolean } = {}
    if (title !== undefined) updateData.title = title.trim()
    if (completed !== undefined) updateData.completed = completed

    return updateData
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const updateData = c.req.valid('json')

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
todos.delete(
  '/:id',
  validator('param', (value, c) => {
    const idParam = (value as Record<string, string>).id
    if (!idParam) {
      return c.json({ error: 'ID parameter is required' }, 400)
    }
    const id = Number.parseInt(idParam)
    if (Number.isNaN(id) || id <= 0) {
      return c.json({ error: 'Invalid ID' }, 400)
    }
    return { id }
  }),
  async (c) => {
    try {
      const { id } = c.req.valid('param')

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
  },
)

export default todos
export type TodosApp = typeof todos
