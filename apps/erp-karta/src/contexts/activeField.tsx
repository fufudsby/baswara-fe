import React from 'react'

interface Data {
  activeField: string
  setActiveField: (id: string) => void
}

export const ActiveFieldContext = React.createContext<Data>({
  activeField: '',
  setActiveField: () => null,
})
