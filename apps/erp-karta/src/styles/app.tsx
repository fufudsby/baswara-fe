import { Box, Paper, Dialog, Drawer, Chip, Typography, alpha } from '@mui/material'
import { styled } from '@mui/material/styles'
import { backgroundBody, boxShadow, heightButton2 } from 'src/styles/theme'

export const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  backgroundColor: backgroundBody,
  '& .top-title-header': {
    position: 'relative',
    '& .MuiTypography-root': {
      textAlign: 'center',
      width: '100%',
    },
  },
  '& .right-side': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(4),
    overflow: 'hidden',
  },
  '& .left': {
    paddingLeft: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    '& .right-side': {
      paddingRight: theme.spacing(2),
    },
    '& .left': {
      paddingLeft: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .top-title-header': {
      '& .MuiTypography-root': {
        textAlign: 'right',
        fontWeight: 600,
        fontSize: 13,
        paddingRight: theme.spacing(1),
      },
    },
    '& .right-side': {
      paddingRight: theme.spacing(1),
    },
    '& .left': {
      paddingLeft: theme.spacing(1),
    },
  },
}))

export const StyledHome = styled(Box)(({ theme }) => ({
  '& svg path': {
    fill: theme.palette.primary.main,
  },
}))

export const SectionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  boxShadow: 'none',
  '&.full-height': {
    minHeight: '100%',
  },
  '&.table': {
    padding: 0,
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 3),
    '&.table': {
      padding: 0,
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2),
    '&.table': {
      padding: 0,
    },
  },
}))

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderTopLeftRadius: theme.spacing(8),
  borderTopRightRadius: theme.spacing(8),
  margin: theme.spacing(12, 0, 0, 0),
  position: 'relative',
  zIndex: 9,
  '& .MuiTypography-root': {
    color: theme.palette.common.white,
  },
  '& .wrapper-svg': {
    '& svg': {
      width: theme.spacing(10),
      height: theme.spacing(7),
      '& path': {
        fill: theme.palette.common.white,
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(8, 0, 0, 0),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(5, 0, 0, 0),
    '& .MuiTypography-root': {
      padding: theme.spacing(0, 2),
    },
  },
}))

export const StyledTitleHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    fontWeight: 700,
    fontSize: theme.spacing(3),
    marginRight: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTypography-root': {
      fontSize: theme.spacing(2.8),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTypography-root': {
      fontSize: theme.spacing(2.2),
    },
  },
}))

export const StyledTitleContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    fontWeight: 700,
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(3),
    color: theme.palette.text.primary,
  },
}))

export const StyledTitle = styled(Box)(({ theme }) => ({
  '& .title-header': {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: theme.spacing(2.3),
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .title-header': {
      '& .MuiTypography-root': {
        fontSize: theme.spacing(2),
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .title-header': {
      '& .MuiTypography-root': {
        fontSize: theme.spacing(1.9),
      },
    },
  },
}))

export const StyledLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  '&.primary': {
    color: theme.palette.primary.main,
  },
  '&.error': {
    color: theme.palette.error.main,
  },
  '&.large': {
    fontSize: theme.spacing(2),
  },
}))

export const StyledSubtitle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.7, 0),
  '& .MuiTypography-root': {
    color: theme.palette.grey[500],
    '&.error': {
      color: theme.palette.error.main,
    },
    '& span': {
      '&.download': {
        fontWeight: 700,
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'none',
        },
      },
      '&.error': {
        color: theme.palette.error.main,
      },
    },
  },
}))

export const iconButtonPadding = 1
export const iconButtonSize = heightButton2 - iconButtonPadding
export const StyledIconButtonCircle = styled(Box)(({ theme }) => ({
  '& .MuiIconButton-root': {
    backgroundColor: theme.palette.common.white,
    boxShadow,
    padding: theme.spacing(iconButtonPadding / 2),
    marginRight: theme.spacing(3),
    '& .wrapper-svg': {
      '& svg': {
        transform: 'scale(0.7)',
        width: theme.spacing(iconButtonSize),
        height: theme.spacing(iconButtonSize),
        '& line': {
          stroke: `${theme.palette.primary.main} !important`,
        },
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .wrapper-svg': {
        '& svg': {
          '& line, & path': {
            stroke: `${theme.palette.common.white} !important`,
          },
        },
      },
    },
  },
}))

export const StyledIconButtonRounded = styled(Box)(({ theme }) => ({
  '&.text': {
    display: 'flex',
    alignItems: 'stretch',
    marginRight: theme.spacing(2),
    '&.reverse': {
      '& .MuiTypography-root': {
        fontWeight: 600,
        cursor: 'pointer',
        backgroundColor: alpha(theme.palette.primary.main, 0.07),
        // height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontSize: 13,
        textTransform: 'capitalize',
        padding: theme.spacing(0, 2),
        marginLeft: theme.spacing(-1),
        borderTopRightRadius: theme.spacing(2.5),
        borderBottomRightRadius: theme.spacing(2.5),
      },
    },
    '&:hover': {
      '&.reverse': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main,
        },
        '& .MuiIconButton-root': {
          backgroundColor: theme.palette.primary.main,
          '& .wrapper-svg': {
            '& svg': {
              '& line, & circle, & path': {
                stroke: `${theme.palette.common.white} !important`,
              },
            },
          },
        },
      },
    },
  },
  '&.reverse': {
    '& .MuiIconButton-root': {
      backgroundColor: '#FFE2E2',
      // backgroundColor: alpha(theme.palette.primary.main, 0.2),
      '& .wrapper-svg': {
        '& svg': {
          transform: 'scale(0.85)',
          '& line': {
            stroke: `${theme.palette.primary.main} !important`,
          },
        },
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[300],
        '& .wrapper-svg': {
          opacity: 0,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        '& .wrapper-svg': {
          '& svg': {
            '& line, & circle, & path': {
              stroke: `${theme.palette.common.white} !important`,
            },
          },
        },
      },
    },
  },
  '& .MuiIconButton-root': {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(iconButtonPadding / 2),
    borderRadius: theme.spacing(1.4),
    position: 'relative',
    '& .wrapper-svg': {
      '& svg': {
        transform: 'scale(0.85)',
        width: theme.spacing(iconButtonSize),
        height: theme.spacing(iconButtonSize),
        '& line': {
          stroke: `${theme.palette.common.white} !important`,
        },
      },
    },
    '& .MuiCircularProgress-root': {
      position: 'absolute',
      color: theme.palette.grey[500],
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[300],
      '& .wrapper-svg': {
        opacity: 0,
      },
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
      '& .wrapper-svg': {
        '& svg': {
          '& line, & circle, & path': {
            stroke: `${theme.palette.common.white} !important`,
          },
        },
      },
    },
  },
}))

export const IconButtonActionSize = 3.2
export const StyledIconButtonAction = styled(Box)(({ theme }) => ({
  '& .MuiIconButton-root': {
    padding: theme.spacing(0.3),
    backgroundColor: '#E6EBF4',
    '& .wrapper-svg': {
      '& svg': {
        transform: 'scale(0.7)',
        width: theme.spacing(IconButtonActionSize),
        height: theme.spacing(IconButtonActionSize),
      },
    },
  },
  '&.edit': {
    '& .MuiIconButton-root': {
      '& .wrapper-svg': {
        '& svg': {
          '& line': {
            stroke: theme.palette.secondary.main,
          },
        },
      },
      '&:hover': {
        backgroundColor: '#BBFFC8',
      },
    },
  },
  '&.search': {
    '& .MuiIconButton-root': {
      '& .wrapper-svg': {
        '& svg': {
          transform: 'scale(0.6)',
          '& line, & circle': {
            stroke: `${theme.palette.warning.main} !important`,
          },
        },
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.warning.light, 0.3),
      },
    },
  },
  '&.check': {
    '& .MuiIconButton-root': {
      '& .wrapper-svg': {
        '& svg': {
          '& circle.st0': {
            fill: `${theme.palette.info.main} !important`,
          },
        },
      },
      '&:hover': {
        backgroundColor: '#a9c1f9',
      },
    },
  },
  '&.delete': {
    '& .MuiIconButton-root': {
      '& .wrapper-svg': {
        '& svg': {
          '& line': {
            stroke: theme.palette.error.dark,
          },
        },
      },
      '&:hover': {
        backgroundColor: '#F7C6C6',
      },
    },
  },
  '&.block': {
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: alpha('#FF6F00', 0.2),
      },
    },
  },
}))

export const StyledDragDrop = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .container-list-content': {
    width: '100%',
    '& .list-content': {
      margin: 0,
      '& .list-item': {
        borderRadius: theme.spacing(3),
        height: theme.spacing(22),
        overflow: 'hidden',
        padding: theme.spacing(1, 1, 0),
        background: theme.palette.grey[200],
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'relative',
        '&.hidden img': {
          opacity: 0.5,
        },
        '& img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        '&.text-mode': {
          height: 'auto',
          borderRadius: theme.spacing(1.5),
          padding: theme.spacing(1.5, 2),
          marginBottom: `${theme.spacing(2)} !important`,
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[300]}`,
          '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            boxShadow: `0 4px 10px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
          },
          '& img': {
            width: theme.spacing(3),
            height: theme.spacing(3),
            position: 'relative',
            marginTop: theme.spacing(0.5),
          },
          '& .content': {
            padding: theme.spacing(0, 2),
            '& .MuiTypography-root': {
              '&.title': {
                fontWeight: 700,
              },
              '&.subtitle': {
                marginTop: theme.spacing(0.5),
              },
            },
          },
          '& .container-button': {
            '& .edit': {
              marginRight: theme.spacing(1),
            },
          },
        },
      },
    },
    '&.horizontal': {
      overflowX: 'auto',
      scrollbarWidth: 'thin',
      '& .list-content': {
        display: 'flex',
        paddingBottom: theme.spacing(0.5),
        '& .list-item': {
          width: 230,
          margin: theme.spacing(0.5),
        },
      },
    },
    '&.vertical': {
      '& .list-content': {
        '& .list-item': {
          margin: theme.spacing(0, 0, 3),
        },
      },
    },
  },
}))

export const StyledBoxTheme = styled(Box)(({ theme }) => ({
  '& .MuiButton-text': {
    boxShadow,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(2),
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    height: '100%',
    '& .color': {
      paddingTop: '50%',
      borderRadius: theme.spacing(2),
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: theme.spacing(2),
      color: theme.palette.text.primary,
      textTransform: 'none',
    },
  },
}))

export const StyledBoxUser = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(7, 2, 2),
  position: 'relative',
  backgroundColor: theme.palette.grey[300],
  '&.active': {
    backgroundColor: theme.palette.common.white,
    '& .MuiTypography-root': {
      '&.label': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiIconButton-root': {
    marginRight: theme.spacing(1),
  },
  '& .MuiCheckbox-root': {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  '& .MuiTypography-root': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '& strong': {
      fontWeight: 700,
      textTransform: 'capitalize',
    },
    '&.label': {
      position: 'absolute',
      left: 0,
      top: theme.spacing(2),
      padding: theme.spacing(0.7, 2),
      backgroundColor: theme.palette.grey[600],
      color: theme.palette.common.white,
      fontWeight: 600,
      fontSize: 13,
      textTransform: 'capitalize',
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
    },
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 4px 10px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}))

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: theme.spacing(1.6),
  fontWeight: 700,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  padding: theme.spacing(0, 1.5),
  height: theme.spacing(4.6),
  borderRadius: theme.spacing(3),
}))

export const StyledAccountPhoto = styled(Box)(({ theme }) => ({
  boxShadow: `3px 3px 9px #00000029`,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2),
  '& .box-img': {
    margin: 0,
    '& .MuiButton-root': {
      borderRadius: theme.spacing(2),
    },
  },
}))

export const StyledDialog = styled(Box)(({ theme }) => ({
  '& .icon-button-container': {
    '& .MuiIconButton-root': {
      margin: 0,
    },
  },
  '& .options': {
    '& .MuiButton-root': {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'capitalize',
      '& .wrapper-svg': {
        '& svg': {
          width: theme.spacing(10),
          height: theme.spacing(10),
          '& polyline, & path': {
            stroke: theme.palette.grey[400],
            transition: `all 0.15s ease-out`,
          },
        },
      },
      '& .MuiTypography-root': {
        color: theme.palette.text.primary,
        padding: theme.spacing(1, 0),
      },
      '& .MuiCheckbox-root': {
        padding: theme.spacing(0.5),
        '& .MuiSvgIcon-root': {
          width: theme.spacing(3),
          height: theme.spacing(3),
          color: theme.palette.grey[400],
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '& .wrapper-svg': {
          '& svg': {
            width: theme.spacing(10),
            height: theme.spacing(10),
            '& polyline, & path': {
              stroke: theme.palette.primary.main,
            },
          },
        },
      },
    },
    '&.active': {
      '& .MuiButton-root': {
        '& .MuiCheckbox-root': {
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
}))

export const StyledDeleteDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(6),
  '& .MuiTypography-root': {
    color: theme.palette.grey[900],
    '&.MuiDialogTitle-root': {
      padding: theme.spacing(2, 4),
    },
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0, 4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4, 4, 2),
  },
  '& small': {
    color: theme.palette.error.main,
    lineHeight: 1.2,
    display: 'block',
    marginTop: theme.spacing(0.5),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0),
    '& .MuiPaper-root': {
      margin: theme.spacing(0),
      width: '94%',
      '& .MuiTypography-root': {
        '&.MuiDialogTitle-root': {
          padding: theme.spacing(2),
        },
      },
      '& .MuiDialogContent-root': {
        padding: theme.spacing(0, 2),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
      },
    },
  },
}))

export const MenuPalette = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexGrow: 1,
  marginLeft: theme.spacing(2),
  '& .MuiBox-root': {
    padding: theme.spacing(0, 0, 0, 4),
    marginRight: theme.spacing(2),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 13,
    '&:before': {
      content: `''`,
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: theme.spacing(3),
      height: theme.spacing(3),
      borderRadius: theme.spacing(0.5),
    },
    '&.menu': {
      '&:before': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '&.sub-menu': {
      '&:before': {
        backgroundColor: '#FF9871',
      },
    },
    '&.in-sub-menu': {
      '&:before': {
        backgroundColor: '#7DE9CF',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& .MuiBox-root': {
      margin: theme.spacing(2, 0),
    },
  },
}))

const heightTree = 37
export const StyledTree = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:before, &:after': {
    content: `''`,
    position: 'absolute',
    top: 0,
    height: '100%',
    zIndex: 100,
    pointerEvents: 'none',
    width: theme.spacing(6),
  },
  '&:before': {
    right: 0,
    background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.9) 100%)`,
  },
  '&:after': {
    background: `linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%)`,
  },
  '&.active-after': {
    '&:after': {
      left: 0,
    },
  },
  '& .box-tree': {
    display: 'flex',
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 4, 4),
    '& .rst__tree': {
      '& .rst__placeholder': {
        height: 56,
        minWidth: theme.spacing(43),
        '&:before': {
          border: `2px dashed ${theme.palette.grey[200]}`,
          borderRadius: theme.spacing(2.5),
          zIndex: 999,
          height: heightTree,
          top: '50%',
          left: theme.spacing(6),
          transform: 'translateY(-50%)',
          width: '100%',
          right: 'inherit',
          bottom: 'inherit',
        },
      },
      '& .rst__node': {
        // transform: 'translateX(-44px)',
        height: '56px !important',
        '& .rst__lineBlock': {
          display: 'none',
        },
        '& .rst__nodeContent': {
          '& > div': {
            position: 'relative',
            '& .rst__expandButton, & .rst__collapseButton': {
              display: 'block',
              // position: 'absolute',
              // top: '50%',
              // right: theme.spacing(8),
              // left: 'inherit !important',
              zIndex: 9,
              boxShadow: 'none',
              height: heightTree,
              width: heightTree,
              background: `transparent url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E') no-repeat center`,
              '&:hover': {
                '&:active': {
                  width: 'auto',
                },
              },
            },
            '& .rst__expandButton': {
              transform: 'rotate(-90deg)',
              transformOrigin: 'left',
            },
            '& .rst__lineChildren': {
              display: 'none',
            },
          },
          '& .rst__rowWrapper': {
            padding: 0,
            '& .rst__row': {
              position: 'relative',
              alignItems: 'center',
              '&.rst__rowLandingPad': {
                '&:before': {
                  border: `2px dashed ${theme.palette.common.white}`,
                  borderRadius: theme.spacing(2.5),
                  zIndex: 999,
                  height: heightTree,
                  top: '50%',
                  transform: 'translateY(-50%)',
                },
              },
              '& .rst__moveHandle': {
                height: heightTree,
                width: heightTree,
                backgroundColor: theme.palette.grey[300],
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='%23000000' fill='none'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Ccircle cx='9' cy='5' r='1' /%3E%3Ccircle cx='9' cy='12' r='1' /%3E%3Ccircle cx='9' cy='19' r='1' /%3E%3Ccircle cx='15' cy='5' r='1' /%3E%3Ccircle cx='15' cy='12' r='1' /%3E%3Ccircle cx='15' cy='19' r='1' /%3E%3C/svg%3E")`,
                backgroundSize: '50%',
                borderRadius: '50%',
                marginRight: theme.spacing(1),
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.grey[300], 0.8),
                },
              },
              '& .rst__rowContents': {
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                minWidth: theme.spacing(43),
                '& .rst__rowLabel': {
                  height: heightTree,
                  flexGrow: 1,
                  padding: 0,
                  '& .rst__rowTitle': {
                    display: 'block',
                    height: heightTree,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}))

export const StyledButtonTree = styled(Box)(({ theme }) => ({
  '&.content': {
    position: 'relative',
    height: heightTree,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(3),
    paddingRight: 0,
    backgroundColor: '#FF9871',
    color: theme.palette.common.white,
    borderRadius: theme.spacing(2.5),
    '& .MuiTypography-root': {
      fontWeight: 600,
      fontSize: 13,
      flexGrow: 1,
    },
    '& .container-button': {
      transform: 'translateX(5px)',
      zIndex: 99,
      '& .MuiIconButton-root': {
        '&.button': {
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
          padding: 0,
          marginRight: theme.spacing(0.5),
          '& .MuiSvgIcon-root': {
            width: theme.spacing(2.3),
            height: theme.spacing(2.3),
            color: theme.palette.common.black,
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.1),
          },
        },
        '&.add-new': {
          padding: 0,
          width: 50,
          height: heightTree,
          borderRadius: theme.spacing(2.5),
          backgroundColor: '#7DE9CF',
          '& .wrapper-svg': {
            '& svg': {
              width: 15,
              height: 15,
              '& line': {
                stroke: theme.palette.grey[900],
              },
            },
          },
        },
      },
    },
    '&.level-0': {
      maxWidth: theme.spacing(43),
      marginBottom: theme.spacing(1.2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '& .container-button': {
        '& .MuiIconButton-root': {
          '&.button': {
            '& .MuiSvgIcon-root': {
              color: theme.palette.common.white,
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.1),
            },
          },
          '&.add-new': {
            backgroundColor: '#FF9871',
          },
        },
      },
    },
    '&.level-2': {
      backgroundColor: '#7DE9CF',
      color: theme.palette.grey[900],
      '& .container-button': {
        transform: 'translateX(0)',
        paddingRight: theme.spacing(1),
      },
      '& .MuiIconButton-root': {
        '&.add-new': {
          display: 'none',
        },
      },
    },
  },
}))

export const StyledMediaMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& .MuiButtonBase-root': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
    color: `${theme.palette.primary.main} !important`,
    '&.active': {
      color: `${theme.palette.common.white} !important`,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.common.white,
        backgroundColor: `${alpha(theme.palette.primary.main, 0.9)} !important`,
      },
    },
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: `${alpha(theme.palette.primary.main, 0.2)} !important`,
    },
  },
}))

export const StyledMediaCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  paddingTop: '70%',
  '& .MuiIconButton-root': {
    zIndex: 9,
  },
  '& .MuiButton-text': {
    position: 'absolute',
    top: 0,
    left: 0,
    border: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    textTransform: 'none',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '&.main': {
      '& .wrapper-svg': {
        marginBottom: theme.spacing(2),
        '& svg': {
          width: theme.spacing(4),
          height: theme.spacing(4),
        },
      },
      '& .MuiTypography-root': {
        fontSize: 13,
        lineBreak: 'anywhere',
      },
    },
  },
}))

export const StyledContainerDrawer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(4),
  top: '50%',
  transform: 'translateY(-50%)',
  '& .MuiIconButton-root': {
    backgroundColor: theme.palette.primary.main,
    color: backgroundBody,
  },
  [theme.breakpoints.down('md')]: {
    left: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    top: theme.spacing(3.5),
    left: theme.spacing(1),
    zIndex: theme.zIndex.drawer - 1,
    '& .MuiIconButton-root': {},
  },
}))

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
    backgroundColor: backgroundBody,
    paddingTop: theme.spacing(3),
    '& .sidebar': {
      marginRight: 0,
      '& .avatar': {
        '& .MuiAvatar-root': {
          width: theme.spacing(7),
          height: theme.spacing(7),
          fontSize: theme.spacing(2.2),
        },
        '& .MuiTypography-root': {
          margin: 0,
          '&.intro': {
            display: 'none',
          },
          '&.role': {
            marginTop: theme.spacing(0.3),
          },
        },
      },
      '& .item': {
        margin: theme.spacing(0.6, 0),
        '& a': {
          fontSize: 14,
        },
      },
    },
  },
}))
