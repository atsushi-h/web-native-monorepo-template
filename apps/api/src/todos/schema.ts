import { z } from 'zod'

export const ParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'Invalid ID format')
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val > 0, 'ID must be positive'),
})

export const CreateTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be 255 characters or less'),
  completed: z.boolean().default(false),
})

export const UpdateTodoSchema = z
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

export type ParamType = z.infer<typeof ParamSchema>
export type CreateTodoType = z.infer<typeof CreateTodoSchema>
export type UpdateTodoType = z.infer<typeof UpdateTodoSchema>
