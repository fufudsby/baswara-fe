import { Box, FormHelperText } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledAuth = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[100],
  '& .MuiContainer-root': {
    margin: theme.spacing(3, 0),
    width: '100%',
    '& .MuiPaper-root': {
      overflow: 'hidden',
      padding: theme.spacing(5),
      '& .content': {
        '& .img': {
          position: 'relative',
          margin: theme.spacing(0, 0, 2),
          '& .wrapper-svg': {
            '& svg': {
              width: theme.spacing(16),
              height: theme.spacing(12),
              '& g path': {
                fill: theme.palette.primary.main,
              },
            },
          },
        },
        '& .MuiTypography-root': {
          '&.title': {
            fontWeight: 700,
            fontSize: theme.spacing(2.6),
            margin: theme.spacing(0, 0, 1),
            color: theme.palette.primary.main,
          },
        },
        margin: theme.spacing(0, 'auto'),
        maxWidth: theme.spacing(42),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
}))

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: theme.spacing(1.5),
}))
