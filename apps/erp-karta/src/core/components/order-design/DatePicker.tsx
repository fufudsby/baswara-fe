import React, { memo } from 'react'
import { Box, Grid2 } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import DatePicker, { useDateRangePicker } from 'src/core/components/DatePicker'
import { FormikContext } from 'src/contexts/formik'

interface Props {
  editMode: boolean
}

export interface RefProps {}

const OrderDesignDatePicker = React.forwardRef<RefProps, Props>(({ editMode = false }, ref) => {
  const { formik } = React.useContext(FormikContext)

  const defaultStart = dayjs(new Date())
  const defaultEnd = dayjs(new Date()).add(3, 'days')

  const [startDate, setStartDate] = React.useState<Dayjs | null>(defaultStart)
  const [endDate, setEndDate] = React.useState<Dayjs | null>(defaultEnd)
  const { highlightedDays } = useDateRangePicker({ startDate, endDate })

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
    } else {
      void formik?.setFieldValue('start', defaultStart?.format('YYYY-MM-DD'))
      void formik?.setFieldValue('end', defaultEnd?.format('YYYY-MM-DD'))
    }
  }, [editMode])

  React.useImperativeHandle(ref, () => ({}))

  return (
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
    </Box>
  )
})

export default memo(OrderDesignDatePicker)
