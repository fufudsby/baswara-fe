import React, { memo } from 'react'
import Head from 'next/head'
import { truncate } from 'lodash'
import { Box } from '@mui/material'
import Sidebar from 'src/core/layouts/Sidebar'
// import Title from 'src/core/components/Title'
// import Drawer from 'src/core/components/Drawer'
import { MainContainer } from 'src/styles/app'
// import Footer from 'src/core/layouts/Footer'
import { AccountContext } from 'src/contexts/account'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {
  title?: string
  withMenu?: boolean
  children?: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ title, withMenu, children }: Props) => {
  const { account } = React.useContext(AccountContext)
  const { downSm, downLg } = React.useContext(BreakpointsContext)
  return (
    <>
      <Head>
        <title>{title || 'Surabaya'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MainContainer>
        {account && (
          <Box
            className="top-title-header"
            sx={{
              paddingY: !account ? 0 : downSm ? 2 : 4,
            }}
          >
            {/* {downLg && <Drawer />}
            <Title
              text={truncate(account?.username, { length: !downSm ? 60 : 30 }) || ''}
            /> */}
          </Box>
        )}
        <Box display="flex" alignItems="stretch" width={1} minHeight="100vh">
          {withMenu && !downLg && <Sidebar />}
          <Box className={`right-side ${downLg ? 'left' : ''}`} flexGrow={1}>
            {children}
            {/* {!!withMenu && <Footer />} */}
          </Box>
        </Box>
      </MainContainer>
    </>
  )
}

export default memo(Layout)
