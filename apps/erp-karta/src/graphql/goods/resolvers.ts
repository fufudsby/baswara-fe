import { GraphQLError } from 'graphql'
import { ReasonPhrases } from 'http-status-codes'
import { Session } from 'next-auth'
import createApolloClient from 'src/graphql/apollo-client'
import { GETALLGOODS } from 'src/graphql/goods/queries'
import { CREATEGOODS, UPDATEGOODS, DELETEGOODS } from 'src/graphql/goods/mutations'

export default function resolver() {
  const client = createApolloClient() 

  return {
    Query: {
      async getAllGoods(_: any, { goodsTypeId }, session: Session | null) {
        return await client.query({
          query: GETALLGOODS,
          variables: { goodsTypeId },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getAllGoods
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
    },
    Mutation: {
      async createGoods(_: any, { createGoodsInput }, session: Session | null) {
        return await client.mutate({
          mutation: CREATEGOODS,
          variables: { input: createGoodsInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.createGoods
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async updateGoods(_: any, { updateGoodsInput }, session: Session | null) {
        return await client.mutate({
          mutation: UPDATEGOODS,
          variables: { input: updateGoodsInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.updateGoods
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async removeGoods(_: any, { id }, session: Session | null) {
        return await client.mutate({
          mutation: DELETEGOODS,
          variables: { id, userId: session?.user.id },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.removeGoods
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
    },
  }
}