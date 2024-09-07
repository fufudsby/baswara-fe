import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import createApolloClient from 'src/graphql/apollo-client'
import { SIGNIN } from 'src/graphql/auth/signIn'

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}&remoteip=`,
  })
  const data = await response.json()
  return data?.success || false
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@email.com' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        if (credentials) {
          const { email, password, token } = credentials
          const response = await verifyRecaptcha(token)

          if (response) {
            const client = createApolloClient()
            return await client.mutate({
              mutation: SIGNIN,
              variables: {
                input: {
                  email,
                  password,
                },
              },
            }).then(({ data }) => {
              return {
                id: data.signin.user.id,
                name: data.signin.user.username,
                email: data.signin.user.email,
                role: data.signin.user.roleType,
                token: data.signin.accessToken,
              }
            }).catch((error) => {
              console.log('error', error)
              return null
            })
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token
      return session
    },
    async signIn() {
      return true
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  pages: {
    signIn: '/',
  },
}

export default NextAuth(authOptions)
