import React, { memo } from 'react'
import { snakeCase } from 'lodash'
import { Box, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { FormikContext } from 'src/contexts/formik'
import theme, { fontSize } from 'src/styles/theme'

interface Props {
  id: string
  label: string
  data: string[]
}

const FormikRadio: React.FunctionComponent<Props> = ({ id, label, data }: Props) => {
  const { formik } = React.useContext(FormikContext)
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik?.setFieldValue(id, e.target.value)
    },
    [id, formik]
  )
  return (
    <Box>
      <FormLabel sx={{ fontSize: theme.spacing(fontSize), fontWeight: 700, color: 'text.primary' }}>
        {label}
      </FormLabel>
      <RadioGroup row onChange={handleChange}>
        {data.map((item, i) => (
          <FormControlLabel
            key={i}
            checked={formik?.values[id] === snakeCase(item)}
            value={snakeCase(item)}
            control={<Radio />}
            label={item}
          />
        ))}
      </RadioGroup>
      {!!formik?.errors && !!formik?.errors?.[id] && (
        <FormHelperText sx={{ padding: 0, margin: 0, fontSize: 13, color: 'error.main' }}>
          {formik?.errors?.[id] as any}
        </FormHelperText>
      )}
    </Box>
  )
}

export default memo(FormikRadio)
