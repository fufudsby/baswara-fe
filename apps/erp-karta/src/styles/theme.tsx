import { createTheme } from '@mui/material/styles'

export const backgroundBody = '#F1F2F7'
export const fontSize = 1.6
export const heightButton = 4.7
export const heightButton2 = 3.7
export const boxShadow = `0 4px 4px 0 rgba(0, 0, 0, 0.08)`

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#D0121C',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: '#D0121C',
    },
    success: {
      main: '#00AB2D',
    },
    warning: {
      light: '#FFD066',
      main: '#E88C1F',
    },
    text: {
      primary: '#545454',
    },
  },
  typography: {
    fontSize: 12.2,
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '& .MuiPaper-root': {
            borderRadius: theme.spacing(3.2),
          },
          '& .MuiTooltip-popper': {
            '& .MuiTooltip-tooltip': {
              fontSize: 12,
            },
          },
        },
      },
    },
  },
})

export default theme
