import React, { memo } from 'react'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import { StyledIconButtonCircle } from 'src/styles/app'

interface Props {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  size?: 'small' | 'medium'
}

const IconButtonCircle: React.FunctionComponent<Props> = ({ href, onClick, size, children }: Props) => {
  return (
    <StyledIconButtonCircle className="icon-button-container">
      {href ? (
        <Link href={href} legacyBehavior passHref>
          <IconButton size={size || 'medium'} component="a">{children}</IconButton>
        </Link>
      ) : (
        <IconButton onClick={onClick} size={size || 'medium'}>{children}</IconButton>
      )}
    </StyledIconButtonCircle>
  )
}

export default memo(IconButtonCircle)
