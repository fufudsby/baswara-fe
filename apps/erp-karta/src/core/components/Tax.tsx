import React, { memo } from 'react'
import { Grid2, Typography } from '@mui/material'
import { StyledTax } from 'src/styles/tax'
import { FormikContext } from 'src/contexts/formik'
import FormikField from 'src/core/components/formik/Field'
import { ActiveFieldContext } from 'src/contexts/activeField'

interface Props {}

function IdrFormatter(value: number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
  return formatter.format(value)
}

const Tax: React.FunctionComponent<Props> = () => {
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)

  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])

  const valueDpp = React.useMemo(() => {
    return formik?.values.priceDpp !== '' ? IdrFormatter(formik?.values.priceDpp) : ''
  }, [formik?.values.priceDpp])

  const valuePpn = React.useMemo(() => {
    const ppn = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPN || '11')
    return formik?.values.priceDpp ? IdrFormatter(ppn) : 0
  }, [formik?.values.priceDpp])

  const valueTotalPpn = React.useMemo(() => {
    const ppn = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPN || '11')
    return formik?.values.priceDpp ? IdrFormatter(ppn + (formik?.values.priceDpp || 0)) : 0
  }, [formik?.values.priceDpp])

  const valuePph = React.useMemo(() => {
    const pph = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPH || '1.5')
    return formik?.values.priceDpp ? IdrFormatter(pph) : 0
  }, [formik?.values.priceDpp])

  const valueTotalPph = React.useMemo(() => {
    const pph = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPH || '1.5')
    return formik?.values.priceDpp ? IdrFormatter((formik?.values.priceDpp || 0) - pph) : 0
  }, [formik?.values.priceDpp])

  const valuePphFinal = React.useMemo(() => {
    const pphFinal = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPH_FINAL || '0.5')
    return formik?.values.priceDpp ? IdrFormatter(pphFinal) : 0
  }, [formik?.values.priceDpp])

  const valueTotalPphFinal = React.useMemo(() => {
    const pphFinal = (formik?.values.priceDpp || 0) / 100 * parseFloat(process.env.NEXT_PUBLIC_PPH_FINAL || '0.5')
    return formik?.values.priceDpp ? IdrFormatter((formik?.values.priceDpp || 0) - pphFinal) : 0
  }, [formik?.values.priceDpp])

  return (
    <StyledTax marginBottom={5}>
      <Grid2 container columnSpacing={3}>
        <Grid2 size={10} />
        <Grid2 size={2}>
          <Typography fontWeight={700} color="#00AB2D">Harga Jual</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B11256">DPP Harga Jual (Rp)</Typography>
        </Grid2>
        <Grid2 size={3} alignItems="center" display="flex">
          <FormikField
            id="priceDpp"
            hiddenLabel
            label=""
            regex={/^[0-9]+$/}
            type="number"
            value={valueDpp}
            disabled={activeField !== 'priceDpp'}
            withButton
            onClickButton={handleClickButton}
          />
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">+ PPN</Typography>
        </Grid2>
        <Grid2 size={1} alignItems="center" display="flex">
          <Typography fontWeight={700}>{parseFloat(process.env.NEXT_PUBLIC_PPN || '11')}%</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">{valuePpn}</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#00AB2D">{valueTotalPpn}</Typography>
        </Grid2>
        <Grid2 size={5} />
        <Grid2 size={7}>
          <Typography color="grey.500">Isi dengan PPN yang berlaku. Nominal terhitung otomatis.</Typography>
        </Grid2>
      </Grid2>

      <Grid2 container rowSpacing={1} columnSpacing={3} marginY={4}>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B11256">DPP Harga Jual (Rp)</Typography>
        </Grid2>
        <Grid2 size={3} alignItems="center" display="flex">
          {valueDpp}
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">- PPH</Typography>
        </Grid2>
        <Grid2 size={1} alignItems="center" display="flex">
          <Typography fontWeight={700}>{parseFloat(process.env.NEXT_PUBLIC_PPH || '1.5')}%</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">{valuePph}</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#00AB2D">{valueTotalPph}</Typography>
        </Grid2>
        <Grid2 size={5} />
        <Grid2 size={7}>
          <Typography color="grey.500">Isi dengan PPH Badan yang berlaku. 1,5% (Barang) 2% (Jasa). Nominal terhitung otomatis.</Typography>
        </Grid2>
      </Grid2>

      <Grid2 container rowSpacing={1} columnSpacing={3}>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B11256">DPP Harga Jual (Rp)</Typography>
        </Grid2>
        <Grid2 size={3} alignItems="center" display="flex">
          {valueDpp}
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">- PPH Final</Typography>
        </Grid2>
        <Grid2 size={1} alignItems="center" display="flex">
          <Typography fontWeight={700}>{parseFloat(process.env.NEXT_PUBLIC_PPH_FINAL || '0.5')}%</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#B14AFF">{valuePphFinal}</Typography>
        </Grid2>
        <Grid2 size={2} alignItems="center" display="flex">
          <Typography fontWeight={700} color="#00AB2D">{valueTotalPphFinal}</Typography>
        </Grid2>
        <Grid2 size={5} />
        <Grid2 size={7}>
          <Typography color="grey.500">Isi dengan PPH Final Badan yang berlaku.</Typography>
        </Grid2>
      </Grid2>
    </StyledTax>
  )
}

export default memo(Tax)
