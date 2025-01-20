import { GraphQLError } from 'graphql'
import { ReasonPhrases } from 'http-status-codes'
import { Session } from 'next-auth'
import createApolloClient from 'src/graphql/apollo-client'
import { GETCUSTOMERS } from 'src/graphql/customer/queries'
import { CREATECUSTOMER, UPDATECUSTOMER, DELETECUSTOMER } from 'src/graphql/customer/mutations'

export default function resolver() {
  const client = createApolloClient() 

  return {
    Query: {
      async getCustomers(_: any, { getCustomersInput }, session: Session | null) {
        return await client.query({
          query: GETCUSTOMERS,
          variables: { input: getCustomersInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getCustomers
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
      async createCustomer(_: any, { createCustomerInput }, session: Session | null) {
        return await client.mutate({
          mutation: CREATECUSTOMER,
          variables: { input: createCustomerInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.createCustomer
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async updateCustomer(_: any, { updateCustomerInput }, session: Session | null) {
        return await client.mutate({
          mutation: UPDATECUSTOMER,
          variables: { input: updateCustomerInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.updateCustomer
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async removeCustomer(_: any, { id }, session: Session | null) {
        return await client.mutate({
          mutation: DELETECUSTOMER,
          variables: { id, userId: session?.user.id },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.removeCustomer
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