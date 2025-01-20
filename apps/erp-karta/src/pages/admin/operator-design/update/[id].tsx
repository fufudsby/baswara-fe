import React from 'react'
import { NextPage } from 'next'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { Box, Grid2, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { find, pick } from 'lodash'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { OrderDesign, OrderDesignFinishing, OrderDesignForm } from 'src/validations/order-design/schemas'
import { GETORDERDESIGN } from 'src/graphql/order-design/queries'
import { CREATEORDERDESIGN, UPDATEORDERDESIGN } from 'src/graphql/order-design/mutations'
import createApolloClient from 'src/graphql/apollo-client'
import { SectionContainer } from 'src/styles/app'
import FormikSelect, { RefProps as FormikSelectRefProps, Value } from 'src/core/components/formik/Select'
import TitleHeader from 'src/core/components/TitleHeader'
import OrderDesignProductForm, { RefProps as FormRefProps} from 'src/core/components/order-design/ProductForm'
import getServerSession from 'utils/getServerSession'
import { FormikContext } from 'src/contexts/formik'
import FormikRadio from 'src/core/components/formik/Radio'
import ButtonMain from 'src/core/components/ButtonMain'
import { SnackbarContext } from 'src/contexts/snackbar'
import useCustomersDropdown from 'src/hooks/order-design/useCustomersDropdown'
import DialogUpdate, { RefProps } from 'src/core/components/customer/DialogUpdate'
import theme, { fontSize } from 'src/styles/theme'
import { GETCOMPONENTS } from 'src/graphql/component/queries'
import { GETFINISHINGS } from 'src/graphql/finishing/queries'
import TableOrder, { OrderProduct } from 'src/core/components/order-design/TableOrder'
import TitleContent from 'src/core/components/TitleContent'
import { Finishing } from 'src/validations/finishing/schemas'

export interface Props {
  isNew: boolean
}

const initialValue = {
  'search-customerId': '',
  'search-productId': '',
  unitType: '',
  editOrderMode: false,
  customerId: '',
  orderFrom: '',
  start: '',
  end: '',
  productId: '',
  width: 0,
  length: 0,
  quantity: 1,
  fileName: '',
  folderName: '',
  description: '',
  cuttingDigitalId: '',
  cuttingManualId: '',
  laminationId: '',
}

const UpdateDesignOperator: NextPage<Props> = ({ isNew }) => {
  const router = useRouter()
  const formikSelectRefProps = React.useRef<FormikSelectRefProps>(null)
  const updateRef = React.useRef<RefProps>(null)
  const formRefProps = React.useRef<FormRefProps>(null)
  const [dataOrderProducts, setDataOrderProducts] = React.useState<OrderProduct[]>([])

  const { data } = useQuery<z.infer<typeof OrderDesign>>(['orderDesign'], { enabled: false })
  const { data: cuttingManuals } = useQuery<z.infer<typeof Finishing>[] | null>(['cuttingManuals'], { enabled: false })
  const { data: cuttingDigitals } = useQuery<z.infer<typeof Finishing>[] | null>(['cuttingDigitals'], { enabled: false })
  const { data: laminationFinishings } = useQuery<z.infer<typeof Finishing>[] | null>(['laminationFinishings'], { enabled: false })

  const [mutationOrderDesign, { loading }] = useMutation(isNew ? CREATEORDERDESIGN : UPDATEORDERDESIGN)
  const { showSnackbar } = React.useContext(SnackbarContext)

  const formik = useFormik({
    initialValues: {
      ...initialValue,
    },
    validationSchema: toFormikValidationSchema(OrderDesignForm),
    onSubmit: (values, { resetForm }) => {
      const { cuttingDigitalId, cuttingManualId, laminationId, length, width } = values
      const cuttingManual = find(cuttingManuals, { id: cuttingManualId })
      const cuttingDigital = find(cuttingDigitals, { id: cuttingDigitalId })
      const laminationFinishing = find(laminationFinishings, { id: laminationId })

      const orderProducts: OrderProduct = {
        id: -new Date().getUTCMilliseconds(),
        product: formRefProps.current?.productSelected || null,
        size: {
          length,
          width,
        },
        cuttingDigital: pick(cuttingDigital, ['id', 'title', 'priceDpp']) as z.infer<typeof OrderDesignFinishing>,
        cuttingManual: pick(cuttingManual, ['id', 'title', 'priceDpp']) as z.infer<typeof OrderDesignFinishing>,
        lamination: pick(laminationFinishing, ['id', 'title', 'priceDpp']) as z.infer<typeof OrderDesignFinishing>,
        description: values.description,
        file: values.fileName,
        folder: values.folderName,
        quantity: values.quantity,
        price: 10000,
      }

      setDataOrderProducts((values) => [orderProducts, ...values])
      formRefProps.current?.setOpen(false)
      // let input: any = values
      // if (isNew) {
      //   input = {
      //     ...input,
      //   }
      // } else {
      //   input = {
      //     ...input,
      //     id: data?.id,
      //   }
      // }
      // mutationOrderDesign({
      //   variables: { input },
      // }).then(async () => {
      //   resetForm()
      //   showSnackbar(<>Data pesanan berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
      //   await router.push(`/admin/operator-design`, `/admin/operator-design`)
      // }).catch(() => {
      //   showSnackbar('Terjadi kesalahan pada server.', 'error')
      // })
    },
  })

  const handleResetForm = React.useCallback(async () => {
    await formik.setFieldValue('unitType', initialValue.unitType)
    await formik.setFieldValue('editOrderMode', initialValue.editOrderMode)
    await formik.setFieldValue('productId', initialValue.productId)
    await formik.setFieldTouched('productId', false)
    await formik.setFieldValue('width', initialValue.width)
    await formik.setFieldValue('length', initialValue.length)
    await formik.setFieldValue('quantity', initialValue.quantity)
    await formik.setFieldValue('fileName', initialValue.fileName)
    await formik.setFieldValue('folderName', initialValue.folderName)
    await formik.setFieldValue('description', initialValue.description)
    await formik.setFieldValue('cuttingDigitalId', initialValue.cuttingDigitalId)
    await formik.setFieldValue('cuttingManualId', initialValue.cuttingManualId)
    await formik.setFieldValue('laminationId', initialValue.laminationId)
  }, [])

  const handleSuccess = React.useCallback(() => {
    formik.setFieldValue('search-customerId', '')
  }, [])

  const openFormOrderDesign = React.useCallback(() => {
    if (formik.values.customerId) {
      formRefProps.current?.setOpen(true)
    } else {
      showSnackbar('Belum pilih konsumen', 'error')
    }
  }, [formRefProps, formik])

  const {
    customers,
    loading: loadingCustomers,
    selected: selectedCustomer,
    refetch,
    handleCloseUpdateCustomer,
    handleUpdateCustomer,
  } = useCustomersDropdown({ formik, updateRef, formikSelectRefProps })

  console.log('formik', dataOrderProducts)
  return (
    <FormikContext.Provider
      value={{
        formik,
      }}
    >
      <SectionContainer>
        <TitleHeader text="Tambah Pesanan" href="/admin/operator-design" />
        <Box paddingTop={3} marginBottom={2}>
          <Box maxWidth={300} marginBottom={2}>
            <FormikSelect
              ref={formikSelectRefProps}
              id="customerId"
              label="Cari Konsumen"
              data={customers}
              withSearch
              hiddenLabel
              dataHelper={selectedCustomer ? { id: selectedCustomer?.id, title: selectedCustomer?.name } : undefined}
              loading={loadingCustomers}
              onClickNew={handleUpdateCustomer}
            />
          </Box>
          <Grid2 container columnSpacing={3}>
            <Grid2 size={4}>
              <Table border={0} padding="none">
                <TableBody
                  sx={{
                    '& td': {
                      borderBottom: 'none',
                      paddingY: 0.7,
                      fontSize: theme.spacing(fontSize),
                      '&:first-of-type': {
                        paddingRight: 3,
                        whiteSpace: 'nowrap',
                      },
                    },
                  }}
                >
                  {!isNew &&
                    <TableRow>
                      <TableCell><strong>No. Pesanan</strong></TableCell>
                      <TableCell width="100%">: -</TableCell>
                    </TableRow>
                  }
                  <TableRow>
                    <TableCell><strong>Nama</strong></TableCell>
                    <TableCell>: {selectedCustomer?.name || '-'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>No. Telepon</strong></TableCell>
                    <TableCell>: {selectedCustomer?.phone || '-'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid2>

            <Grid2 size={8}>
              <FormikRadio
                id="orderFrom"
                label="Pesan Via"
                data={['Offline', 'Whatsapp', 'Tokopedia', 'Shopee']}
              />
            </Grid2>
          </Grid2>

          <Box marginTop={3} marginBottom={2}>
            <TitleContent
              text="Produk Pesanan"
              maxWidth={230}
              onClick={openFormOrderDesign}
            />
          </Box>
          <TableOrder
            data={dataOrderProducts}
            setData={setDataOrderProducts}
            setOpenForm={() => formRefProps.current?.setOpen(true)}
            setProductSelected={formRefProps.current?.setProductSelected}
          />
        </Box>
        <ButtonMain
          onClick={() => null}
          loading={loading}
          text="Simpan Pesanan"
          color="success"
        />
      </SectionContainer>
      <OrderDesignProductForm
        ref={formRefProps}
        editMode={formik.values.editOrderMode}
        onResetForm={handleResetForm}
      />
      <DialogUpdate
        ref={updateRef}
        refetch={refetch}
        onClose={handleCloseUpdateCustomer}
        onSuccess={handleSuccess}
      />
    </FormikContext.Provider>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const queryClient = new QueryClient()
  const { id } = query
  const isNew = id === 'new'

  const client = createApolloClient() 
  const session = await getServerSession(req, res)
  
  await Promise.allSettled([
    queryClient.prefetchQuery(['orderDesign'], async () => {
      if (!isNew && id) {
        return await client.query({
          query: GETORDERDESIGN,
          variables: { id: parseInt(id) },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data?.getOrderDesign || null
        }).catch(() => {
          return null
        })
      }
      return null
    }),
    queryClient.prefetchQuery(['cuttingManuals'], async () => {
      return await client.query({
        query: GETFINISHINGS,
        variables: {
          input: { finishingTypeId: 3, limit: 10, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getFinishings?.data || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['cuttingDigitals'], async () => {
      return await client.query({
        query: GETFINISHINGS,
        variables: {
          input: { finishingTypeId: 1, limit: 10, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getFinishings?.data || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['laminationFinishings'], async () => {
      return await client.query({
        query: GETFINISHINGS,
        variables: {
          input: { finishingTypeId: 2, limit: 10, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getFinishings?.data || null
      }).catch(() => {
        return null
      })
    }),
  ])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isNew,
    },
  }
}

export default UpdateDesignOperator
