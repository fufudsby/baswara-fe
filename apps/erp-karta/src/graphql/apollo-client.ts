import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
  const isServer = typeof window === 'undefined'
  return new ApolloClient({
    ssrMode: isServer,
    uri: isServer ? process.env.BASE_GRAPHQL_URL : process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient