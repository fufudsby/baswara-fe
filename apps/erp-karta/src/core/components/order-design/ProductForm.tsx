import React, { memo } from 'react'
import { Box, Grid2, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { ReactSVG } from 'react-svg'
import { z } from 'zod'
import { includes } from 'lodash'
import { StyledDialog } from 'src/styles/app'
import { Value } from 'src/core/components/formik/Select'
import FormikSelect from 'src/core/components/formik/Select'
import DatePicker, { useDateRangePicker } from 'src/core/components/DatePicker'
import SelectProduct, { RefProps as SelectProductRefProps } from 'src/core/components/formik/SelectProduct'
import FormikField from 'src/core/components/formik/Field'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { Finishing } from 'src/validations/finishing/schemas'
import { FormikContext } from 'src/contexts/formik'
import ButtonMain from 'src/core/components/ButtonMain'
import IconButtonCircle from 'src/core/components/IconButtonCircle'
import { Product } from 'src/validations/product/schemas'
import { SnackbarContext } from 'src/contexts/snackbar'
import { OrderDesignProduct } from 'src/validations/order-design/schemas'

interface Props {
  editMode: boolean
  onResetForm: () => void
}

export interface RefProps {
  setOpen: (open: boolean) => void
  productSelected: z.infer<typeof Product> | null
  setProductSelected?: React.Dispatch<React.SetStateAction<z.infer<typeof OrderDesignProduct> | null>>
}

const unitTypes = {
  SIZE: 'size', // CM, M
  FULL: 'full', // Lembar, Unit
}

const OrderDesignProductForm = React.forwardRef<RefProps, Props>(({ editMode = false, onResetForm }, ref) => {
  const selectProductRef = React.useRef<SelectProductRefProps>(null)
  const { showSnackbar } = React.useContext(SnackbarContext)
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)
  const [open, setOpen] = React.useState(false)

  const defaultStart = dayjs(new Date())
  const defaultEnd = dayjs(new Date()).add(3, 'days')

  const { data: cuttingManuals } = useQuery<z.infer<typeof Finishing>[] | null>(['cuttingManuals'], { enabled: false })
  const { data: cuttingDigitals } = useQuery<z.infer<typeof Finishing>[] | null>(['cuttingDigitals'], { enabled: false })
  const { data: laminationFinishings } = useQuery<z.infer<typeof Finishing>[] | null>(['laminationFinishings'], { enabled: false })

  const [selectedProduct, setSelectedProduct] = React.useState<z.infer<typeof OrderDesignProduct> | null>(null)
  const [startDate, setStartDate] = React.useState<Dayjs | null>(defaultStart)
  const [endDate, setEndDate] = React.useState<Dayjs | null>(defaultEnd)
  const { highlightedDays } = useDateRangePicker({ startDate, endDate })

  const cuttingManualsSelect = React.useMemo(() => {
    if (cuttingManuals?.length) return cuttingManuals.map((item) => ({ id: item.id, title: item.title }))
    return []
  }, [cuttingManuals])

  const cuttingDigitalsSelect = React.useMemo(() => {
    if (cuttingDigitals?.length) return cuttingDigitals.map((item) => ({ id: item.id, title: item.title }))
    return []
  }, [cuttingDigitals])

  const laminationFinishingsSelect = React.useMemo(() => {
    if (laminationFinishings?.length) return laminationFinishings.map((item) => ({ id: item.id, title: item.title }))
    return []
  }, [laminationFinishings])

  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])
  
  const handleClose = React.useCallback(() => {
    setOpen(false)
    onResetForm()
  }, [])

  const changeUnitType = React.useCallback(() => {
    const unitId = formik?.values.unitId
    if (unitId) {
      const unitIdsSize = JSON.parse(process.env.NEXT_PUBLIC_ORDER_UNIT_IDS_SIZE || '[]')
      if (includes(unitIdsSize, unitId)) {
        formik.setFieldValue('unitType', unitTypes.SIZE)
      } else {
        formik.setFieldValue('unitType', unitTypes.FULL)
      }
    }
  }, [formik?.values.unitId])

  const handleSubmit = React.useCallback(async () => {
    await formik?.setFieldTouched('productId')
    if (formik?.isValid) {
      formik.handleSubmit()
    } else {
      showSnackbar('Lengkapi form', 'error')
    }
  }, [formik])

  React.useEffect(() => {
    changeUnitType()
  }, [formik?.values.unitId])

  // React.useEffect(() => {
  //   void formik?.setFieldValue('start', startDate?.format('YYYY-MM-DD'))
  // }, [startDate])

  // React.useEffect(() => {
  //   void formik?.setFieldValue('end', endDate?.format('YYYY-MM-DD'))
  // }, [endDate])

  React.useEffect(() => {
    if (editMode) {
      if (formik?.values?.start) setStartDate(dayjs(formik?.values?.start))
      if (formik?.values?.end) setEndDate(dayjs(formik?.values?.end))
    }
  }, [editMode, formik?.values?.start, formik?.values?.end])

  React.useEffect(() => {
    if (!editMode) {
      setSelectedProduct(null)
    } else {
      void formik?.setFieldValue('start', defaultStart?.format('YYYY-MM-DD'))
      void formik?.setFieldValue('end', defaultEnd?.format('YYYY-MM-DD'))
    }
  }, [editMode])

  React.useImperativeHandle(ref, () => ({
    setOpen,
    productSelected: selectedProduct,
    setProductSelected: setSelectedProduct,
  }))

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" scroll="paper" fullWidth>
      <DialogTitle component="div" display="flex" alignItems="center" justifyContent="space-between">
        Produk Pesanan
        <IconButtonCircle onClick={handleClose} size="small">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(`svg-icon`)
              svg.setAttribute('style', `display: block;`)
            }}
            className={`wrapper-svg`}
            src={`/images/icons/keluar.svg`}
            wrapper="div"
          />
        </IconButtonCircle>
      </DialogTitle>

      <DialogContent dividers>
        <Box paddingY={3}>
          <Grid2 container columnSpacing={3}>
            <Grid2 size={5}>
              <DatePicker
                label="Mulai"
                date={startDate}
                minDate={dayjs(new Date()).subtract(3, 'months')}
                highlightedDays={highlightedDays}
                setDate={setStartDate}
                disabled={false}
              />
            </Grid2>
            <Grid2 size={5}>
              <DatePicker
                label="Deadline"
                date={endDate}
                firstDate={startDate}
                highlightedDays={highlightedDays}
                minDate={startDate}
                setDate={setEndDate}
                disabled={false}
              />
            </Grid2>
          </Grid2>
          <Box marginTop={2}>
            <SelectProduct
              ref={selectProductRef}
              selected={selectedProduct}
              setSelected={setSelectedProduct}
            />
            <Box
              sx={{
                columnCount: 2,
                columnGap: 3,
              }}
            >
              {formik?.values.unitType === unitTypes.SIZE &&
                <>
                  <FormikField
                    id="length"
                    label="Panjang (cm)"
                    disabled={activeField !== 'length'}
                    withButton
                    regex={/^[0-9]+$/}
                    type="number"
                    onClickButton={handleClickButton}
                  />

                  <FormikField
                    id="width"
                    label="Lebar (cm)"
                    disabled={activeField !== 'width'}
                    withButton
                    regex={/^[0-9]+$/}
                    type="number"
                    onClickButton={handleClickButton}
                  />
                </>
              }

              <FormikField
                id="quantity"
                label="Jumlah"
                disabled={activeField !== 'quantity'}
                withButton
                regex={/^[0-9]+$/}
                type="number"
                onClickButton={handleClickButton}
              />

              {formik?.values.unitId !== parseInt(process.env.NEXT_PUBLIC_ORDER_UNIT_CM || '0') &&
                <FormikSelect
                  id="laminationId"
                  label="Laminasi"
                  data={laminationFinishingsSelect}
                />
              }

              <FormikSelect
                id="cuttingManualId"
                label="Potong Manual"
                data={cuttingManualsSelect}
              />

              {formik?.values.unitId !== parseInt(process.env.NEXT_PUBLIC_ORDER_UNIT_CM || '0') &&
                <FormikSelect
                  id="cuttingDigitalId"
                  label="Potong Digital"
                  data={cuttingDigitalsSelect}
                />
              }

              <FormikField
                id="folderName"
                label="Nama Folder"
                disabled={activeField !== 'folderName'}
                withButton
                onClickButton={handleClickButton}
              />

              <FormikField
                id="fileName"
                label="Nama File"
                disabled={activeField !== 'fileName'}
                withButton
                onClickButton={handleClickButton}
              />

              <FormikField
                id="description"
                label="Catatan"
                disabled={activeField !== 'description'}
                withButton
                onClickButton={handleClickButton}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={700} color="#00AB2D">Sub Total 100000</Typography>
        </Box>
        <Box display="flex">
          <Box marginRight={1}>
            <ButtonMain text="Kembali" color="info" onClick={handleClose} />
          </Box>
          <ButtonMain
            onClick={handleSubmit}
            loading={false}
            text="Tambah Pesanan"
            color="primary"
          />
        </Box>
      </DialogActions>
    </StyledDialog>
  )
})

export default memo(OrderDesignProductForm)
