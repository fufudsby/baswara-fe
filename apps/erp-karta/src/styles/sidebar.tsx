import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { fontSize } from 'src/styles/theme'

export const StyledSidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 6, 4),
  marginRight: theme.spacing(4),
}))

export const StyledListMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: theme.spacing(2),
  '& .text-button': {
    textTransform: 'capitalize',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    fontSize: theme.spacing(fontSize),
    color: theme.palette.text.primary,
    padding: 0,
    justifyContent: 'flex-start',
    lineHeight: 'normal',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& .item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: theme.spacing(1, 0),
    '& .MuiIconButton-root': {
      margin: theme.spacing(0, 1.5, 0, 0),
      backgroundColor: theme.palette.common.white,
      '& .wrapper-svg': {
        '& svg': {
          '& line': {
            stroke: theme.palette.primary.main,
          },
        },
      },
      '&:hover': {
        '& .wrapper-svg': {
          '& svg': {
            '& line, & circle, & path': {
              stroke: theme.palette.primary.main,
            },
          },
        },
      },
    },
    '&.active': {
      '& .MuiIconButton-root': {
        backgroundColor: theme.palette.primary.main,
        '& .wrapper-svg': {
          '& svg': {
            '& line, & circle, & path': {
              stroke: theme.palette.common.white,
            },
          },
        },
      },
      '& .text-button': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        '& .MuiIconButton-root': {
          backgroundColor: theme.palette.primary.main,
          '& .wrapper-svg': {
            '& svg': {
              '& line, & circle, & path': {
                stroke: theme.palette.common.white,
              },
            },
          },
        },
      },
    },
    '&:hover': {
      '& .MuiIconButton-root': {
        backgroundColor: theme.palette.common.white,
        '& .wrapper-svg': {
          '& svg': {
            '& line, & circle, & path': {
              stroke: theme.palette.primary.main,
            },
          },
        },
      },
      '& .text-button': {
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
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  '& .reverse': {
    '& .MuiButtonBase-root': {
      backgroundColor: theme.palette.error.main,
      margin: theme.spacing(0, 1.5, 0, 0),
      '& .wrapper-svg': {
        '& svg circle, & svg line': {
          stroke: theme.palette.common.white,
        },
      },
    },
  },
  '& .text-button': {
    color: theme.palette.error.main,
  },
  '&:hover': {
    '& .reverse': {
      '& .MuiButtonBase-root': {
        backgroundColor: alpha(theme.palette.error.main, 0.9),
      },
    },
    '& .text-button': {
      color: alpha(theme.palette.error.main, 0.9),
    },
  },
}))
