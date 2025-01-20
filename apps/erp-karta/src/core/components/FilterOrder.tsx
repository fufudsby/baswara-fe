import React, { memo } from 'react'
import { Box, Grid2, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { StyledFilterOrder, StyledTotalOrder } from 'src/styles/order'
import DatePicker, { useDateRangePicker } from 'src/core/components/DatePicker'
import theme, { purple } from 'src/styles/theme'

interface Props {
  startDate: Dayjs | null
  setStartDate: (date: Dayjs | null) => void
  endDate: Dayjs | null
  setEndDate: (date: Dayjs | null) => void
  totalOrder: { total: number, process: number, printing: number, done: number }
  loading: boolean
}

export const TotalOrder = React.memo(({
  total,
  index,
  loading,
}: {
  total: number,
  index: number,
  loading: boolean,
}) => {
  const title = React.useMemo(() => {
    switch (index) {
      case 1: return 'Antri Cetak'
      case 2: return 'Proses Cetak'
      case 3: return 'Cetak Selesai'
      default: return 'Total Cetak'
    }
  }, [index])

  const color = React.useMemo(() => {
    switch (index) {
      case 1: return purple
      case 2: return theme.palette.warning.main
      case 3: return theme.palette.success.main
      default: return undefined
    }
  }, [index])

  return (
    <StyledTotalOrder>
      <Typography color={color}>{title}</Typography>
      <Typography className="total" color={color}>{loading ? '-' : total}</Typography>
    </StyledTotalOrder>
  )
})

const FilterOrder: React.FunctionComponent<Props> = ({ startDate, endDate, totalOrder, loading, setStartDate, setEndDate }: Props) => {
  const { highlightedDays } = useDateRangePicker({ startDate, endDate })

  React.useEffect(() => {
    if (startDate && endDate) {
      const diff = startDate?.diff(endDate, 'day')
      if (diff && diff > 0) {
        setEndDate(null)
      }
    }
  }, [startDate])

  return (
    <StyledFilterOrder>
      <Grid2 container columnSpacing={2} maxWidth={400}>
        <Grid2 size={6}>
          <DatePicker
            label="Mulai"
            date={startDate}
            highlightedDays={highlightedDays}
            setDate={setStartDate}
            disabled={loading}
          />
        </Grid2>
        <Grid2 size={6}>
          <DatePicker
            label="Sampai"
            date={endDate}
            firstDate={startDate}
            highlightedDays={highlightedDays}
            minDate={startDate}
            setDate={setEndDate}
            disabled={loading}
          />
        </Grid2>
      </Grid2>
      <Box display="flex">
        {Object.keys(totalOrder).map((key, index) => (
          <TotalOrder
            key={index}
            index={index}
            total={totalOrder[key]}
            loading={loading}
          />
        ))}
      </Box>
    </StyledFilterOrder>
  )
}

export default memo(FilterOrder)
