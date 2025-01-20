import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import { z } from 'zod'
import { useQuery as useQueryApollo } from '@apollo/client'
import { SectionContainer } from 'src/styles/app'
import TitleHeader from 'src/core/components/TitleHeader'
import TitleContent from 'src/core/components/TitleContent'
import { GETCUSTOMERS } from 'src/graphql/customer/queries'
import Form from 'src/core/components/customer/Form'
import DialogUpdate, { RefProps } from 'src/core/components/customer/DialogUpdate'
import { Customer } from 'src/validations/customer/schemas'

const Table = dynamic(() => import('src/core/components/customer/Table'), { ssr: false })

export interface Props {}

const Customers: NextPage<Props> = () => {
  const updateRef = React.useRef<RefProps>(null)
  const [page, setPage] = React.useState(1)
  const [selected, setSelected] = React.useState<z.infer<typeof Customer> | null>(null)

  const { data, loading, refetch } = useQueryApollo(GETCUSTOMERS, { variables: {
    input: { limit: 10, page },
  }})

  const handleEdit = React.useCallback((data: z.infer<typeof Customer> | null) => {
    setSelected(data)
    if (data) {
      updateRef.current?.setOpen(true)
    }
  }, [updateRef])

  const handleClose = React.useCallback(() => {
    updateRef.current?.setOpen(false)
    setSelected(null)
  }, [updateRef])

  return (
    <>
      <Box>
        <SectionContainer>
          <TitleHeader text="Konsumen" />

          <Box marginY={2}>
            <TitleContent text="Tambah Konsumen Baru" maxWidth={230} />
          </Box>
          <Form refetch={refetch} />
        </SectionContainer>

        <SectionContainer className="table" sx={{ marginTop: 3 }}>
          <Box paddingY={2}>
            <Box paddingX={4} marginBottom={3}>
              <TitleContent text="Daftar Konsumen" maxWidth={230} />
            </Box>
            <Table
              count={data?.getCustomers?.pageCount || 0}
              page={page || 0}
              data={data?.getCustomers?.data || []} 
              loading={loading}
              refetch={refetch}
              setPage={setPage}
              setEdit={handleEdit}
            />
          </Box>
        </SectionContainer>
      </Box>
      <DialogUpdate
        ref={updateRef}
        refetch={refetch}
        data={selected || undefined}
        onClose={handleClose}
      />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default Customers
