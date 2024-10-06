import { DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { memo } from 'react'
import { find, snakeCase } from 'lodash'
import FormikField from 'src/core/components/formik/Field'
import { StyledDialogSelect } from 'src/styles/select'
import { FormikContext } from 'src/contexts/formik'

export interface Value {
  id: number | string
  title: string
}

interface Props {
  data: Value[]
  label: string
  id?: string
}

const FormikSelect: React.FunctionComponent<Props> = ({
  data,
  label,
  id,
}) => {
  const [open, setOpen] = React.useState(false)
  const { formik } = React.useContext(FormikContext)

  const handleClickButton = React.useCallback((item: Value) => {
    formik.setFieldValue(id || snakeCase(label), item.id)
    setOpen(false)
  }, [])

  const value = React.useMemo(() => {
    const formikValue = formik.values[id || snakeCase(label)]
    return find(data, { id: formikValue })
  }, [data, formik.values[id || snakeCase(label)]])

  return (
    <>
      <FormikField
        id={id || undefined}
        label={label}
        disabled
        withButton
        isSelect
        value={value?.title || ''}
        onClickButton={() => setOpen(true)}
      />

      <StyledDialogSelect onClose={() => setOpen(false)} open={open} fullWidth maxWidth="xs">
        <DialogTitle>Satuan</DialogTitle>
        <List disablePadding>
          {data.map((item, i) => (
            <ListItem disableGutters key={i} disablePadding className={formik.values[id || snakeCase(label)] === item.id ? 'selected' : ''}>
              <ListItemButton onClick={() => handleClickButton(item)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDialogSelect>
    </>
  )
}

export default memo(FormikSelect)
