import { z } from 'zod'
import { Customer } from 'src/validations/customer/schemas'
import { User } from 'src/validations/user/schemas'
import { Product } from 'src/validations/product/schemas'
import { Finishing } from 'src/validations/finishing/schemas'

export const OrderStatus = {
  1: 'Antri',
  2: 'Cetak',
  3: 'Selesai',
  4: 'Sudah Diambil',
}

export function formatOrderId(num: string) {
  num = num.toString()
  while (num.length < 8) num = '0' + num
  return num
}

export const OrderDesignProduct = Product.pick({ id: true, title: true, priceDpp: true, unit: true })
export const OrderDesignFinishing = Finishing.pick({ id: true, title: true, priceDpp: true })

export const OrderDesignDetail = z.object({
  id: z.number(),
  description: z.string().optional(),
  fileName: z.string().optional(),
  folderName: z.string().optional(),
  length: z.number(),
  width: z.number().optional(),
  quantity: z.number(),
  product: OrderDesignProduct,
})

export const OrderDesign = z.object({
  id: z.number(),
  orderId: z.number(),
  customer: Customer.pick({ id: true, name: true }),
  status: z.number(),
  statusPaid: z.boolean(),
  start: z.string(),
  end: z.string(),
  operatorDesign: User.pick({ username: true }).extend({ id: z.number() }),
  cashier: User.pick({ username: true }).extend({ id: z.number() }),
  orderDesignDetail: z.array(OrderDesignDetail).optional(),
})

export const OrderDesignForm = OrderDesignDetail.omit({ id: true, product: true }).extend({
  id: z.number().optional(),
  orderId: z.number().optional(),
  orderFrom: z.string().optional(),
  customerId: z.number(),
  productId: z.number(),
  start: z.string(),
  end: z.string(),
  cuttingDigitalId: z.number().optional(),
  cuttingManualId: z.number().optional(),
  laminationId: z.number().optional(),
})