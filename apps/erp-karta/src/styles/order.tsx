import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { fontSize } from 'src/styles/theme'

export const StyledFilterOrder = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
}))

export const StyledTotalOrder = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  marginLeft: theme.spacing(3),
  borderRadius: theme.spacing(1),
  minWidth: theme.spacing(16),
  '& .MuiTypography-root': {
    fontWeight: 700,
    fontSize: theme.spacing(fontSize),
    '&.total': {
      fontSize: theme.spacing(fontSize * 2.4),
    },
  },

}))