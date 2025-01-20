import { GraphQLError } from 'graphql'
import { ReasonPhrases } from 'http-status-codes'
import { Session } from 'next-auth'
import createApolloClient from 'src/graphql/apollo-client'
import { GETLISTORDERDESIGN } from 'src/graphql/order-design/queries'
import { CREATEORDERDESIGN, UPDATEORDERDESIGN, DELETEORDERDESIGN } from 'src/graphql/order-design/mutations'

export default function resolver() {
  const client = createApolloClient() 

  return {
    Query: {
      async getListOrderDesign(_: any, { getListOrderDesignInput }, session: Session | null) {
        return await client.query({
          query: GETLISTORDERDESIGN,
          variables: { input: getListOrderDesignInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getListOrderDesign
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
      async createOrderDesign(_: any, { createOrderDesignInput }, session: Session | null) {
        return await client.mutate({
          mutation: CREATEORDERDESIGN,
          variables: { input: createOrderDesignInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.createOrderDesign
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async updateOrderDesign(_: any, { updateOrderDesignInput }, session: Session | null) {
        return await client.mutate({
          mutation: UPDATEORDERDESIGN,
          variables: { input: updateOrderDesignInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.updateOrderDesign
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async removeOrderDesign(_: any, { id }, session: Session | null) {
        return await client.mutate({
          mutation: DELETEORDERDESIGN,
          variables: { id, userId: session?.user.id },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.removeOrderDesign
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