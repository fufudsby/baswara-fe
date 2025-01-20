import { Box, CircularProgress, DialogTitle, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React, { memo } from 'react'
import { find, snakeCase } from 'lodash'
import { ReactSVG } from 'react-svg'
import FormikField from 'src/core/components/formik/Field'
import { StyledDialogSelect } from 'src/styles/select'
import { FormikContext } from 'src/contexts/formik'
import IconButtonRounded from 'src/core/components/IconButtonRounded'

export interface Value {
  id: number | string
  title: string
}

interface Props {
  data: Value[]
  dataHelper?: Value // Untuk membantu variable value jika tidak ditemukan
  label: string
  id?: string
  withSearch?: boolean
  loading?: boolean
  href?: string
  hiddenLabel?: boolean
  onClickNew?: () => void
}

interface PropsSearchComponent {
  label: string
  id?: string
  loading: boolean
  onClickNew?: () => void
}

export interface RefProps {
  setOpen: (open: boolean) => void
}

export const SearchComponent = memo(({ id, label, loading, onClickNew }: PropsSearchComponent) => {
  return (
    <Box paddingX={3} marginBottom={4} display="flex" justifyContent="space-between" alignItems="center">
      <Box marginRight={4} flexGrow={1}>
        <FormikField
          id={`search-${id || 'data'}`}
          label={`Cari ${label}`}
          withButton
          hiddenLabel
          adornment={loading ? <CircularProgress size={15} /> : undefined}
        />
      </Box>
      {!!onClickNew &&
        <IconButtonRounded reverse onClick={onClickNew}>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(`svg-icon`)
              svg.setAttribute('style', `display: block;`)
            }}
            className={`wrapper-svg`}
            src={`/images/icons/tambahkan.svg`}
            wrapper="div"
          />
        </IconButtonRounded>
      }
    </Box>
  )
})

const FormikSelect = React.forwardRef<RefProps, Props>(({
  data,
  dataHelper,
  label,
  id,
  withSearch = false,
  loading = false,
  hiddenLabel = false,
  onClickNew,
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const { formik } = React.useContext(FormikContext)

  React.useImperativeHandle(ref, () => ({
    setOpen,
  }))

  const handleClickButton = React.useCallback((item: Value) => {
    formik?.setFieldValue(id || snakeCase(label), item.id)
    setOpen(false)
  }, [])

  const value = React.useMemo(() => {
    const formikValue = formik?.values[id || snakeCase(label)]
    return find(data, { id: formikValue })
  }, [data, formik?.values[id || snakeCase(label)]])

  const handleClickNew = React.useCallback(() => {
    setOpen(false)
    if (onClickNew) onClickNew()
  }, [onClickNew])

  return (
    <>
      <FormikField
        id={id || undefined}
        label={label}
        disabled
        withButton
        hiddenLabel={hiddenLabel}
        isSelect
        value={value?.title || dataHelper?.title || ''}
        onClickButton={() => setOpen(true)}
      />

      <StyledDialogSelect className={withSearch ? 'with-search' : ''} onClose={() => setOpen(false)} open={open} fullWidth maxWidth="xs">
        <DialogTitle>{label}</DialogTitle>
        {withSearch &&
          <SearchComponent id={id} label={label} loading={loading} onClickNew={handleClickNew} />
        }
        <List disablePadding>
          {!!data.length ? (
            <>
              {data.map((item, i) => (
                <ListItem disableGutters key={i} disablePadding className={formik?.values[id || snakeCase(label)] === item.id ? 'selected' : ''}>
                  <ListItemButton onClick={() => handleClickButton(item)}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          ) : (
            <Typography paddingBottom={2} align="center" sx={{ color: 'grey.500' }}>Data tidak ditemukan</Typography>
          )}
        </List>
      </StyledDialogSelect>
    </>
  )
})

export default memo(FormikSelect)
