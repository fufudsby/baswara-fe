import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { fontSize } from 'src/styles/theme'

export const StyledSidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  minWidth: theme.spacing(30),
}))

export const StyledListMenu = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .item': {
    '& .text-button': {
      width: '100%',
      display: 'block',
      borderRadius: 0,
      padding: theme.spacing(1.2, 1.5, 1.2, 2.5),
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      fontWeight: 400,
      fontSize: theme.spacing(fontSize),
      color: theme.palette.text.primary,
      lineHeight: 'normal',
      '&.head-button': {
        paddingLeft: theme.spacing(1.5),
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiSvgIcon-root': {
          backgroundColor: theme.palette.common.white,
          borderRadius: '50%',
          color: theme.palette.primary.main,
        },
      },
    },
    '&.active, &.active:hover': {
      '& .text-button': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
    '&:hover': {
      '& .text-button': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
      },
    },
  },
}))

export const StyledAvatar = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& a.MuiAvatar-root': {
    width: theme.spacing(9),
    height: theme.spacing(9),
    fontSize: theme.spacing(3),
    margin: theme.spacing(0, 'auto', 2),
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&.letter': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  '& a': {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-root': {
    textAlign: 'center',
    margin: theme.spacing(1, 0),
    // whiteSpace: 'nowrap',
    '& strong': {
      fontWeight: 700,
    },
    '&.role': {
      textTransform: 'capitalize',
    },
  },
}))

export const StyledSignOut = styled(Box)(({ theme }) => ({
  '& .text-button': {
    display: 'block',
    paddingLeft: theme.spacing(1.5),
    width: '100%',
    fontWeight: 700,
    borderRadius: 0,
    textTransform: 'capitalize',
    color: theme.palette.error.main,
  },
  '&:hover': {
    '& .text-button': {
      backgroundColor: 'transparent',
      color: alpha(theme.palette.error.main, 0.9),
    },
  },
}))
