import React from 'react'
import { z } from 'zod'
import { User } from 'src/services/user/schemas'

interface Data {
  account: z.infer<typeof User> | null
  setAccount: (user: z.infer<typeof User> | null) => void
}

export const AccountContext = React.createContext<Data>({
  account: null,
  setAccount: () => null,
})
