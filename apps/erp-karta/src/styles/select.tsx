import { Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialogSelect = styled(Dialog)(({ theme }) => ({
  '&.with-search': {
    '& .MuiPaper-root': {
      '& .container-field': {
        paddingBottom: 0,
        '& .MuiInputBase-root': {
          '& .MuiInputBase-input': {
            minHeight: theme.spacing(4.2),
          },
        },
      },
    },
  },
  '& .MuiPaper-root': {
    '& .MuiDialogTitle-root': {
      fontWeight: 700,
    },
    '& .MuiList-root': {
      padding: theme.spacing(0, 0, 3),
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
  },
}))