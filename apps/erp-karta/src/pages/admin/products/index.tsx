import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import { useQuery as useQueryApollo } from '@apollo/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import createApolloClient from 'src/graphql/apollo-client'
import { ProductType } from 'src/validations/product/schemas'
import { GETPRODUCTS } from 'src/graphql/product/queries'
import { GETPRODUCTTYPES } from 'src/graphql/product/queries'

const Table = dynamic(() => import('src/core/components/product/Table'), { ssr: false })

export interface Props {}

export interface PropsTable {
  id: number
}

const TableContainer = React.memo(({ id }: PropsTable) => {
  const [page, setPage] = React.useState(1)
  const { data, loading, refetch } = useQueryApollo(GETPRODUCTS, { variables: {
    input: { productTypeId: id, limit: 10, page },
  }})

  return (
    <Box>
      <Table
        typeId={id}
        count={data?.getProducts?.pageCount || 0}
        page={page || 0}
        data={data?.getProducts?.data || []} 
        loading={loading}
        refetch={refetch}
        setPage={setPage}
      />
    </Box>
  )
})

const Products: NextPage<Props> = () => {
  const { data: types } = useQuery<z.infer<typeof ProductType>[]>(['productTypes'], { enabled: false })

  return (
    <SectionContainer className="table">
      <Box paddingX={4} paddingTop={3}>
        <TitleHeader text="Daftar Produk" />
      </Box>
      {types?.map((item, i) => (
        <Box key={i} paddingY={2}>
          <Box paddingX={4} marginBottom={3}>
            <TitleContent text={`Cetak ${item.title}`} maxWidth={230} href={`/admin/products/update/${item.id}/new`} />
          </Box>
          <TableContainer id={item.id} />
        </Box>
      ))}
    </SectionContainer>
  )
}

export async function getServerSideProps({ req, res }) {
  const queryClient = new QueryClient()
  const client = createApolloClient() 
  const session = await getServerSession(req, res)

  await queryClient.prefetchQuery(['productTypes'], async () => {
    return await client.query({
      query: GETPRODUCTTYPES,
      context: {
        headers: {
        'Authorization': `Bearer ${session?.user?.token}` || '',
        },
      },
    }).then(({ data }) => {
      return data?.getProductTypes || []
    }).catch(() => {
      return []
    })
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Products
