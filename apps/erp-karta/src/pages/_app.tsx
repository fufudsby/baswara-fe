import React from 'react'
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from '@blitzjs/next'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { z } from 'zod'
import SnackbarProvider from 'src/contexts/snackbar'
import { User } from 'src/validations/user/schemas'
import { withBlitz } from 'src/blitz-client'
import theme from 'src/styles/theme'
import createApolloClient from 'src/graphql/apollo-client'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import { AccountContext } from 'src/contexts/account'
import Layout from 'src/core/layouts/Layout'

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error.message || error.name}
    />
  )
}

/**
 * Tambah isLoadingAccount karena ada get data 2x ketika hard reload
 * load halaman di Layout menunggu isLoadingAccount false
 */

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = React.useState<z.infer<typeof User> | null>(null)
  const [isLoadingAccount, setIsLoading] = React.useState(true)

  const getLayout = Component.getLayout || ((page) => page)
  const client = createApolloClient()
  const queryClient = new QueryClient({defaultOptions: { queries: { refetchOnWindowFocus: false }}})
  const down400 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm - 200))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downLg = useMediaQuery(theme.breakpoints.down('lg'))
  const downLg2 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.lg + 100))

  return (
    <>
      <Head>
        <title>BSWR</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={(pageProps as any).dehydratedState}>
              <BreakpointsContext.Provider
                value={{
                  down400,
                  downSm,
                  downMd,
                  downLg,
                  downLg2,
                }}
              >
                <AccountContext.Provider
                  value={{
                    account,
                    setAccount,
                    setIsLoading,
                  }}
                >
                  <SnackbarProvider>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                      <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Layout loading={isLoadingAccount}>
                          {getLayout(<Component {...pageProps} />)}
                        </Layout>
                      </ThemeProvider>
                    </AppRouterCacheProvider>
                  </SnackbarProvider>
                </AccountContext.Provider>
              </BreakpointsContext.Provider>
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </>
  )
}

export default withBlitz(MyApp)
