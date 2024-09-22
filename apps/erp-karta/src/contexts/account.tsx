import React from 'react'
import { z } from 'zod'
import { User } from 'src/validations/user/schemas'

interface Data {
  account: z.infer<typeof User> | null
  setIsLoading: (loading: boolean) => void
  setAccount: (user: z.infer<typeof User> | null) => void
}

export const AccountContext = React.createContext<Data>({
  account: null,
  setIsLoading: () => null,
  setAccount: () => null,
})
