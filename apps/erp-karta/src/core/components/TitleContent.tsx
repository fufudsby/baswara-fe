import React, { memo } from 'react'
import { Typography } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { StyledTitleContent } from 'src/styles/app'
import IconButtonRounded from 'src/core/components/IconButtonRounded'

interface Props {
  text: string
  href?: string
  maxWidth?: number
  onClick?: () => void
}

const TitleContent: React.FunctionComponent<Props> = ({
  text,
  href,
  maxWidth,
  onClick,
}) => {
  return (
    <StyledTitleContent maxWidth={maxWidth || undefined}>
      <Typography>{text}</Typography>
      {href || onClick && (
        <IconButtonRounded href={href} onClick={onClick} reverse>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(`svg-icon`)
              svg.setAttribute('style', `display: block;`)
            }}
            className={`wrapper-svg`}
            src={`/images/icons/tambahkan.svg`}
            wrapper="div"
          />
        </IconButtonRounded>
      )}
    </StyledTitleContent>
  )
}

export default memo(TitleContent)
