import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { capitalize } from 'lodash'
import Layout from 'src/core/layouts/Layout'
import { SectionContainer } from 'src/styles/app'

export interface Props {}

const AdminHome: NextPage<Props> = () => {
  return (
    <Layout title="Home Page" withMenu>
      <p>test</p>
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default AdminHome
