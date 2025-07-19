import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type { Env } from '../app'
import { getDb } from '../db'
import { todosTable } from '../db/schema'
import type { CreateTodoType, ParamType, UpdateTodoType } from './schema'

// テスト用のモックDB関数をインポート（本番では使用されない）
async function getMockDb() {
  try {
    const { getMockDb: getTestMockDb } = await import('../../tests/mock-database')
    return await getTestMockDb()
  } catch {
    return null
  }
}

function isTestEnvironment(env: Env): boolean {
  return env.DATABASE_URL?.startsWith('mock://') ?? false
}

export async function getAllTodos(c: Context<{ Bindings: Env }>) {
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
}

export async function getTodoById(c: Context<{ Bindings: Env }>) {
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Hono zValidator typing issue
    const { id } = (c.req as any).valid('param') as ParamType

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
}

export async function createTodo(c: Context<{ Bindings: Env }>) {
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Hono zValidator typing issue
    const { title, completed } = (c.req as any).valid('json') as CreateTodoType

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
}

export async function updateTodo(c: Context<{ Bindings: Env }>) {
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Hono zValidator typing issue
    const { id } = (c.req as any).valid('param') as ParamType
    // biome-ignore lint/suspicious/noExplicitAny: Hono zValidator typing issue
    const updateData = (c.req as any).valid('json') as UpdateTodoType

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
}

export async function deleteTodo(c: Context<{ Bindings: Env }>) {
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Hono zValidator typing issue
    const { id } = (c.req as any).valid('param') as ParamType

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
}
