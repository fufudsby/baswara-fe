import React from 'react'
import { NextPage } from 'next'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { find, isNumber } from 'lodash'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Hpp, HppType, HppValidation } from 'src/validations/hpp/schemas'
import { CREATEHPP, UPDATEHPP } from 'src/graphql/hpp/mutations'
import createApolloClient from 'src/graphql/apollo-client'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import { FormikContext } from 'src/contexts/formik'
import ButtonMain from 'src/core/components/ButtonMain'
import Form from 'src/core/components/hpp/Form'
import FormInk from 'src/core/components/hpp/FormInk'
import FormPrinter from 'src/core/components/hpp/FormPrinter'
import { SnackbarContext } from 'src/contexts/snackbar'
import { GETHPPTYPES, GETHPP } from 'src/graphql/hpp/queries'
import { GETCOMPONENTS } from 'src/graphql/component/queries'
import { Value } from 'src/core/components/formik/Select'
import { hppInput } from 'utils/hppInput'
import { ActiveFieldContext } from 'src/contexts/activeField'

export interface Props {
  isNew: boolean
  typeId: number
}

const UpdateHpp: NextPage<Props> = ({ isNew, typeId }) => {
  const router = useRouter()
  const { setActiveField } = React.useContext(ActiveFieldContext)

  const isInk = React.useMemo(() => typeId === 1, [typeId])
  const isPrinter = React.useMemo(() => typeId === 3, [typeId])

  const { data } = useQuery<z.infer<typeof Hpp>>(['hpp'], { enabled: false })
  const { data: hppType } = useQuery<z.infer<typeof HppType>>(['hppType'], { enabled: false })
  const { data: units } = useQuery<Value[]>(['units'], { enabled: false })
  const { data: printers } = useQuery<Value[]>(['printers'], { enabled: false })
  const [mutationUpdateHpp, { loading }] = useMutation(isNew ? CREATEHPP : UPDATEHPP)
  const { showSnackbar } = React.useContext(SnackbarContext)

  const formik = useFormik({
    initialValues: {
      // Default
      id: data?.id || 0,
      title: data?.title || '',
      hpp: data?.hpp || '',
      area: data?.area || '',
      // Printer
      pricePrintHead: data?.pricePrintHead || '',
      priceRoll: data?.priceRoll || '',
      priceCutter: data?.priceCutter || '',
      // Ink
      priceInk: data?.priceInk || '',
      unitInk: data?.unitInk || '',
      // Component
      unit: '',
      printer: '',
    },
    validationSchema: () => {
      const omitInk: any = { pricePrintHead: true, priceCutter: true, priceRoll: true, printer: true }
      const omitPrinter: any = { priceInk: true, unitInk: true }
    
      if (isInk) {
        return toFormikValidationSchema(HppValidation.omit(omitInk))
      }

      if (isPrinter) {
        return toFormikValidationSchema(HppValidation.omit(omitPrinter))
      }

      return toFormikValidationSchema(HppValidation.omit({ ...omitInk, ...omitPrinter }))
    },
    onSubmit: (values, { resetForm }) => {
      setActiveField('')
      const input = hppInput({
        values: {
          id: isNew ? 0 : data?.id || 0,
          title: values.title,
          hpp: values.hpp as number,
          area: values.area as number,
          pricePrintHead: values.pricePrintHead as number,
          priceRoll: values.priceRoll as number,
          priceCutter: values.priceCutter as number,
          priceInk: values.priceInk as number,
          unitInk: values.unitInk,
          unit: values.unit as unknown as number,
          printer: values.printer as unknown as number,
        },
        type: isInk ? 'ink' : isPrinter ? 'printer' : 'default',
      })
      console.log('values', input)

      mutationUpdateHpp({
        variables: {
          input: {
            ...input,
            hppTypeId: typeId,
          },
        },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data HPP <strong>{values.title}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        await router.push(`/admin/hpp`, `/admin/hpp`)
      }).catch(() => {
        showSnackbar('Terjadi kesalahan pada server.', 'error')
      })
    },
  })

  const titleLabel = React.useMemo(() => {
    switch (typeId) {
      case 1:
        return 'Tinta'
      case 3:
        return 'Cetak'
      case 5:
      case 8:
        return 'Potong'
      default:
        return 'Bahan'
    }  
  }, [typeId])

  React.useEffect(() => {
    data?.components.forEach((item) => {
      const componentType = item.componentType
      if (componentType?.id === 1) {
        formik.setFieldValue('unit', item.id)
      }

      if (componentType?.id === 2) {
        formik.setFieldValue('printer', item.id)
      }
    })
  }, [])

  return (
    <SectionContainer>
      <TitleHeader text="HPP" href="/admin/hpp" />
      <Box paddingTop={4} marginBottom={2}>
        <Box marginBottom={2}>
          <TitleContent text={`Tambahkan Daftar ${hppType?.title || ''}`} />
        </Box>
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          {isInk ? (
            <FormInk title={titleLabel} units={units || []} />
          ) : (
            <>
              {isPrinter ? (
                <FormPrinter title={titleLabel} printers={printers || []} units={units || []} />
              ) : (
                <Form title={titleLabel} units={units || []} />
              )}
            </>
          )}
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

  await Promise.allSettled([
    queryClient.prefetchQuery(['hppType'], async () => {
      return await client.query({
        query: GETHPPTYPES,
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getHppTypes?.length ? find(data.getHppTypes, { id: parseTypeId }) || null : null
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['printers'], async () => {
      return await client.query({
        query: GETCOMPONENTS,
        variables: { componentTypeId: 2 },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getComponents
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
        return data?.getComponents
      }).catch(() => {
        return null
      })
    }),
    queryClient.prefetchQuery(['hpp'], async () => {
      if (!isNew && id) {
        return await client.query({
          query: GETHPP,
          variables: { id: parseInt(id) },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data?.getHPP || null
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
      typeId: parseInt(typeId),
    },
  }
}

export default UpdateHpp
