import { z } from 'zod'
import { Component } from 'src/validations/component/schemas'
import { HppType } from 'src/validations/hpp/schemas'

export const FinishingType = z.object({
  id: z.number(),
  title: z.string(),
})

export const HppFinishing = z.object({
  id: z.number(),
  title: z.string(),
  HPPType: z.optional(HppType),
})

export const Finishing = z.object({
  id: z.number(),
  title: z.string(),
  area: z.number().optional(),
  material: z.number().optional(),
  printer: z.number().optional(),
  // ink: z.number().optional(),
  // masking: z.number().optional(),
  // display: z.number().optional(),
  hpp: z.array(HppFinishing).optional(),
  unit: z.optional(Component.extend({ id: z.number() })),
  description: z.string().optional(),
  priceDpp: z.number(),
})

