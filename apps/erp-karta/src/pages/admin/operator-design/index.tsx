import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import dynamic from 'next/dynamic'
import { useQuery as useQueryApollo } from '@apollo/client'
import { SectionContainer } from 'src/styles/app'
// import { BreakpointsContext } from 'src/contexts/breakpoints'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import { GETLISTORDERDESIGN } from 'src/graphql/order-design/queries'
import FilterOrder from 'src/core/components/FilterOrder'

const Table = dynamic(() => import('src/core/components/order-design/Table'), { ssr: false })

export interface Props {}

const DesignOperator: NextPage<Props> = () => {
  // const { downSm, downMd } = React.useContext(BreakpointsContext)
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(new Date()).subtract(7, 'days'))
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date()))
  const [page, setPage] = React.useState(1)
  const { data, loading, refetch } = useQueryApollo(GETLISTORDERDESIGN, { variables: {
    input: {
      limit: 10,
      page,
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: `${endDate?.format('YYYY-MM-DD')}T23:00:00.000Z`,
    },
  }})

  const totalOrder = React.useMemo(() => {
    let total = 0
    if (data?.getListOrderDesign?.process) total = total + data?.getListOrderDesign?.process
    if (data?.getListOrderDesign?.printing) total = total + data?.getListOrderDesign?.printing
    if (data?.getListOrderDesign?.done) total = total + data?.getListOrderDesign?.done
    return {
      total,
      process: data?.getListOrderDesign?.process || 0,
      printing: data?.getListOrderDesign?.printing || 0,
      done: data?.getListOrderDesign?.done || 0,
    }
  }, [data])
  return (
    <SectionContainer className="table">
      <Box paddingX={4} paddingTop={3}>
        <TitleHeader text="Pesanan" />
      </Box>
      <Box paddingY={2}>
        <FilterOrder
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          totalOrder={totalOrder}
          loading={loading}
        />
        <Box paddingX={4} marginBottom={3}>
          <TitleContent text="Daftar Pesanan" maxWidth={230} href={`/admin/operator-design/update/new`} />
        </Box>
        <Table
          count={data?.getListOrderDesign?.pageCount || 0}
          page={page || 0}
          data={data?.getListOrderDesign?.data || []} 
          loading={loading}
          refetch={refetch}
          setPage={setPage}
        />
      </Box>
    </SectionContainer>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default DesignOperator
