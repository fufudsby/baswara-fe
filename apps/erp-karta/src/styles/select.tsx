import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialogSelect = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    fontWeight: 700,
  },
  '& .MuiList-root': {
    padding: theme.spacing(0, 3, 3),
    '& .MuiListItem-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&.selected': {
        backgroundColor: theme.palette.grey[100],
        '& .MuiTypography-root': {
          fontWeight: 700,
        },
      },
      '&:first-of-type': {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiButtonBase-root': {
        padding: theme.spacing(0.5, 2),
      },
    },
  },
}))