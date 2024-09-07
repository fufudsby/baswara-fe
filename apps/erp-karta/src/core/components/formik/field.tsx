import React, { memo } from 'react'
import _ from 'lodash'
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
  title?: boolean
  rows?: number
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
  multiline,
  withButton,
  title,
  rows,
  disabled,
  hiddenLabel,
  adornment,
  placeholder,
  onKeyDown,
  onClickButton,
}: Props) => {
  const { formik } = React.useContext(FormikContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)
  const lowercaseLabel = _.snakeCase(label)
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
      className={`${!!hiddenLabel ? 'hidden-label' : ''} ${
        formik.touched[id || lowercaseLabel] && !!formik.errors[id || lowercaseLabel] ? 'error' : ''
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
          error={formik.touched[id || lowercaseLabel] && !!formik.errors[id || lowercaseLabel]}
          value={formik.values[id || lowercaseLabel]}
          helperText={
            formik.touched[id || lowercaseLabel] && formik.errors[id || lowercaseLabel]
              ? formik.errors[id || lowercaseLabel]
              : ''
          }
          onChange={(e) => {
            formik.setFieldTouched([id || lowercaseLabel], true)
            formik.handleChange(e)
          }}
          onKeyDown={onKeyDown ? onKeyDown : () => null}
          type={type || 'text'}
          variant="standard"
          InputProps={
            !!adornment
              ? {
                  endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
                }
              : undefined
          }
          sx={{
            marginBottom: 2,
          }}
        />
        {!!withButton && !!disabled && !!title && (
          <Typography className="title">{formik.values[id || lowercaseLabel]}</Typography>
        )}
        {!!withButton && !!disabled && (
          <IconButtonAction onClick={onClickButton ? handleClickButton : () => null} />
        )}
        {!!withButton && activeCheck && (
          <IconButtonAction variant="check" onClick={() => setActiveField('')} />
        )}
      </Box>
    </StyledTextField>
  )
}

export default memo(FormikTextField)
