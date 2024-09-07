import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export const redirectAuthentication = async (context: NextPageContext) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
