import { z } from 'zod'

export const Customer = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export const CustomerValidation = Customer.omit({ id: true })