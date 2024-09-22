import React from 'react'
import { NextPage } from 'next'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Goods, GoodsType } from 'src/validations/goods/schemas'
import { GETGOODS } from 'src/graphql/goods/queries'
import { CREATEGOODS, UPDATEGOODS } from 'src/graphql/goods/mutations'
import createApolloClient from 'src/graphql/apollo-client'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import { FormikContext } from 'src/contexts/formik'
import FormikField from 'src/core/components/formik/field'
import ButtonMain from 'src/core/components/ButtonMain'
import { SnackbarContext } from 'src/contexts/snackbar'

export interface Props {
  isNew: boolean
  typeId: number
}

const UpdateGoods: NextPage<Props> = ({ isNew, typeId }) => {
  const router = useRouter()
  const { data } = useQuery<z.infer<typeof GoodsType>>(['goods'], { enabled: false })
  const [mutationUpdateGoods, { loading }] = useMutation(isNew ? CREATEGOODS : UPDATEGOODS)
  const { showSnackbar } = React.useContext(SnackbarContext)

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
    },
    validationSchema: toFormikValidationSchema(Goods),
    onSubmit: (values, { resetForm }) => {
      let input: any = values
      if (isNew) {
        input = {
          ...input,
          goodsTypeId: typeId,
        }
      } else {
        input = {
          ...input,
          id: data?.id,
        }
      }
      mutationUpdateGoods({
        variables: { input },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data barang <strong>{values.title}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        await router.push(`/admin/goods`, `/admin/goods`)
      }).catch(() => {
        showSnackbar('Terjadi kesalahan pada server.', 'error')
      })
    },
  })

  return (
    <SectionContainer>
      <TitleHeader text="Barang" href="/admin/goods" />
      <Box paddingTop={4} marginBottom={2}>
        <Box marginBottom={1}>
          <TitleContent text="Tambah Bahan" />
        </Box>
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          <FormikField label="Title" />
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
  const { id, typeId } = query
  const isNew = id === 'new'

  if (!isNew && id) {
    const client = createApolloClient() 
    const session = await getServerSession(req, res)
  
    await queryClient.prefetchQuery(['goods'], async () => {
      return await client.query({
        query: GETGOODS,
        variables: { id: parseInt(id) },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getGoods || null
      }).catch(() => {
        return null
      })
    })  
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isNew,
      typeId: parseInt(typeId),
    },
  }
}

export default UpdateGoods
