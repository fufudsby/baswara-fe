import { Box, IconButton, FormHelperText, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'
import { heightButton, heightButton2 } from 'src/styles/theme'
import { iconButtonSize, iconButtonPadding } from 'src/styles/app'

const textFieldFont = 1.6
const heightTextField = 4.8
const marginTopTextField = 2.5
const marginMultiline = '3px'
export const StyledTextField = styled(Box)(({ theme }) => ({
  padding: theme.spacing(marginTopTextField, 0, 2),
  width: '100%',
  '&.hidden-label': {
    paddingTop: 0,
  },
  '&.error': {
    paddingBottom: theme.spacing(4),
  },
  '& .inner': {
    position: 'relative',
    '& .edit, & .check': {
      position: 'absolute',
      top: '50%',
      right: theme.spacing(0.7),
      transform: `translateY(-50%)`,
    },
    '& .MuiTypography-root': {
      '&.title': {
        position: 'absolute',
        top: '50%',
        left: theme.spacing(3),
        width: `calc(100% - ${theme.spacing(8)})`,
        transform: `translateY(-47%)`,
        color: theme.palette.primary.main,
        fontSize: theme.spacing(2.3),
        fontWeight: 700,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    '& .MuiFormControl-root': {
      marginBottom: `0 !important`,
      '& .MuiFormLabel-root': {
        top: '50%',
        padding: theme.spacing(0, 0, 0, 3),
        transform: `translate(1px, -55%)`,
        lineHeight: 'normal',
        color: theme.palette.grey[400],
        '&.Mui-focused, &.MuiFormLabel-filled': {
          color: theme.palette.primary.main,
          transform: `translate(2px, -${theme.spacing(
            heightTextField / 2 + marginTopTextField + 0.3
          )}) scale(0.92)`,
        },
      },
      '& .MuiInputBase-root': {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: theme.spacing(3),
        marginTop: 0,
        '&:hover': {
          borderColor: theme.palette.grey[500],
        },
        '&.Mui-focused': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-error': {
          borderColor: theme.palette.error.main,
        },
        '& input, & textarea': {
          margin: 0,
          padding: theme.spacing(0, 3),
          minHeight: theme.spacing(heightTextField),
        },
        '& textarea': {
          padding: theme.spacing(2, 2.9),
        },
        '&.Mui-disabled, &.Mui-disabled:hover': {
          borderColor: theme.palette.grey[300],
        },
        '&:before, &:after': {
          display: 'none',
        },
        '& .MuiInputAdornment-root': {
          marginRight: theme.spacing(2),
          '& .MuiIconButton-edgeEnd': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            padding: theme.spacing(iconButtonPadding / 2),
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.main,
              width: theme.spacing(iconButtonSize),
              height: theme.spacing(iconButtonSize),
            },
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              '& .MuiSvgIcon-root': {
                color: theme.palette.common.white,
              },
            },
          },
        },
      },
      '& .MuiFormHelperText-root': {
        position: 'absolute',
        top: '100%',
        left: theme.spacing(3),
        fontSize: theme.spacing(textFieldFont),
      },
    },
    '&.multiline': {
      '& .MuiFormControl-root': {
        marginBottom: `0 !important`,
        '& .MuiFormLabel-root': {
          top: theme.spacing(2),
          color: theme.palette.grey[400],
          transform: `translate(0, ${marginMultiline})`,
          '&.Mui-focused, &.MuiFormLabel-filled': {
            color: theme.palette.grey[900],
            transform: `translate(0, calc(-${theme.spacing(
              heightTextField / 2 + marginTopTextField
            )} + ${marginMultiline}))`,
          },
        },
      },
    },
    '&.with-button': {
      '& .MuiFormControl-root': {
        '& .MuiInputBase-root': {
          paddingRight: theme.spacing(2),
        },
      },
    },
    '&.with-title': {
      '& .MuiFormControl-root': {
        '& .MuiInputBase-root': {
          '& input': {
            opacity: 0,
          },
        },
      },
    },
  },
}))

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: theme.spacing(1.6),
  padding: theme.spacing(0, 2.4),
  borderRadius: theme.spacing(3),
  minHeight: theme.spacing(heightButton),
  '&.MuiButton-containedPrimary': {
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
  },
  '&.MuiButton-outlinedPrimary': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
    },
  },
  '&.MuiButton-containedInfo': {
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      // color: theme.palette.common.white,
    },
  },
  '&.MuiButton-outlinedInfo': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
    },
  },
  '&.MuiButton-containedSecondary': {
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main, 0.9),
    },
  },
  '&.MuiButton-outlinedSecondary': {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
    },
  },
  '&.MuiButton-containedError': {
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.9),
    },
  },
  '&.MuiButton-outlinedError': {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.paper,
    },
  },
  '&.Mui-disabled': {
    color: 'transparent',
    borderColor: theme.palette.grey[500],
    '& .MuiLoadingButton-loadingIndicator': {
      color: theme.palette.grey[500],
    },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    minHeight: theme.spacing(4.2),
  },
}))

export const StyledSearch = styled(Box)(({ theme }) => ({
  minWidth: theme.spacing(45),
  position: 'relative',
  '& .search': {
    '& .MuiIconButton-root': {
      position: 'absolute',
      top: theme.spacing(2.5),
      right: theme.spacing(0.7),
      transform: `translateY(-50%)`,
      '& .wrapper-svg': {
        '& svg': {
          '& line, & circle': {
            stroke: theme.palette.primary.main,
          },
        },
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto',
  },
}))

export const StyledPassword = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: `${theme.spacing(3)} !important`,
  '& .MuiFormControl-root': {
    marginBottom: '0 !important',
  },
  '& .MuiFormControlLabel-root': {
    alignSelf: 'flex-end',
    margin: theme.spacing(1, 0, 0),
    '& .MuiButtonBase-root': {
      padding: theme.spacing(0, 0, 0.2, 0),
      margin: theme.spacing(0, 1, 0, 0),
    },
  },
}))

export const BoxImageStyled = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  '&.small-size': {
    '& .MuiButton-root': {
      borderRadius: theme.spacing(1.5),
      '& .MuiSvgIcon-root': {
        fontSize: theme.spacing(3),
      },
    },
  },
  '& input': {
    display: 'none',
  },
  '& .MuiButton-root': {
    width: '100%',
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    '& img': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      top: '0',
      left: '0',
    },
    '& .MuiSvgIcon-root': {
      fontSize: theme.spacing(4),
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
}))

export const BoxFileStyled = styled(Box)(({ theme }) => ({
  '& input': {
    display: 'none',
  },
  '& .input-file': {
    display: 'flex',
    alignItems: 'stretch',
    '&.document': {
      width: '80%',
      maxWidth: theme.spacing(35),
      margin: theme.spacing(2, 'auto', 0),
    },
    '&.empty': {
      '& .box-input': {
        '& .MuiTypography-root': {
          color: theme.palette.grey[400],
        },
      },
    },
    '& .box-input': {
      position: 'relative',
      flexGrow: 1,
      overflow: 'hidden',
      marginRight: theme.spacing(1),
      '& .MuiLinearProgress-root': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        borderRadius: theme.spacing(2.5),
        opacity: 0.2,
      },
      '& .MuiTypography-root': {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: theme.spacing(0, 2),
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[800],
        borderRadius: theme.spacing(2.5),
        overflow: 'hidden',
        '& span': {
          display: 'block',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
      },
    },
    '& .MuiIconButton-root': {
      padding: theme.spacing(0.6),
      '& .wrapper-svg': {
        '& svg': {
          width: theme.spacing(3),
          height: theme.spacing(3),
          '& circle, & line': {
            stroke: theme.palette.primary.main,
          },
        },
      },
    },
  },
  '& .MuiIconButton-root.icon': {
    backgroundColor: 'transparent',
    '& .wrapper-svg': {
      '& svg': {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
    },
  },
  '& .title-header': {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}))

export const StyledIconButtonImage = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: theme.spacing(4),
  padding: theme.spacing(0.5),
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: theme.spacing(2.5),
  borderBottomRightRadius: theme.spacing(2.5),
  backgroundColor: '#F7C6C6',
  '& .wrapper-svg': {
    margin: theme.spacing(1, 0),
    '& svg': {
      transform: 'scale(0.8)',
      width: theme.spacing(heightButton2 - 0.5),
      height: theme.spacing(heightButton2 - 0.5),
      '& line': {
        stroke: theme.palette.error.dark,
      },
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    '& .wrapper-svg': {
      '& svg': {
        '& path': {
          fill: '#F7C6C6',
        },
      },
    },
  },
}))

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: theme.spacing(textFieldFont),
  marginTop: 0,
}))
