import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from '@blitzjs/next'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import { z } from 'zod'
import { User } from 'src/services/user/schemas'
import { withBlitz } from 'src/blitz-client'
import theme from 'src/styles/theme'
import createApolloClient from 'src/graphql/apollo-client'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import { AccountContext } from 'src/contexts/account'

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error.message || error.name}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = React.useState<z.infer<typeof User> | null>(null)
  const getLayout = Component.getLayout || ((page) => page)
  const client = createApolloClient()
  const down400 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm - 200))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downLg = useMediaQuery(theme.breakpoints.down('lg'))
  const downLg2 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.lg + 100))
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <ApolloProvider client={client}>
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
            }}
          >
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </AccountContext.Provider>
        </BreakpointsContext.Provider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
