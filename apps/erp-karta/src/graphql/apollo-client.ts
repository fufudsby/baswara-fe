import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const createApolloClient = () => {
  const isServer = typeof window === 'undefined'
  return new ApolloClient({
    ssrMode: isServer,
    uri: isServer ? process.env.BASE_GRAPHQL_URL : process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL,
    cache: new InMemoryCache(),
    defaultOptions,
  })
}

export default createApolloClient