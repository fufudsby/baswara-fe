import { GraphQLError } from 'graphql'
import { ReasonPhrases } from 'http-status-codes'
import { Session } from 'next-auth'
import createApolloClient from 'src/graphql/apollo-client'
import { GETFINISHINGS } from 'src/graphql/finishing/queries'
import { CREATEFINISHING, UPDATEFINISHING, DELETEFINISHING } from 'src/graphql/finishing/mutations'

export default function resolver() {
  const client = createApolloClient() 

  return {
    Query: {
      async getFinishings(_: any, { getFinishingsInput }, session: Session | null) {
        return await client.query({
          query: GETFINISHINGS,
          variables: { input: getFinishingsInput },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.getFinishings
        }).catch(({ cause }) => {
          console.log('cause', cause)
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
      async createFinishing(_: any, { createFinishingInput }, session: Session | null) {
        return await client.mutate({
          mutation: CREATEFINISHING,
          variables: {
            input: {
              ...createFinishingInput,
              log: `DPP: ${createFinishingInput.priceDpp}, PPN: ${process.env.NEXT_PUBLIC_PPN}%, PPH: ${process.env.NEXT_PUBLIC_PPH}%, PPH FINAL: ${process.env.NEXT_PUBLIC_PPH_FINAL}%`,
            },
          },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.createFinishing
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async updateFinishing(_: any, { updateFinishingInput }, session: Session | null) {
        return await client.mutate({
          mutation: UPDATEFINISHING,
          variables: {
            input: {
              ...updateFinishingInput,
              log: `DPP: ${updateFinishingInput.priceDpp}, PPN: ${process.env.NEXT_PUBLIC_PPN}%, PPH: ${process.env.NEXT_PUBLIC_PPH}%, PPH FINAL: ${process.env.NEXT_PUBLIC_PPH_FINAL}%`,
            },
          },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.updateFinishing
        }).catch(({ cause }) => {
          throw new GraphQLError(cause?.message || ReasonPhrases.BAD_REQUEST, {
            extensions: {
              code: cause?.extensions?.code || ReasonPhrases.BAD_REQUEST,
              originalError: cause?.extensions?.originalError || null,
            },
          })
        })
      },
      async removeFinishing(_: any, { id }, session: Session | null) {
        return await client.mutate({
          mutation: DELETEFINISHING,
          variables: { id, userId: session?.user.id },
          context: {
            headers: {
            'Authorization': `Bearer ${session?.user?.token}` || '',
            },
          },
        }).then(({ data }) => {
          return data.removeFinishing
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