import { z } from 'zod'
import { email } from 'src/services/auth/schemas'

export const User = z.object({
  username: z.string({ required_error: 'Wajib isi nama pengguna' }).max(100).optional(),
  email,
})
