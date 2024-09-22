import { z } from 'zod'

export const ComponentType = z.object({
  id: z.number(),
  title: z.string(),
})

export const Component = z.object({
  title: z.string(),
  componentType: z.optional(ComponentType),
})