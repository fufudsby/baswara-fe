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
import { FinishingType, Finishing } from 'src/validations/finishing/schemas'
import { CREATEFINISHING, UPDATEFINISHING } from 'src/graphql/finishing/mutations'
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
import { GETFINISHINGTYPES } from 'src/graphql/finishing/queries'
import { GETCOMPONENTS } from 'src/graphql/component/queries'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { GETALLHPP } from 'src/graphql/hpp/queries'
import { GETFINISHING } from 'src/graphql/finishing/queries'
import useTotalHpp from 'src/hooks/useTotalHpp'
import useValueHpp from 'src/hooks/product/useValueHpp'

export interface Props {
  isNew: boolean
  typeId: number
  useMaterial: boolean
}

export type HPPType = (Value & { hpp: number })

const UpdateFinishing: NextPage<Props> = ({ isNew, typeId, useMaterial }) => {
  const router = useRouter()
  const { activeField, setActiveField } = React.useContext(ActiveFieldContext)

  const { data } = useQuery<z.infer<typeof Finishing>>(['finishing'], { enabled: false })
  const { data: finishingType } = useQuery<z.infer<typeof FinishingType>>(['finishingType'], { enabled: false })
  const { data: units } = useQuery<Value[]>(['units'], { enabled: false })
  const { data: material } = useQuery<HPPType[]>(['material'], { enabled: false })
  const { data: printers } = useQuery<HPPType[]>(['printers'], { enabled: false })
  const [mutationUpdateFinishing, { loading }] = useMutation(isNew ? CREATEFINISHING : UPDATEFINISHING)
  const { showSnackbar } = React.useContext(SnackbarContext)
  const  { valueMaterial, valuePrinter } = useValueHpp({ isNew })

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
      unitId: data?.unit?.id || '',
      description: data?.description || '',
      totalHpp: '',
      priceDpp: data?.priceDpp || 0,
    },
    validationSchema: toFormikValidationSchema(Finishing),
    onSubmit: (values, { resetForm }) => {
      setActiveField('')
      const hppIds: number[] = []

      if (values.material) {
        hppIds.push(values.material as any)
      }

      if (values.printer) {
        hppIds.push(values.printer as any)
      }

      const input = {
        title: values.title,
        area: values.area,
        priceDpp: values.priceDpp || 0,
        finishingTypeId: typeId,
        hppIds,
        description: values.description,
        unitId: values.unitId,
        log: '',
      }
      console.log('values', values)

      mutationUpdateFinishing({
        variables: { input: isNew ? input : {
          ...input,
          id: data?.id || 0,
        }
      },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data finishing <strong>{values.title}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        await router.push(`/admin/finishing`, `/admin/finishing`)
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
      <TitleHeader text="Harga Jual Finishing" href="/admin/finishing" />
      <Box paddingTop={4} marginBottom={2}>
        <Box marginBottom={2}>
          <TitleContent text={`Tambahkan Daftar ${finishingType?.title || ''}`} />
        </Box>
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          <FormikField
            id="title"
            label="Nama Finishing"
            disabled={activeField !== 'title'}
            withButton
            onClickButton={handleClickButton}
          />

          {useMaterial &&
            <FormikSelect
              id="material"
              label="Material Bahan"
              data={material || []}
            />
          }

          <FormikSelect
            id="printer"
            label="Mesin Cetak"
            data={printers || []}
          />

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

  const useMaterial = parseTypeId === 2 // Laminasi dingin

  await Promise.allSettled([
    queryClient.prefetchQuery(['finishingType'], async () => {
      return await client.query({
        query: GETFINISHINGTYPES,
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getFinishingTypes?.length ? find(data.getFinishingTypes, { id: parseTypeId }) || null : null
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
    queryClient.prefetchQuery(['finishing'], async () => {
      if (!isNew && id) {
        return await client.query({
          query: GETFINISHING,
          variables: { id: parseInt(id) },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data?.finishing || null
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
      useMaterial,
      typeId: parseInt(typeId),
    },
  }
}

export default UpdateFinishing
