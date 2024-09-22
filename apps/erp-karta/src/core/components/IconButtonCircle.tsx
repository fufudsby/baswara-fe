import React, { memo } from 'react'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import { StyledIconButtonCircle } from 'src/styles/app'

interface Props {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

const IconButtonCircle: React.FunctionComponent<Props> = ({ href, onClick, children }: Props) => {
  return (
    <StyledIconButtonCircle className="icon-button-container">
      {href ? (
        <Link href={href} legacyBehavior passHref>
          <IconButton component="a">{children}</IconButton>
        </Link>
      ) : (
        <IconButton onClick={onClick}>{children}</IconButton>
      )}
    </StyledIconButtonCircle>
  )
}

export default memo(IconButtonCircle)
