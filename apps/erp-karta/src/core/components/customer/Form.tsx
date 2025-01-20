import React, { memo } from 'react'
import { Box, Grid2, DialogContent, DialogActions } from '@mui/material'
import { useMutation } from '@apollo/client'
import { z } from 'zod'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Customer, CustomerValidation } from 'src/validations/customer/schemas'
import { SnackbarContext } from 'src/contexts/snackbar'
import { CREATECUSTOMER, UPDATECUSTOMER } from 'src/graphql/customer/mutations'
import { FormikContext } from 'src/contexts/formik'
import ButtonMain from 'src/core/components/ButtonMain'
import FormikField from 'src/core/components/formik/Field'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import { ActiveFieldContext } from 'src/contexts/activeField'

interface Props {
  isDialog?: boolean
  data?: z.infer<typeof Customer>
  refetch: () => void
  onClose?: () => void
  onSuccess?: () => void
}

const FormCustomer: React.FunctionComponent<Props> = ({
  isDialog,
  data,
  refetch,
  onClose,
  onSuccess,
}) => {
  const isNew = React.useMemo(() => !data, [data])
  const [mutationUpdateCustomer, { loading }] = useMutation(isNew ? CREATECUSTOMER : UPDATECUSTOMER)
  const { showSnackbar } = React.useContext(SnackbarContext)
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)

  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      phone: data?.phone || '',
      address: data?.address || '',
    },
    validationSchema: toFormikValidationSchema(CustomerValidation),
    onSubmit: (values, { resetForm }) => {
      mutationUpdateCustomer({
        variables: {
          input: isNew ? values : { ...values, id: data?.id || 0 },
        },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data konsumen <strong>{values.name}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        refetch()
        if (onSuccess) onSuccess()
        if (isDialog && onClose) onClose()
      }).catch(() => {
        showSnackbar('Terjadi kesalahan pada server.', 'error')
      })
    },
  })
  
  return (
    <>
      <DialogContent
        sx={{
          padding: isDialog ? undefined : 0,
        }}
      >
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          <Grid2 container columnSpacing={2}>
            <Grid2 size={isDialog ? 12 : 6}>
              <FormikField
                id="name"
                label="Nama"
                disabled={activeField !== 'name'}
                withButton
                onClickButton={handleClickButton}
              />
            </Grid2>
            <Grid2 size={isDialog ? 12 : 6}>
              <FormikField
                id="phone"
                label="No. Telepon"
                disabled={activeField !== 'phone'}
                withButton
                onClickButton={handleClickButton}
              />
            </Grid2>
          </Grid2>
          <FormikField
            id="address"
            label="Alamat"
            multiline
            disabled={activeField !== 'address'}
            withButton
            onClickButton={handleClickButton}
          />
        </FormikContext.Provider>
      </DialogContent>

      <DialogActions
        sx={{
          paddingX: isDialog ? undefined : 0,
        }}      
      >
        {isDialog && !loading &&
          <ButtonMain
            onClick={onClose ? onClose : () => null}
            loading={loading}
            disabled={loading}
            text="Kembali"
            color="info"
          />
        }
        <ButtonMain
          onClick={() => formik.handleSubmit()}
          loading={loading}
          disabled={!loading && !formik.dirty}
          text="Simpan"
          color="success"
        />
      </DialogActions>
      {isDialog && <BackdropGlobal loading={loading} />}
    </>
  )
}

export default memo(FormCustomer)
