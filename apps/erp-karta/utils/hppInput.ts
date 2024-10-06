import { z } from 'zod'
import { HppValidation } from 'src/validations/hpp/schemas'

export interface Props {
  values: z.infer<typeof HppValidation>
  type: 'ink' | 'printer' | 'default'
}

export function hppInput({ values, type }: Props) {
  let defaultValues = {
    title: values.title,
    hpp: values.hpp,
    area: values.area,
    priceInk: 0,
    unitInk: '',
    pricePrintHead: 0,
    priceRoll: 0,
    priceCutter: 0,
  }

  if (values.id) {
    defaultValues['id'] = values.id
  }

  switch(type) {
    case 'ink':
      return {
        ...defaultValues,
        priceInk: values.priceInk,
        unitInk: values.unitInk,
        componentIds: [values.unit],
      }
    case 'printer':
      return {
        ...defaultValues,
        pricePrintHead: values.pricePrintHead,
        priceRoll: values.priceRoll,
        priceCutter: values.priceCutter,
        componentIds: [values.unit, values.printer],
      }
    default:
      return {
        ...defaultValues,
        componentIds: [values.unit],
      }
  }
}