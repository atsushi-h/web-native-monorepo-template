import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type { Env } from '../../app'
import { todosTable } from '../../db/schema'
import { getDb, isTestEnvironment } from '../../services/database'
import type { CreateTodoType, ParamType, UpdateTodoType } from './schemas'

// テスト用のモックDB関数をインポート（本番では使用されない）
async function getMockDb() {
  try {
    const { getMockDb: getTestMockDb } = await import('../../../tests/mock-database')
    return await getTestMockDb()
  } catch {
    return null
  }
}

export async function getAllTodos(c: Context<{ Bindings: Env }>) {
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
}

export async function getTodoById(c: Context<{ Bindings: Env }>) {
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
}

export async function createTodo(c: Context<{ Bindings: Env }>) {
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
}

export async function updateTodo(c: Context<{ Bindings: Env }>) {
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
}

export async function deleteTodo(c: Context<{ Bindings: Env }>) {
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
}
