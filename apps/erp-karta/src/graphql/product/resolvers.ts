import { GraphQLError } from 'graphql'
import { ReasonPhrases } from 'http-status-codes'
import { Session } from 'next-auth'
import createApolloClient from 'src/graphql/apollo-client'
import { GETALLPRODUCTS, GETPRODUCTS } from 'src/graphql/product/queries'
import { CREATEPRODUCT, UPDATEPRODUCT, DELETEPRODUCT } from 'src/graphql/product/mutations'

export default function resolver() {
  const client = createApolloClient() 

  return {
    Query: {
      async getProducts(_: any, { getProductsInput }, session: Session | null) {
        return await client.query({
          query: GETPRODUCTS,
          variables: { input: getProductsInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getProducts
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async getAllProducts(_: any, { getAllProductsInput }, session: Session | null) {
        return await client.query({
          query: GETALLPRODUCTS,
          variables: { input: getAllProductsInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getAllProducts
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
      async createProduct(_: any, { createProductInput }, session: Session | null) {
        return await client.mutate({
          mutation: CREATEPRODUCT,
          variables: {
            input: {
              ...createProductInput,
              log: `DPP: ${createProductInput.priceDpp}, PPN: ${process.env.NEXT_PUBLIC_PPN}%, PPH: ${process.env.NEXT_PUBLIC_PPH}%, PPH FINAL: ${process.env.NEXT_PUBLIC_PPH_FINAL}%`,
            },
          },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.createProduct
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async updateProduct(_: any, { updateProductInput }, session: Session | null) {
        return await client.mutate({
          mutation: UPDATEPRODUCT,
          variables: {
            input: {
              ...updateProductInput,
              log: `DPP: ${updateProductInput.priceDpp}, PPN: ${process.env.NEXT_PUBLIC_PPN}%, PPH: ${process.env.NEXT_PUBLIC_PPH}%, PPH FINAL: ${process.env.NEXT_PUBLIC_PPH_FINAL}%`,
            },
          },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.updateProduct
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async removeProduct(_: any, { id }, session: Session | null) {
        return await client.mutate({
          mutation: DELETEPRODUCT,
          variables: { id, userId: session?.user.id },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.removeProduct
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