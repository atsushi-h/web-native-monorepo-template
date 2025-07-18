import type { Hono } from 'hono'
import type { Env } from '../../src/app'
import type { SelectTodo, InsertTodo } from '../../src/db/schema'

/**
 * APIエラーレスポンスの型定義
 */
export interface ApiErrorResponse {
  error: string
  message?: string
  path?: string
  stack?: string
}

/**
 * テスト用APIクライアント
 */
export class ApiTestClient {
  constructor(
    private app: Hono<{ Bindings: Env }>,
    private env: Env,
  ) {}

  async get(path: string, headers?: Record<string, string>): Promise<Response> {
    return this.app.request(path, { headers: createHeaders(headers) }, this.env)
  }

  async post(path: string, body?: unknown, headers?: Record<string, string>): Promise<Response> {
    return this.app.request(
      path,
      {
        method: 'POST',
        headers: createHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      },
      this.env,
    )
  }

  async options(path: string, headers?: Record<string, string>): Promise<Response> {
    return this.app.request(
      path,
      {
        method: 'OPTIONS',
        headers: createHeaders(headers),
      },
      this.env,
    )
  }
}


/**
 * テスト用のリクエストヘッダーを作成
 */
export function createHeaders(overrides: Record<string, string> = {}): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...overrides,
  })
  return headers
}

/**
 * API認証ヘッダーを含むヘッダーを作成
 */
export function createAuthHeaders(apiKey: string, overrides: Record<string, string> = {}): Headers {
  return createHeaders({
    'X-API-Key': apiKey,
    ...overrides,
  })
}

/**
 * JSONレスポンスをパースするヘルパー
 */
export async function parseJsonResponse(response: Response) {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * レスポンスの基本アサーション
 */
export function assertResponseStatus(response: Response, expectedStatus: number) {
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus}, got ${response.status}. Response: ${response.statusText}`,
    )
  }
}

/**
 * JSONレスポンスのプロパティをアサート
 */
export function assertJsonProperty(obj: unknown, path: string, expectedValue?: unknown): unknown {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current === null || current === undefined) {
      throw new Error(`Property path '${path}' not found: ${key} is null/undefined`)
    }
    if (typeof current !== 'object' || !(key in current)) {
      throw new Error(`Property path '${path}' not found: missing key '${key}'`)
    }
    current = (current as Record<string, unknown>)[key]
  }

  if (expectedValue !== undefined && current !== expectedValue) {
    throw new Error(`Property '${path}' expected '${expectedValue}', got '${current}'`)
  }

  return current
}

/**
 * タイムスタンプのバリデーション
 */
export function assertValidTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid timestamp: ${timestamp}`)
  }

  // 現在時刻の±1分以内であることを確認
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
  if (diff > 60000) {
    throw new Error(`Timestamp ${timestamp} is not recent (diff: ${diff}ms)`)
  }
}

/**
 * テスト用モックデータベース
 */
class MockDatabase {
  private todos: SelectTodo[] = []
  private nextId = 1

  clear() {
    this.todos = []
    this.nextId = 1
  }

  async getAllTodos(): Promise<SelectTodo[]> {
    return [...this.todos]
  }

  async getTodoById(id: number): Promise<SelectTodo | null> {
    return this.todos.find(todo => todo.id === id) || null
  }

  async createTodo(data: InsertTodo): Promise<SelectTodo> {
    const now = new Date()
    const newTodo: SelectTodo = {
      id: this.nextId++,
      title: data.title,
      completed: data.completed ?? false,
      createdAt: now,
      updatedAt: now,
    }
    this.todos.push(newTodo)
    return newTodo
  }

  async updateTodo(id: number, data: Partial<InsertTodo>): Promise<SelectTodo | null> {
    const index = this.todos.findIndex(todo => todo.id === id)
    if (index === -1) return null

    const original = this.todos[index]
    if (!original) return null
    
    const updated: SelectTodo = {
      id: original.id,
      title: data.title ?? original.title,
      completed: data.completed ?? original.completed,
      createdAt: original.createdAt,
      updatedAt: new Date(),
    }
    this.todos[index] = updated
    return updated
  }

  async deleteTodo(id: number): Promise<boolean> {
    const index = this.todos.findIndex(todo => todo.id === id)
    if (index === -1) return false

    this.todos.splice(index, 1)
    return true
  }
}

// グローバルモックインスタンス
export const mockDb = new MockDatabase()

/**
 * テスト用のモック環境変数を作成（モックDBを使用）
 */
export function createMockEnv(overrides: Partial<Env> = {}): Env {
  // テスト開始時にDBをクリア
  mockDb.clear()
  
  return {
    CORS_ORIGINS: 'http://localhost:3000,https://example.com',
    API_SECRET_KEY: 'test-secret-key-12345',
    DATABASE_URL: 'mock://test', // モックDB識別子
    NODE_ENV: 'test',
    ...overrides,
  }
}
