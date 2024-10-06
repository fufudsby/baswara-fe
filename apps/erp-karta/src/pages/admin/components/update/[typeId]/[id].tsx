import React from 'react'
import { NextPage } from 'next'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Component, ComponentType } from 'src/validations/component/schemas'
import { GETCOMPONENT } from 'src/graphql/component/queries'
import { CREATECOMPONENT, UPDATECOMPONENT } from 'src/graphql/component/mutations'
import createApolloClient from 'src/graphql/apollo-client'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import { FormikContext } from 'src/contexts/formik'
import FormikField from 'src/core/components/formik/Field'
import ButtonMain from 'src/core/components/ButtonMain'
import { SnackbarContext } from 'src/contexts/snackbar'

export interface Props {
  isNew: boolean
  typeId: number
}

const UpdateComponent: NextPage<Props> = ({ isNew, typeId }) => {
  const router = useRouter()
  const { data } = useQuery<z.infer<typeof ComponentType>>(['component'], { enabled: false })
  const [mutationUpdateComponent, { loading }] = useMutation(isNew ? CREATECOMPONENT : UPDATECOMPONENT)
  const { showSnackbar } = React.useContext(SnackbarContext)

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
    },
    validationSchema: toFormikValidationSchema(Component),
    onSubmit: (values, { resetForm }) => {
      let input: any = values
      if (isNew) {
        input = {
          ...input,
          componentTypeId: typeId,
        }
      } else {
        input = {
          ...input,
          id: data?.id,
        }
      }
      mutationUpdateComponent({
        variables: { input },
      }).then(async () => {
        resetForm()
        showSnackbar(<>Data komponen <strong>{values.title}</strong> berhasil {isNew ? 'ditambahkan' : 'diubah'}.</>)
        await router.push(`/admin/components`, `/admin/components`)
      }).catch(() => {
        showSnackbar('Terjadi kesalahan pada server.', 'error')
      })
    },
  })

  return (
    <SectionContainer>
      <TitleHeader text="Komponen" href="/admin/components" />
      <Box paddingTop={4} marginBottom={2}>
        <Box marginBottom={1}>
          <TitleContent text="Tambah Komponen" />
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
  
    await queryClient.prefetchQuery(['component'], async () => {
      return await client.query({
        query: GETCOMPONENT,
        variables: { id: parseInt(id) },
        context: {
          headers: {
          'Authorization': `Bearer ${session?.user?.token}` || '',
          },
        },
      }).then(({ data }) => {
        return data?.getComponent || null
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

export default UpdateComponent
