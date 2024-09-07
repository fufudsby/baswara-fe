import React, { memo } from 'react'
import { Typography, IconButton, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { StyledIconButtonRounded } from 'src/styles/app'

interface Props {
  text?: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  reverse?: boolean
  loading?: boolean
}

const IconButtonRounded: React.FunctionComponent<Props> = ({
  text,
  href,
  onClick,
  children,
  reverse,
  loading,
}: Props) => {
  return (
    <StyledIconButtonRounded className={`${!!reverse ? 'reverse' : ''} ${text ? 'text' : ''}`}>
      {!!href ? (
        <Link href={href} legacyBehavior passHref>
          <IconButton component="a" disabled={loading || false}>
            {loading && <CircularProgress size={16} />}
            {children}
          </IconButton>
        </Link>
      ) : (
        <IconButton onClick={onClick} disabled={loading || false}>
          {loading && <CircularProgress size={16} />}
          {children}
        </IconButton>
      )}
      {!!text && <Typography onClick={onClick}>{text}</Typography>}
    </StyledIconButtonRounded>
  )
}

export default memo(IconButtonRounded)
