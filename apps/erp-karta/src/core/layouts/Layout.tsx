import React, { memo } from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import Sidebar from 'src/core/layouts/Sidebar'
// import Title from 'src/core/components/Title'
// import Drawer from 'src/core/components/Drawer'
import { MainContainer } from 'src/styles/app'
// import Footer from 'src/core/layouts/Footer'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {
  children?: React.ReactNode
  loading: boolean
}

const Layout: React.FunctionComponent<Props> = ({ children, loading }: Props) => {
  const router = useRouter()
  const { downSm, downLg } = React.useContext(BreakpointsContext)
  const isAdminPage = React.useMemo(() => {
    const route = router.route.split('/')[1]
    return route === 'admin'
  }, [])
  return (
    <>
      <MainContainer>
        {isAdminPage && (
          <Box
            className="top-title-header"
            sx={{
              paddingY: !isAdminPage ? 0 : downSm ? 2 : 4,
            }}
          >
            {/* {downLg && <Drawer />}
            <Title
              text={truncate(account?.username, { length: !downSm ? 60 : 30 }) || ''}
            /> */}
          </Box>
        )}
        <Box display="flex" alignItems="stretch" width={1} minHeight="100vh">
          {isAdminPage && !downLg && <Sidebar />}
          <Box className={`right-side ${downLg ? 'left' : ''}`} flexGrow={1}>
            {isAdminPage && loading ? <></> : children}
            {/* {!!withMenu && <Footer />} */}
          </Box>
        </Box>
      </MainContainer>
    </>
  )
}

export default memo(Layout)
