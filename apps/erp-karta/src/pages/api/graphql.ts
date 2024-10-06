import { ApolloServer } from '@apollo/server'
import { NextApiRequest } from 'next'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from '@apollo/client'
import { mergeTypeDefs } from '@graphql-tools/merge'
import hppResolver from 'src/graphql/hpp/resolvers'
import authResolver from 'src/graphql/auth/resolvers'
import goodsResolver from 'src/graphql/goods/resolvers'
import componentResolver from 'src/graphql/component/resolvers'
import { INPUTUPDATEGOODS } from 'src/graphql/goods/mutations'
import { TYPEGOODS } from 'src/graphql/goods/queries'
import { TYPECOMPONENT } from 'src/graphql/component/queries'
import { INPUTUPDATECOMPONENT } from 'src/graphql/component/mutations'
import { TYPEHPP, INPUTHPP } from 'src/graphql/hpp/queries'
import { INPUTUPDATEHPP } from 'src/graphql/hpp/mutations'

const TYPEDEFS = gql`
  type Query {
    getHppTypes: [HppTypes]
    getListHPP(getAllHppInput: GetAllHppInput!): HppList
    getAllGoods(goodsTypeId: Int!): [Goods]
    getComponents(componentTypeId: Int!): [Component]
    getCurrentUser: CurrentUser
  }

  type Mutation {
    createHpp(createHppInput: CreateHppInput!): Hpp!
    updateHpp(updateHppInput: UpdateHppInput!): Hpp!
    removeHpp(id: Int!): Hpp!
    createGoods(createGoodsInput: CreateGoodsInput!): Goods!
    updateGoods(updateGoodsInput: UpdateGoodsInput!): Goods!
    removeGoods(id: Int!): Goods!
    createComponent(createComponentInput: CreateComponentInput!): Component!
    updateComponent(updateComponentInput: UpdateComponentInput!): Component!
    removeComponent(id: Int!): Component!
  }

  type CurrentUser {
    id: Int!
    email: String!
    username: String!
  }
`;

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([
    INPUTHPP,
    INPUTUPDATEGOODS,
    TYPEGOODS,
    INPUTUPDATECOMPONENT,
    TYPECOMPONENT,
    TYPEHPP,
    INPUTUPDATEHPP,
    TYPEDEFS,
  ]),
  resolvers: {
    Query: {
      ...hppResolver().Query,
      ...authResolver().Query,
      ...goodsResolver().Query,
      ...componentResolver().Query,
    },
    Mutation: {
      ...hppResolver().Mutation,
      ...goodsResolver().Mutation,
      ...componentResolver().Mutation,
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