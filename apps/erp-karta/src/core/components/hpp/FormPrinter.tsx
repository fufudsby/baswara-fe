import React, { memo } from 'react'
import { Grid2 } from '@mui/material'
import FormikField from 'src/core/components/formik/Field'
import FormikSelect, { Value } from 'src/core/components/formik/Select'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { FormikContext } from 'src/contexts/formik'

interface Props {
  units: Value[]
  printers: Value[]
  title: string
}

const HppFormPrinter: React.FunctionComponent<Props> = ({ units, printers, title }) => {
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)
  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])

  const valuePriceRoll = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik.values.priceRoll !== '' ? formatter.format(formik.values.priceRoll) : ''
  }, [formik.values.priceRoll])

  const valuePriceCutter = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik.values.priceCutter !== '' ? formatter.format(formik.values.priceCutter) : ''
  }, [formik.values.priceCutter])

  const valuePricePrintHead = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik.values.pricePrintHead !== '' ? formatter.format(formik.values.pricePrintHead) : ''
  }, [formik.values.pricePrintHead])

  const valueHpp = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
    
    return formik.values.hpp !== '' ? formatter.format(formik.values.hpp) : ''
  }, [formik.values.hpp])

  return (
    <Grid2 container rowSpacing={1} columnSpacing={3}>
      <Grid2 size={6}>
        <FormikField
          id="title"
          label={title}
          disabled={activeField !== 'title'}
          withButton
          onClickButton={handleClickButton}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormikSelect
          id="printer"
          label="Mesin"
          data={printers}
        />
      </Grid2>

      <Grid2 size={6}>
        <FormikField
          id="priceRoll"
          label="Roll (Rp)"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'priceRoll'}
          withButton
          value={valuePriceRoll}
          onClickButton={handleClickButton}
        />
      </Grid2>
      <Grid2 size={6}>
        <FormikField
          id="priceCutter"
          label="Pisau (Rp)"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'priceCutter'}
          withButton
          value={valuePriceCutter}
          onClickButton={handleClickButton}
        />
      </Grid2>

      <Grid2 size={6}>
        <FormikField
          id="pricePrintHead"
          label="Print Head (Rp)"
          regex={/^[0-9]+$/}
          type="number"
          disabled={activeField !== 'pricePrintHead'}
          withButton
          value={valuePricePrintHead}
          onClickButton={handleClickButton}
        />
      </Grid2>
      <Grid2 size={6}></Grid2>

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

export default memo(HppFormPrinter)
