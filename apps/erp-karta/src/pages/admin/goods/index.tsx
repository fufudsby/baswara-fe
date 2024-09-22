import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import { useQuery as useQueryApollo } from '@apollo/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { SectionContainer } from 'src/styles/app'
// import { BreakpointsContext } from 'src/contexts/breakpoints'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import getServerSession from 'utils/getServerSession'
import createApolloClient from 'src/graphql/apollo-client'
import { GoodsType } from 'src/validations/goods/schemas'
import { GETGOODSTYPES, GETALLGOODS } from 'src/graphql/goods/queries'

const Table = dynamic(() => import('src/core/components/goods/Table'), { ssr: false })

export interface Props {}

export interface PropsTable {
  id: number
}

const TableContainer = React.memo(({ id }: PropsTable) => {
  const { data, loading, refetch } = useQueryApollo(GETALLGOODS, { variables: { goodsTypeId: id }})

  return (
    <Box>
      <Table
        typeId={id}
        data={data?.getAllGoods || []} 
        loading={loading}
        refetch={refetch}
      />
    </Box>
  )
})

const Goods: NextPage<Props> = () => {
  // const { downSm, downMd } = React.useContext(BreakpointsContext)
  const { data: types } = useQuery<z.infer<typeof GoodsType>[]>(['goodsTypes'], { enabled: false })

  return (
    <SectionContainer className="table">
      <Box paddingX={4} paddingTop={3}>
        <TitleHeader text="Daftar Barang" />
      </Box>
      {types?.map((item, i) => (
        <Box key={i} paddingY={2}>
          <Box paddingX={4} marginBottom={3}>
            <TitleContent text={item.title} maxWidth={230} href={`/admin/goods/update/${item.id}/new`} />
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

  await queryClient.prefetchQuery(['goodsTypes'], async () => {
    return await client.query({
      query: GETGOODSTYPES,
      context: {
        headers: {
        'Authorization': `Bearer ${session?.user?.token}` || '',
        },
      },
    }).then(({ data }) => {
      return data?.getGoodsTypes || []
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

export default Goods
