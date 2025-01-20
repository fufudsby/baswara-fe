import React from 'react'
import { NextPage } from 'next'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { Box, Grid2, Typography } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { find, isNumber } from 'lodash'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { ProductType, Product } from 'src/validations/product/schemas'
import { CREATEPRODUCT, UPDATEPRODUCT } from 'src/graphql/product/mutations'
import createApolloClient from 'src/graphql/apollo-client'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import { FormikContext } from 'src/contexts/formik'
import ButtonMain from 'src/core/components/ButtonMain'
import Tax from 'src/core/components/Tax'
import FormikSelect, { Value } from 'src/core/components/formik/Select'
import FormikField from 'src/core/components/formik/Field'
import { SnackbarContext } from 'src/contexts/snackbar'
import { GETPRODUCTTYPES } from 'src/graphql/product/queries'
import { GETCOMPONENTS } from 'src/graphql/component/queries'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { GETALLHPP } from 'src/graphql/hpp/queries'
import { GETPRODUCT } from 'src/graphql/product/queries'
import useTotalHpp from 'src/hooks/useTotalHpp'
import useValueHpp from 'src/hooks/product/useValueHpp'

export interface Props {
  isNew: boolean
  typeId: number
  useInk: boolean
  useDisplay: boolean
  useMasking: boolean
}

export type HPPType = (Value & { hpp: number })

const UpdateProduct: NextPage<Props> = ({ isNew, typeId, useDisplay, useInk, useMasking }) => {
  const router = useRouter()
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)

  const { data } = useQuery<z.infer<typeof Product>>(['product'], { enabled: false })
  const { data: productType } = useQuery<z.infer<typeof ProductType>>(['productType'], { enabled: false })
  const { data: units } = useQuery<Value[]>(['units'], { enabled: false })
  const { data: material } = useQuery<HPPType[]>(['material'], { enabled: false })
  const { data: printers } = useQuery<HPPType[]>(['printers'], { enabled: false })
  const { data: inks } = useQuery<HPPType[]>(['inks'], { enabled: false })
  const { data: maskings } = useQuery<HPPType[]>(['maskings'], { enabled: false })
  const { data: displays } = useQuery<HPPType[]>(['displays'], { enabled: false })
  const [mutationUpdateProduct, { loading }] = useMutation(isNew ? CREATEPRODUCT : UPDATEPRODUCT)
  const { showSnackbar } = React.useContext(SnackbarContext)
  const  { valueMaterial, valueDisplay, valueInk, valueMasking, valuePrinter } = useValueHpp({ isNew })

  const handleClickButton = React.useCallback((id: string) => {
    setActiveField(id)
  }, [])

  const formik = useFormik({
    initialValues: {
      // Default
      id: data?.id || 0,
      title: data?.title || '',
      area: data?.area || '',
      material: valueMaterial,
      printer: valuePrinter,
      ink: valueInk,
      masking: valueMasking,
      display: valueDisplay,
      unitId: data?.unit?.id || '',
      description: data?.description || '',
      totalHpp: '',
      priceDpp: data?.priceDpp || 0,
    },
    validationSchema: toFormikValidationSchema(Product),
    onSubmit: (values, { resetForm }) => {
      setActiveField('')
      const hppIds: number[] = []

      if (values.material) {
        hppIds.push(values.material as any)
      }

      if (values.printer) {
        hppIds.push(values.printer as any)
      }

      if (values.ink) {
        hppIds.push(values.ink as any)
      }

      if (values.masking) {
        hppIds.push(values.masking as any)
      }

      if (values.display) {
        hppIds.push(values.display as any)
      }

      const input = {
        title: values.title,
        area: values.area,
        priceDpp: values.priceDpp || 0,
        productTypeId: typeId,
        hppIds,
        description: values.description,
        unitId: values.unitId,
        log: '',
      }
      console.log('values', values)

      mutationUpdateProduct({
        variables: { input: isNew ? input : {
          ...input,
          id: data?.id || 0,
        }
      },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data product <strong>{values.title}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        await router.push(`/admin/products`, `/admin/products`)
      }).catch(() => {
        showSnackbar('Terjadi kesalahan pada server.', 'error')
      })
    },
  })

  useTotalHpp({ formik })

  const valueHpp = React.useMemo(() => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })

    return formik.values.totalHpp !== '' ? formatter.format(formik.values.totalHpp as any) : ''
  }, [formik.values.totalHpp])

  return (
    <SectionContainer>
      <TitleHeader text="Harga Jual Produk" href="/admin/products" />
      <Box paddingTop={4} marginBottom={2}>
        <Box marginBottom={2}>
          <TitleContent text={`Tambahkan Daftar ${productType?.title || ''}`} />
        </Box>
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          <FormikField
            id="title"
            label="Nama Product"
            disabled={activeField !== 'title'}
            withButton
            onClickButton={handleClickButton}
          />

          <FormikSelect
            id="material"
            label="Material Bahan"
            data={material || []}
          />

          <FormikSelect
            id="printer"
            label="Mesin Cetak"
            data={printers || []}
          />

          {useInk &&
            <FormikSelect
              id="ink"
              label="Tinta"
              data={inks || []}
            />
          }

          {useDisplay &&
            <FormikSelect
              id="display"
              label="Display"
              data={displays || []}
            />
          }

          {useMasking &&
            <FormikSelect
              id="masking"
              label="Masking"
              data={maskings || []}
            />
          }

          <Grid2 container rowSpacing={1} columnSpacing={3}>
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
                id="unitId"
                label="Satuan"
                data={units || []}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormikField
                id="description"
                label="Catatan"
                disabled={activeField !== 'description'}
                withButton
                onClickButton={handleClickButton}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormikField
                id="totalHpp"
                label="Total HPP (Rp)"
                regex={/^[0-9]+$/}
                type="number"
                disabled
                value={valueHpp}
              />
            </Grid2>
          </Grid2>

          <Box marginTop={2} marginBottom={2}>
            <TitleContent text={`Perhitungan Pendapatan + Pajak`} />
            <Typography>Nominal rupiah otomatis dibulatkan</Typography>
          </Box>
          <Tax />
        </FormikContext.Provider>
      </Box>
      <ButtonMain
        onClick={() => formik.handleSubmit()}
        loading={loading}
        disabled={loading || !formik.dirty}
        text="Simpan"
        color="success"
      />
    </SectionContainer>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const queryClient = new QueryClient()
  const client = createApolloClient() 
  const session = await getServerSession(req, res)

  const { id, typeId } = query
  const isNew = id === 'new'
  const parseTypeId = parseInt(typeId)

  if (!isNumber(parseTypeId)) {
    return {
      notFound: true,
    }
  }

  const useInk = parseTypeId === 1 || parseTypeId === 2 // Eco solvent, Banner
  const useMasking = parseTypeId === 3 // Cutting sticker
  const useDisplay = parseTypeId === 1 // Banner

  await Promise.allSettled([
    queryClient.prefetchQuery(['productType'], async () => {
      return await client.query({
        query: GETPRODUCTTYPES,
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getProductTypes?.length ? find(data.getProductTypes, { id: parseTypeId }) || null : null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['material'], async () => {
      return await client.query({
        query: GETALLHPP,
        variables: {
          input: { hppTypeId: 2, limit: 25, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getListHPP?.data.map((item) => ({ id: item.id, title: item.title, hpp: item.hpp })) || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['printers'], async () => {
      return await client.query({
        query: GETALLHPP,
        variables: {
          input: { hppTypeId: 3, limit: 25, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getListHPP?.data.map((item) => ({ id: item.id, title: item.title, hpp: item.hpp })) || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['inks'], async () => {
      if (!useInk) return null

      return await client.query({
        query: GETALLHPP,
        variables: {
          input: { hppTypeId: 1, limit: 25, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getListHPP?.data.map((item) => ({ id: item.id, title: item.title, hpp: item.hpp })) || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['maskings'], async () => {
      if (!useMasking) return null

      return await client.query({
        query: GETALLHPP,
        variables: {
          input: { hppTypeId: 7, limit: 25, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getListHPP?.data.map((item) => ({ id: item.id, title: item.title, hpp: item.hpp })) || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['displays'], async () => {
      if (!useDisplay) return null

      return await client.query({
        query: GETALLHPP,
        variables: {
          input: { hppTypeId: 6, limit: 25, page: 1 },
        },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getListHPP?.data.map((item) => ({ id: item.id, title: item.title, hpp: item.hpp })) || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['units'], async () => {
      return await client.query({
        query: GETCOMPONENTS,
        variables: { componentTypeId: 1 },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getComponents || null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['product'], async () => {
      if (!isNew && id) {
        return await client.query({
          query: GETPRODUCT,
          variables: { id: parseInt(id) },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data?.product || null
        }).catch(() => {
          return null
        })
      }
      return null
    }),
  ])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isNew,
      useInk,
      useDisplay,
      useMasking,
      typeId: parseInt(typeId),
    },
  }
}

export default UpdateProduct
