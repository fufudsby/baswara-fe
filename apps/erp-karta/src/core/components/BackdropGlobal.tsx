import React, { memo } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

interface Props {
  loading: boolean
  position?: any
  withCircular?: boolean
}

const BackdropGlobal: React.FunctionComponent<Props> = ({
  loading,
  position,
  withCircular = true,
}: Props) => {
  return (
    <Backdrop
      sx={{
        color: 'primary.main',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: position || 'absolute',
      }}
      open={loading}
    >
      {withCircular && <CircularProgress color="inherit" size={26} />}
    </Backdrop>
  )
}

export default memo(BackdropGlobal)
