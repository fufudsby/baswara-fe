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
import { HppType } from 'src/validations/hpp/schemas'
import { GETHPPTYPES, GETALLHPP } from 'src/graphql/hpp/queries'

const Table = dynamic(() => import('src/core/components/hpp/Table'), { ssr: false })

export interface Props {}

export interface PropsTable {
  id: number
}

const TableContainer = React.memo(({ id }: PropsTable) => {
  const [page, setPage] = React.useState(1)
  const { data, loading, refetch } = useQueryApollo(GETALLHPP, { variables: {
    input: { hppTypeId: id, limit: 10, page },
  }})

  return (
    <Box>
      <Table
        typeId={id}
        count={data?.getListHPP?.pageCount || 0}
        page={page || 0}
        data={data?.getListHPP?.data || []} 
        loading={loading}
        refetch={refetch}
        setPage={setPage}
      />
    </Box>
  )
})

const Hpp: NextPage<Props> = () => {
  // const { downSm, downMd } = React.useContext(BreakpointsContext)
  const { data: types } = useQuery<z.infer<typeof HppType>[]>(['hppTypes'], { enabled: false })

  return (
    <SectionContainer className="table">
      <Box paddingX={4} paddingTop={3}>
        <TitleHeader text="Daftar HPP" />
      </Box>
      {types?.map((item, i) => (
        <Box key={i} paddingY={2}>
          <Box paddingX={4} marginBottom={3}>
            <TitleContent text={item.title} maxWidth={230} href={`/admin/hpp/update/${item.id}/new`} />
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

  await queryClient.prefetchQuery(['hppTypes'], async () => {
    return await client.query({
      query: GETHPPTYPES,
      context: {
        headers: {
        'Authorization': `Bearer ${session?.user?.token}` || '',
        },
      },
    }).then(({ data }) => {
      return data?.getHppTypes || []
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

export default Hpp
