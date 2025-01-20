import React, { memo } from 'react'
import { StyledLoadingButton } from 'src/styles/form'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'contained' | 'outlined'
  fullWidth?: boolean
  loading?: boolean
  color?: 'secondary' | 'primary' | 'info' | 'error' | 'success'
  text: string
  disabled?: boolean
}

const ButtonMain: React.FunctionComponent<Props> = ({
  onClick,
  variant,
  fullWidth,
  loading,
  color,
  text,
  disabled,
}: Props) => {
  return (
    <StyledLoadingButton
      className={`${loading ? 'loading' : ''}`}
      onClick={(e) => onClick(e)}
      variant={variant || 'contained'}
      disableElevation
      fullWidth={fullWidth}
      size="small"
      loading={loading}
      disabled={loading || disabled}
      color={color || 'primary'}
    >
      {text}
    </StyledLoadingButton>
  )
}

export default memo(ButtonMain)
