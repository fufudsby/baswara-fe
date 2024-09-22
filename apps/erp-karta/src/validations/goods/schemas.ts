import { z } from 'zod'

export const GoodsType = z.object({
  id: z.number(),
  title: z.string(),
})

export const Goods = z.object({
  title: z.string(),
})