import React from 'react'

interface Data {
  down400: boolean
  downSm: boolean
  downMd: boolean
  downLg: boolean
  downLg2: boolean
}

export const BreakpointsContext = React.createContext<Data>({
  down400: false,
  downSm: false,
  downMd: false,
  downLg: false,
  downLg2: false,
})
