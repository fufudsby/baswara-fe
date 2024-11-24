import React, { memo } from 'react'
import { Grid2 } from '@mui/material'
import FormikField from 'src/core/components/formik/Field'
import FormikSelect, { Value } from 'src/core/components/formik/Select'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { FormikContext } from 'src/contexts/formik'

interface Props {
  units: Value[]
  title: string
}

const HppFormInk: React.FunctionComponent<Props> = ({ units, title }) => {
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)
  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])

  const valuePriceInk = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik?.values.priceInk !== '' ? formatter.format(formik?.values.priceInk) : ''
  }, [formik?.values.priceInk])

  const valueHpp = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik?.values.hpp !== '' ? formatter.format(formik?.values.hpp) : ''
  }, [formik?.values.hpp])

  return (
    <Grid2 container rowSpacing={1} columnSpacing={3}>
      <Grid2 size={12}>
        <FormikField
          id="title"
          label={title}
          disabled={activeField !== 'title'}
          withButton
          onClickButton={handleClickButton}
        />
      </Grid2>

      <Grid2 size={6}>
        <FormikField
          id="priceInk"
          label="Tinta/CC (Rp)"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'priceInk'}
          withButton
          value={valuePriceInk}
          onClickButton={handleClickButton}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormikField
          id="unitInk"
          label="Tinta/M²"
          disabled={activeField !== 'unitInk'}
          withButton
          onClickButton={handleClickButton}
        />
      </Grid2>

      <Grid2 size={6}>
        <FormikField
          label="Area"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'area'}
          withButton
          onClickButton={handleClickButton}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormikSelect
          id="unit"
          label="Satuan"
          data={units}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormikField
          id="hpp"
          label="HPP (Rp)"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'hpp'}
          withButton
          value={valueHpp}
          onClickButton={handleClickButton}
        />
      </Grid2>
    </Grid2>
  )
}

export default memo(HppFormInk)
