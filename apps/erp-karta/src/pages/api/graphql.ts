import { ApolloServer } from '@apollo/server'
import { NextApiRequest } from 'next'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from '@apollo/client'
import { mergeTypeDefs } from '@graphql-tools/merge'
import hppResolver from 'src/graphql/hpp/resolvers'
import authResolver from 'src/graphql/auth/resolvers'
import goodsResolver from 'src/graphql/goods/resolvers'
import componentResolver from 'src/graphql/component/resolvers'
import productResolver from 'src/graphql/product/resolvers'
import finishingResolver from 'src/graphql/finishing/resolvers'
import orderDesignResolver from 'src/graphql/order-design/resolvers'
import customerResolver from 'src/graphql/customer/resolvers'
import { INPUTUPDATEGOODS } from 'src/graphql/goods/mutations'
import { TYPEGOODS } from 'src/graphql/goods/queries'
import { TYPECOMPONENT } from 'src/graphql/component/queries'
import { INPUTUPDATECOMPONENT } from 'src/graphql/component/mutations'
import { TYPEHPP, INPUTHPP } from 'src/graphql/hpp/queries'
import { INPUTUPDATEHPP } from 'src/graphql/hpp/mutations'
import { TYPEPRODUCT, INPUTPRODUCT } from 'src/graphql/product/queries'
import { INPUTUPDATEPRODUCT } from 'src/graphql/product/mutations'
import { TYPEFINISHING, INPUTFINSHING } from 'src/graphql/finishing/queries'
import { INPUTUPDATEFINISHING } from 'src/graphql/finishing/mutations'
import { TYPEUSER } from 'src/graphql/user/queries'
import { TYPEORDERDESIGN, INPUTORDERDESIGN } from 'src/graphql/order-design/queries'
import { TYPECUSTOMER, INPUTCUSTOMER } from 'src/graphql/customer/queries'
import { INPUTUPDATECUSTOMER } from 'src/graphql/customer/mutations'

const TYPEDEFS = gql`
  type Query {
    getCustomers(getCustomersInput: GetCustomersInput!): Customers
    getListOrderDesign(getListOrderDesignInput: GetListOrderDesignInput!): OrderDesignList
    getFinishings(getFinishingsInput: GetFinishingsInput!): Finishings
    getProducts(getProductsInput: GetProductsInput!): Products
    getAllProducts(getAllProductsInput: GetAllProductsInput!): [ProductList]
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
    createProduct(createProductInput: CreateProductInput!): Product!
    updateProduct(updateProductInput: UpdateProductInput!): Product!
    removeProduct(id: Int!): Product!
    createFinishing(createFinishingInput: CreateFinishingInput!): Finishing!
    updateFinishing(updateFinishingInput: UpdateFinishingInput!): Finishing!
    removeFinishing(id: Int!): Finishing!
    createCustomer(createCustomerInput: CreateCustomerInput!): Customer!
    updateCustomer(updateCustomerInput: UpdateCustomerInput!): Customer!
    removeCustomer(id: Int!): Customer!
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
    TYPEPRODUCT,
    INPUTPRODUCT,
    INPUTUPDATEPRODUCT,
    TYPEDEFS,
    TYPEFINISHING,
    INPUTFINSHING,
    INPUTUPDATEFINISHING,
    INPUTORDERDESIGN,
    TYPEORDERDESIGN,
    TYPECUSTOMER,
    INPUTCUSTOMER,
    INPUTUPDATECUSTOMER,
    TYPEUSER,
  ]),
  resolvers: {
    Query: {
      ...hppResolver().Query,
      ...authResolver().Query,
      ...goodsResolver().Query,
      ...componentResolver().Query,
      ...productResolver().Query,
      ...finishingResolver().Query,
      ...orderDesignResolver().Query,
      ...customerResolver().Query,
    },
    Mutation: {
      ...hppResolver().Mutation,
      ...goodsResolver().Mutation,
      ...componentResolver().Mutation,
      ...productResolver().Mutation,
      ...finishingResolver().Mutation,
      ...customerResolver().Mutation,
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