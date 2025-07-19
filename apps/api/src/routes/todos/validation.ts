// Custom error handlers for backward compatibility with tests
// Using explicit function declarations to avoid complex type constraints
// biome-ignore lint/suspicious/noExplicitAny: zValidator Hook type is complex
export function handleParamValidationError(result: any, c: any) {
  if (!result.success) {
    return c.json({ error: 'Invalid ID' }, 400)
  }
}

// biome-ignore lint/suspicious/noExplicitAny: zValidator Hook type is complex
export function handleCreateTodoError(result: any, c: any) {
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
export function handleUpdateTodoError(result: any, c: any) {
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
