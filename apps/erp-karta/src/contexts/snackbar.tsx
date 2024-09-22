import React from 'react'
import { Alert, Box, Snackbar, IconButton, alpha } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const SnackbarContext = React.createContext({
  showSnackbar: (text: React.ReactNode, severity?: 'success' | 'error'): any => ({
    text,
    severity,
  }),
})

interface Props {
  children: React.ReactNode
}

const SnackbarProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState<React.ReactNode | null>()
  const [severity, setSeverity] = React.useState<'success' | 'error'>('success')
  const handleClose = React.useCallback((_event: React.ChangeEvent, reason: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }, [])
  const showSnackbar = React.useCallback((text: React.ReactNode, severity?: 'success' | 'error') => {
    setOpen(true)
    setText(text)
    setSeverity(severity || 'success')
  }, [])
  const action = React.useMemo(() => {
    return (
      <React.Fragment>
        <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    )
  }, [])
  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      <Box minHeight="100vh">{children}</Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // action={action}
        // message={text}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            paddingTop: 0.2,
            paddingBottom: 0.2,
            '& .MuiAlert-message': {
              fontSize: 14,
              color: alpha('#FFFFFF', 0.8),
              '& strong': {
                color: 'common.white',
              },
            },
            '& .MuiAlert-action': {
              paddingTop: 0,
              display: 'flex',
              alignItems: 'center',
            },
          },
        }}
      >
        <Alert
          action={action}
          variant="filled"
          severity={severity}
          sx={{
            color: 'white',
          }}
        >
          {text}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default React.memo(SnackbarProvider)
