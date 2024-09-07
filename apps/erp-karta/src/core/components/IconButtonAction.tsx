import React, { memo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { StyledIconButtonAction } from 'src/styles/app'

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'edit' | 'check' | 'delete' | 'search' | 'block'
  tooltip?: string
}

const IconButtonAction: React.FunctionComponent<Props> = ({ onClick, variant, tooltip }: Props) => {
  return (
    <StyledIconButtonAction className={variant || 'edit'}>
      <Tooltip title={tooltip} disableHoverListener={!!!tooltip}>
        <IconButton onClick={onClick}>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(`svg-icon`)
              svg.setAttribute('style', `display: block;`)
            }}
            className={`wrapper-svg`}
            src={`/images/icons/${variant || 'edit'}.svg`}
            wrapper="div"
          />
        </IconButton>
      </Tooltip>
    </StyledIconButtonAction>
  )
}

export default memo(IconButtonAction)
