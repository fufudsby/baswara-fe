import { z } from 'zod'

export const email = z
  .string({ required_error: 'Wajib isi email pengguna' })
  .email({ message: 'Format email salah' })
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string({
    errorMap: (data) => {
      const text = data.path[0] === 'password' ? '' : 'konfirmasi '
      return { message: `Wajib isi ${text}kata sandi` }
    },
  })
  .min(8, 'Masukan minimal 8 karakter')
  .max(100)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Gunakan campuran huruf besar dan angka')
  .transform((str) => str.trim())

export const Signup = z
  .object({
    username: z.string({ required_error: 'Wajib isi nama pengguna' }).max(100).optional(),
    email,
    password,
    passwordConfirmation: password,
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Ketik ulang kata sandi',
    path: ['passwordConfirmation'], // set the path of the error
  })
export const Login = z.object({
  email,
  password: z.string({ required_error: 'Wajib isi kata sandi' }),
  token: z.string({ required_error: 'Lengkapi captcha' }),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
