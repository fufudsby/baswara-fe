import { Session } from 'next-auth'

export default function resolver() {
  return {
    Query: {
      async getCurrentUser(_: any, {}, session: Session | null) {
        return !!session?.user ? {
          id: session?.user.id,
          email: session?.user.email,
          username: session?.user.name,
        } : null
      },
    },
  }
}