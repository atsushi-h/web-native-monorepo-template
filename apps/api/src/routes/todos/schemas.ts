import { z } from 'zod'
import 'zod-openapi/extend'

export const ParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'Invalid ID format')
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val > 0, 'ID must be positive')
    .openapi({
      description: 'Todo item ID',
      example: '1',
    }),
})

export const CreateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be 255 characters or less')
      .openapi({
        description: 'Todo item title',
        example: 'Buy groceries',
      }),
    completed: z.boolean().default(false).openapi({
      description: 'Whether the todo item is completed',
      example: false,
    }),
  })
  .openapi({ ref: 'CreateTodoRequest' })

export const UpdateTodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be 255 characters or less')
      .optional()
      .openapi({
        description: 'Todo item title',
        example: 'Buy groceries and cook dinner',
      }),
    completed: z.boolean().optional().openapi({
      description: 'Whether the todo item is completed',
      example: true,
    }),
  })
  .refine(
    (data) => data.title !== undefined || data.completed !== undefined,
    'At least one field (title or completed) is required',
  )
  .openapi({ ref: 'UpdateTodoRequest' })

export const TodoSchema = z
  .object({
    id: z.number().positive().openapi({
      description: 'Unique identifier for the todo item',
      example: 1,
    }),
    title: z.string().openapi({
      description: 'Todo item title',
      example: 'Buy groceries',
    }),
    completed: z.boolean().openapi({
      description: 'Whether the todo item is completed',
      example: false,
    }),
    createdAt: z.string().datetime().openapi({
      description: 'ISO 8601 datetime when the todo was created',
      example: '2024-01-15T10:30:00Z',
    }),
    updatedAt: z.string().datetime().openapi({
      description: 'ISO 8601 datetime when the todo was last updated',
      example: '2024-01-15T14:45:00Z',
    }),
  })
  .openapi({ ref: 'Todo' })

export const TodoListSchema = z.array(TodoSchema).openapi({ ref: 'TodoList' })

export const ErrorSchema = z
  .object({
    error: z.string().openapi({
      description: 'Error message',
      example: 'Todo not found',
    }),
  })
  .openapi({ ref: 'Error' })

export type ParamType = z.infer<typeof ParamSchema>
export type CreateTodoType = z.infer<typeof CreateTodoSchema>
export type UpdateTodoType = z.infer<typeof UpdateTodoSchema>
export type TodoType = z.infer<typeof TodoSchema>
export type ErrorType = z.infer<typeof ErrorSchema>
