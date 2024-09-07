import React, { memo } from 'react'
import { StyledLoadingButton } from 'src/styles/form'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'contained' | 'outlined'
  fullWidth?: boolean
  loading?: boolean
  active?: boolean
  color?: 'secondary' | 'primary' | 'info' | 'error'
  text: string
}

const ButtonMain: React.FunctionComponent<Props> = ({
  onClick,
  variant,
  fullWidth,
  loading,
  active,
  color,
  text,
}: Props) => {
  return (
    <StyledLoadingButton
      className={active ? 'active' : ''}
      onClick={(e) => onClick(e)}
      variant={variant || 'contained'}
      disableElevation
      fullWidth={fullWidth}
      size="small"
      loading={loading}
      disabled={loading}
      color={color || 'primary'}
    >
      {text}
    </StyledLoadingButton>
  )
}

export default memo(ButtonMain)
