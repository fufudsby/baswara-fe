import { TableRow, Box, Pagination } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { alpha, styled } from '@mui/material/styles'

export const StyledBoxTable = styled(Box)(({ theme }) => ({
  '& .MuiTableContainer-root': {
    marginTop: theme.spacing(2),
  },
}))

const color = '#E6EBF4'
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  borderLeft: `1px solid ${theme.palette.grey[400]} !important`,
  '&.sticky': {
    position: 'sticky',
    right: 0,
    // background: theme.palette.background.paper,
  },
  '&.first': {
    borderLeftColor: 'transparent !important',
  },
  '&.head': {
    backgroundColor: `${color} !important`,
    fontSize: `${theme.spacing(1.7)} !important`,
    fontWeight: '700 !important',
    padding: `${theme.spacing(2, 2)} !important`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.spacing(1.7),
    padding: theme.spacing(1, 2),
    a: {
      color: theme.palette.primary.main,
    },
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td': {
    backgroundColor: theme.palette.common.white,
  },
  '&:nth-of-type(even)': {
    '& td': {
      backgroundColor: '#CCDDFF',
    },
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledBoxOptions = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  '& button': {
    margin: theme.spacing(0, 1),
  },
}))

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  '& .MuiPagination-ul': {
    justifyContent: 'center',
    '& .MuiButtonBase-root': {
      // border: `1px solid #BFC5F9`,
      margin: theme.spacing(0, 0.8),
      color: theme.palette.primary.main,
      '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        // borderColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
      '&.MuiPaginationItem-previousNext, &.MuiPaginationItem-firstLast': {
        borderRadius: '50%',
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        transition: 'all 0.2s ease-out',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          // borderColor: theme.palette.primary.main,
          '& .MuiSvgIcon-root': {
            color: theme.palette.common.white,
          },
        },
      },
      '& .MuiSvgIcon-root': {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.primary.main,
      },
    },
  },
}))
