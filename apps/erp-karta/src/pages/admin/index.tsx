import React from 'react'
import { NextPage } from 'next'
import { Box } from '@mui/material'
import { capitalize } from 'lodash'
import { SectionContainer } from 'src/styles/app'

export interface Props {}

const AdminHome: NextPage<Props> = () => {
  return (
    <p>test</p>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default AdminHome
