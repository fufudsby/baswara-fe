import React, { memo } from 'react'
import { Box, alpha } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { FormikErrors } from 'formik'
import { includes, isArray } from 'lodash'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as DatePickerMUI } from '@mui/x-date-pickers/DatePicker'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { StyledTextField } from 'src/styles/form'
import theme, { boxShadow } from 'src/styles/theme'

interface Props {
  error?: FormikErrors<Date> | undefined
  label?: string
  date: Dayjs | null
  firstDate?: Dayjs | null
  minDate?: Dayjs | null
  highlightedDays?: string[] | null
  setDate: (date: Dayjs | null) => void
  disabled: boolean
}

interface RangePickerProps {
  startDate?: Dayjs | null
  endDate?: Dayjs | null
}

export const useDateRangePicker = ({ startDate, endDate }: RangePickerProps) => {
  const highlightedDays = React.useMemo(() => {
    if (!startDate || !endDate) return null
    if (startDate.format('MM/DD/YYYY') === endDate.format('MM/DD/YYYY')) return null
    const dateArray = new Array()
    const diff = Math.abs(startDate?.diff(dayjs(endDate), 'day'))

    for (let i = 0; i < diff; i++) {
      dateArray.push(startDate.add(i + 1, 'days').format('MM/DD/YYYY'))
    }
    return dateArray
  }, [startDate, endDate])

  return { highlightedDays }
}

const DatePicker: React.FunctionComponent<Props> = ({
  error,
  label,
  date,
  firstDate,
  minDate,
  highlightedDays,
  setDate,
  disabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTextField className={`date-picker ${error ? 'error' : ''}`}>
        <Box className="inner">
          <DatePickerMUI
            label={label}
            value={date}
            disabled={disabled}
            minDate={minDate || undefined}
            onChange={(newValue) => {
              setDate(newValue)
            }}
            slotProps={{
              popper: {
                placement: 'bottom-end',
                disablePortal: true,
              },
              desktopPaper: {
                sx: {
                  boxShadow: `${boxShadow} !important`,
                },
              },
              textField: {
                fullWidth: true,
                hiddenLabel: true,
                size: 'small',
                variant: 'standard',
                error: !!error,
                helperText: error ? (error as string) : '',
                disabled: true,
              },
            }}
            slots={{

              // textField: (params) => (
              //   <StyledTextField className={error ? 'error' : ''}>
              //     <Box className="inner">
              //       <TextField
              //         {...params}
              //         fullWidth
              //         hiddenLabel
              //         size="small"
              //         variant="standard"
              //         error={!!error}
              //         helperText={error ? (error as string) : ''}
              //         disabled
              //       />
              //     </Box>
              //   </StyledTextField>
              // ),
              day: (DayComponentProps) => {
                const { day } = DayComponentProps
                const today = day?.format('MM/DD/YYYY')
                const useRange = isArray(highlightedDays)
                let startDate: string | undefined = undefined
                let endDate: string | undefined = undefined
                if (useRange) {
                  if (highlightedDays.length) {
                    startDate = dayjs(highlightedDays[0]).subtract(1, 'day').format('MM/DD/YYYY')
                    endDate = dayjs(highlightedDays[highlightedDays.length - 1]).format('MM/DD/YYYY')
                  } else {
                    startDate = firstDate
                      ? firstDate?.format('MM/DD/YYYY')
                      : date?.format('MM/DD/YYYY') || ''
                    endDate = firstDate
                      ? date?.format('MM/DD/YYYY')
                      : date?.add(1, 'day').format('MM/DD/YYYY') || ''
                  }
                } else {
                  if (firstDate) {
                    startDate = firstDate.format('MM/DD/YYYY')
                  }
                }
      
                const isSelected = includes(highlightedDays, today)
                const startSelected = today === startDate
                const lastSelected = today === endDate
                return (
                  <PickersDay
                    sx={
                      startSelected || lastSelected
                        ? {
                            backgroundColor: theme.palette.primary.main,
                            color: 'common.white',
                            '&:hover, &.Mui-selected:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.9),
                            },
                            '&:focus, &.Mui-selected:focus': {
                              backgroundColor: `${theme.palette.primary.main} !important`,
                            },
                          }
                        : isSelected
                          ? {
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                              },
                            }
                          : {
                              '&.Mui-selected:hover': {
                                backgroundColor: `${alpha(theme.palette.primary.main, 0.9)} !important`,
                              },
                              '&.Mui-selected:focus': {
                                backgroundColor: `${theme.palette.primary.main} !important`,
                              },
                            }
                    }
                    {...DayComponentProps}
                  />
                )
              }
            }}
          />
        </Box>
      </StyledTextField>
    </LocalizationProvider>
  )
}

export default memo(DatePicker)