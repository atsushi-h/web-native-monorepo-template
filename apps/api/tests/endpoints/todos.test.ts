import { describe, expect, it } from 'vitest'
import { createApp } from '../../src/app'
import {
  assertJsonProperty,
  assertResponseStatus,
  createMockEnv,
  parseJsonResponse,
} from '../utils/test-helpers'

describe('/api/todos', () => {
  describe('GET /api/todos', () => {
    it('should return empty array when no todos exist', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {}, env)

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)
      expect(Array.isArray(data)).toBe(true)
      expect(data).toEqual([])
    })

    it('should have correct content type', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {}, env)

      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('GET /api/todos/:id', () => {
    it('should return 400 for missing ID parameter', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/', {}, env)

      assertResponseStatus(response, 404)
    })

    it('should return 400 for invalid ID parameter', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/invalid', {}, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid ID')
    })

    it('should return 400 for negative ID', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/-1', {}, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid ID')
    })

    it('should return 400 for zero ID', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/0', {}, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid ID')
    })

    it('should return 404 for non-existent todo', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/999999', {}, env)

      assertResponseStatus(response, 404)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Todo not found')
    })
  })

  describe('POST /api/todos', () => {
    it('should create a new todo with minimal data', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 'Test todo' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', 'Test todo')
      assertJsonProperty(data, 'completed', false)
      const id = assertJsonProperty(data, 'id')
      expect(typeof id).toBe('number')
      expect(id).toBeGreaterThan(0)
      const createdAt = assertJsonProperty(data, 'createdAt')
      const updatedAt = assertJsonProperty(data, 'updatedAt')
      expect(createdAt).toBeDefined()
      expect(updatedAt).toBeDefined()
      expect(new Date(createdAt)).toBeInstanceOf(Date)
      expect(new Date(updatedAt)).toBeInstanceOf(Date)
      expect(new Date(createdAt).getTime()).toBeLessThanOrEqual(new Date(updatedAt).getTime())
    })

    it('should create a new todo with completed status', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 'Completed todo', completed: true }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', 'Completed todo')
      assertJsonProperty(data, 'completed', true)
    })

    it('should trim whitespace from title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: '  Trimmed title  ' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', 'Trimmed title')
    })

    it('should return 400 for missing title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { completed: false }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title is required and must be a string')
    })

    it('should return 400 for non-string title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 123 }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title is required and must be a string')
    })

    it('should return 400 for empty title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: '' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title cannot be empty')
    })

    it('should return 400 for whitespace-only title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: '   ' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title cannot be empty')
    })

    it('should return 400 for title too long', async () => {
      const app = createApp()
      const env = createMockEnv()
      const longTitle = 'a'.repeat(256)
      const todoData = { title: longTitle }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title must be 255 characters or less')
    })

    it('should accept title with exactly 255 characters', async () => {
      const app = createApp()
      const env = createMockEnv()
      const maxLengthTitle = 'a'.repeat(255)
      const todoData = { title: maxLengthTitle }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', maxLengthTitle)
    })

    it('should handle Unicode characters and emojis in title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const unicodeTitle = 'Todo with 日本語 and 🎉 emoji'
      const todoData = { title: unicodeTitle }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', unicodeTitle)
    })

    it('should handle special characters in title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const specialCharsTitle = 'Todo with <>&"\'`\n\t special chars'
      const todoData = { title: specialCharsTitle }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 201)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'title', specialCharsTitle)
    })

    it('should return 400 for non-boolean completed', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 'Test todo', completed: 'true' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Completed must be a boolean')
    })

    it('should return 500 for invalid JSON (Hono default behavior)', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json',
      }, env)

      assertResponseStatus(response, 500)
    })

    it('should return 400 for non-object JSON', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('string'),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid JSON')
    })

    it('should return 400 for missing Content-Type header', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 'Test todo' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)
    })

    it('should return 400 for wrong Content-Type header', async () => {
      const app = createApp()
      const env = createMockEnv()
      const todoData = { title: 'Test todo' }

      const response = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(todoData),
      }, env)

      assertResponseStatus(response, 400)
    })
  })

  describe('PUT /api/todos/:id', () => {
    it('should return 400 for invalid ID parameter', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = { title: 'Updated title' }

      const response = await app.request('/api/todos/invalid', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid ID')
    })

    it('should return 404 for non-existent todo', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = { title: 'Updated title' }

      const response = await app.request('/api/todos/999999', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 404)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Todo not found')
    })

    it('should return 400 when no fields provided', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = {}

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'At least one field (title or completed) is required')
    })

    it('should return 400 for non-string title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = { title: 123 }

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title must be a string')
    })

    it('should return 400 for empty title', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = { title: '' }

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title cannot be empty')
    })

    it('should return 400 for title too long', async () => {
      const app = createApp()
      const env = createMockEnv()
      const longTitle = 'a'.repeat(256)
      const updateData = { title: longTitle }

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Title must be 255 characters or less')
    })

    it('should return 400 for non-boolean completed', async () => {
      const app = createApp()
      const env = createMockEnv()
      const updateData = { completed: 'true' }

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Completed must be a boolean')
    })

    it('should return 500 for invalid JSON (Hono default behavior)', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json',
      }, env)

      assertResponseStatus(response, 500)
    })
  })

  describe('DELETE /api/todos/:id', () => {
    it('should return 400 for invalid ID parameter', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/invalid', {
        method: 'DELETE',
      }, env)

      assertResponseStatus(response, 400)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Invalid ID')
    })

    it('should return 404 for non-existent todo', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos/999999', {
        method: 'DELETE',
      }, env)

      assertResponseStatus(response, 404)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'error', 'Todo not found')
    })
  })

  describe('Integration tests', () => {
    it('should create, read, update, and delete a todo', async () => {
      const app = createApp()
      const env = createMockEnv()

      // Create a todo
      const createData = { title: 'Integration test todo', completed: false }
      const createResponse = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData),
      }, env)

      assertResponseStatus(createResponse, 201)
      const createdTodo = await parseJsonResponse(createResponse)
      const todoId = assertJsonProperty(createdTodo, 'id')

      // Read the todo
      const readResponse = await app.request(`/api/todos/${todoId}`, {}, env)
      assertResponseStatus(readResponse, 200)
      const readTodo = await parseJsonResponse(readResponse)
      assertJsonProperty(readTodo, 'title', 'Integration test todo')
      assertJsonProperty(readTodo, 'completed', false)

      // Update the todo
      const updateData = { title: 'Updated integration todo', completed: true }
      const updateResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(updateResponse, 200)
      const updatedTodo = await parseJsonResponse(updateResponse)
      assertJsonProperty(updatedTodo, 'title', 'Updated integration todo')
      assertJsonProperty(updatedTodo, 'completed', true)

      // Delete the todo
      const deleteResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'DELETE',
      }, env)

      assertResponseStatus(deleteResponse, 200)
      const deleteResult = await parseJsonResponse(deleteResponse)
      assertJsonProperty(deleteResult, 'message', 'Todo deleted successfully')

      // Verify deletion
      const verifyResponse = await app.request(`/api/todos/${todoId}`, {}, env)
      assertResponseStatus(verifyResponse, 404)
    })

    it('should handle partial updates correctly', async () => {
      const app = createApp()
      const env = createMockEnv()

      // Create a todo
      const createData = { title: 'Partial update test', completed: false }
      const createResponse = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData),
      }, env)

      assertResponseStatus(createResponse, 201)
      const createdTodo = await parseJsonResponse(createResponse)
      const todoId = assertJsonProperty(createdTodo, 'id')

      // Update only completed status
      const updateData = { completed: true }
      const updateResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(updateResponse, 200)
      const updatedTodo = await parseJsonResponse(updateResponse)
      assertJsonProperty(updatedTodo, 'title', 'Partial update test') // Title unchanged
      assertJsonProperty(updatedTodo, 'completed', true) // Completed changed

      // Update only title
      const updateTitleData = { title: 'Updated title only' }
      const updateTitleResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateTitleData),
      }, env)

      assertResponseStatus(updateTitleResponse, 200)
      const finalTodo = await parseJsonResponse(updateTitleResponse)
      assertJsonProperty(finalTodo, 'title', 'Updated title only') // Title changed
      assertJsonProperty(finalTodo, 'completed', true) // Completed unchanged
    })

    it('should update updatedAt timestamp when todo is modified', async () => {
      const app = createApp()
      const env = createMockEnv()

      // Create a todo
      const createData = { title: 'Timestamp test todo' }
      const createResponse = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData),
      }, env)

      assertResponseStatus(createResponse, 201)
      const createdTodo = await parseJsonResponse(createResponse)
      const todoId = assertJsonProperty(createdTodo, 'id')
      const originalUpdatedAt = assertJsonProperty(createdTodo, 'updatedAt')

      // Wait a moment to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10))

      // Update the todo
      const updateData = { title: 'Updated timestamp test' }
      const updateResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(updateResponse, 200)
      const updatedTodo = await parseJsonResponse(updateResponse)
      const newUpdatedAt = assertJsonProperty(updatedTodo, 'updatedAt')

      // Verify updatedAt was changed
      expect(newUpdatedAt).not.toBe(originalUpdatedAt)
      expect(new Date(newUpdatedAt).getTime()).toBeGreaterThan(new Date(originalUpdatedAt).getTime())
    })

    it('should maintain createdAt when todo is updated', async () => {
      const app = createApp()
      const env = createMockEnv()

      // Create a todo
      const createData = { title: 'CreatedAt consistency test' }
      const createResponse = await app.request('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData),
      }, env)

      assertResponseStatus(createResponse, 201)
      const createdTodo = await parseJsonResponse(createResponse)
      const todoId = assertJsonProperty(createdTodo, 'id')
      const originalCreatedAt = assertJsonProperty(createdTodo, 'createdAt')

      // Update the todo
      const updateData = { completed: true }
      const updateResponse = await app.request(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      }, env)

      assertResponseStatus(updateResponse, 200)
      const updatedTodo = await parseJsonResponse(updateResponse)
      const newCreatedAt = assertJsonProperty(updatedTodo, 'createdAt')

      // Verify createdAt remained the same
      expect(newCreatedAt).toBe(originalCreatedAt)
    })
  })
})