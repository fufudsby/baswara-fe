import { z } from 'zod'
import { Component } from 'src/validations/component/schemas'

export const HppType = z.object({
  id: z.number(),
  title: z.string(),
})

export const Hpp = z.object({
  id: z.number(),
  title: z.string(),
  hpp: z.number(),
  area: z.number(),
  pricePrintHead: z.number(),
  priceInk: z.number(),
  priceRoll: z.number(),
  priceCutter: z.number(),
  unitInk: z.string(),
  components: z.array(Component.extend({ id: z.number() })),
})

export const HppValidation = Hpp.extend({
  unit: z.number(),
  printer: z.number(),
}).omit({ components: true })
