import { ApolloServer } from '@apollo/server'
import { NextApiRequest } from 'next'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from '@apollo/client'
import hppResolver from 'src/graphql/hpp/resolvers'
import authResolver from 'src/graphql/auth/resolvers'

const typeDefs = gql`
  type Query {
    getHppTypes: [HppTypes]
    getCurrentUser: CurrentUser
  }

  type HppTypes {
    id: Int!
    title: String!
  }

  type CurrentUser {
    id: Int!
    email: String!
    username: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...hppResolver().Query,
      ...authResolver().Query,
    },
  },
})

const handler = startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async (req) => {
    const getSession = await fetch('http://localhost:3002/api/auth/session', {
      headers: { 'cookie': req.headers.cookie || '' },
    })
  
    const session = await getSession.json();
    return session ? session : null
  },
})

export default handler