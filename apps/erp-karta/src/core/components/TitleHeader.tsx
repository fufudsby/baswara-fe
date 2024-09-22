import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { StyledTitleHeader } from 'src/styles/app'
import ButtonMain from 'src/core/components/ButtonMain'
import IconButtonCircle from 'src/core/components/IconButtonCircle'

interface Props {
  text: string
  buttonText?: string
  href?: string
  loading?: boolean
  onClick?: () => void
}

const TitleHeader: React.FunctionComponent<Props> = ({
  text,
  buttonText,
  href,
  loading,
  onClick,
}: Props) => {
  return (
    <StyledTitleHeader>
      <Box
        display="flex"
        alignItems="center"
        sx={{ '& .wrapper-svg': { transform: 'rotate(90deg)' } }}
      >
        {href && (
          <IconButtonCircle href={href}>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add(`svg-icon`)
                svg.setAttribute('style', `display: block;`)
              }}
              className={`wrapper-svg`}
              src={`/images/icons/panah.svg`}
              wrapper="div"
            />
          </IconButtonCircle>
        )}
        <Typography>{text}</Typography>
      </Box>
      {onClick && (
        <ButtonMain
          onClick={onClick}
          loading={loading || false}
          text={buttonText || 'Simpan'}
          variant="contained"
          color="secondary"
        />
      )}
    </StyledTitleHeader>
  )
}

export default memo(TitleHeader)
