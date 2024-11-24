import React, { memo } from 'react'
import { snakeCase } from 'lodash'
import { Box, TextField, Typography, InputAdornment } from '@mui/material'
import { FormikContext } from 'src/contexts/formik'
import { StyledTextField } from 'src/styles/form'
import IconButtonAction from 'src/core/components/IconButtonAction'
import { ActiveFieldContext } from 'src/contexts/activeField'

interface Props {
  id?: string
  label: string
  activeField?: string
  type?: React.InputHTMLAttributes<unknown>['type']
  multiline?: boolean
  withButton?: boolean
  isSelect?: boolean
  title?: boolean
  rows?: number
  value?: string
  regex?: RegExp
  disabled?: boolean
  hiddenLabel?: boolean
  adornment?: string
  placeholder?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
  onClickButton?: (id?: string) => void
}

const FormikTextField: React.FunctionComponent<Props> = ({
  id,
  label,
  activeField: activeFieldProps,
  type,
  value,
  multiline,
  withButton,
  isSelect,
  title,
  rows,
  disabled,
  hiddenLabel,
  adornment,
  placeholder,
  regex,
  onKeyDown,
  onClickButton,
}: Props) => {
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)
  const lowercaseLabel = snakeCase(label)
  const handleClickButton = React.useCallback(
    (_e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClickButton) {
        onClickButton(id || lowercaseLabel)
      }
    },
    [onClickButton, id, lowercaseLabel]
  )
  const activeCheck = React.useMemo(() => {
    if (activeField === lowercaseLabel && lowercaseLabel) return true
    if (activeField === activeFieldProps && activeFieldProps) return true
    if (activeField === id) return true
    return false
  }, [activeFieldProps, activeField, lowercaseLabel, id])

  return (
    <StyledTextField
      className={`container-field ${!!hiddenLabel ? 'hidden-label' : ''} ${
        formik?.touched[id || lowercaseLabel] && !!formik.errors[id || lowercaseLabel] ? 'error' : ''
      }`}
    >
      <Box
        className={`inner ${!!withButton && !!disabled ? 'with-button' : ''} ${
          !!title && !!withButton && !!disabled ? 'with-title' : ''
        } ${multiline ? 'multiline' : ''}`}
      >
        <TextField
          id={id || lowercaseLabel}
          label={hiddenLabel ? null : label}
          placeholder={placeholder || label}
          fullWidth
          hiddenLabel={hiddenLabel || false}
          multiline={multiline || false}
          minRows={rows || undefined}
          autoComplete="off"
          size="small"
          disabled={disabled || false}
          error={formik?.touched[id || lowercaseLabel] && !!formik.errors[id || lowercaseLabel]}
          value={value || formik?.values[id || lowercaseLabel]}
          helperText={
            formik?.touched[id || lowercaseLabel] && formik.errors[id || lowercaseLabel]
              ? formik.errors[id || lowercaseLabel]
              : '' as any
          }
          onChange={(e) => {
            if (isSelect) {
              return
            }

            const value = e.target.value
            if (regex && e.nativeEvent['data'] && !regex.test(e.nativeEvent['data'])) {
              return
            }

            formik?.setFieldTouched([id || lowercaseLabel] as any, true)

            if (type === 'number') {
              const value1 = value.replace(/Rp/g,'').replace(/\./g, '')
              formik?.setFieldValue(id || lowercaseLabel, !!parseInt(value1) ? parseInt(value1) : 0)
            } else {
              formik?.handleChange(e)
            }
          }}
          onKeyDown={onKeyDown ? onKeyDown : () => null}
          type={type === 'number' ? 'text' : type || 'text'}
          variant="standard"
          slotProps={{
            input: !!adornment
            ? {
                endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
              }
            : undefined,
          }}
          sx={{
            marginBottom: 2,
          }}
        />

        {!!withButton && !!disabled && !!title && (
          <Typography className="title">{formik?.values[id || lowercaseLabel]}</Typography>
        )}

        {isSelect ? (
          <IconButtonAction variant="search" onClick={onClickButton ? handleClickButton : () => null} />
        ) : (
          <>
            {!!withButton && !!disabled && (
              <IconButtonAction onClick={onClickButton ? handleClickButton : () => null} />
            )}
            {!!withButton && activeCheck && (
              <IconButtonAction variant="check" onClick={() => setActiveField('')} />
            )}
          </>
        )}
      </Box>
    </StyledTextField>
  )
}

export default memo(FormikTextField)
