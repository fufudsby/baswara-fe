import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import getServerSession from 'utils/getServerSession'

export const redirectAuthentication = async (context: NextPageContext) => {
  const session = await getServerSession(context.req as NextApiRequest, context.res as NextApiResponse)

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
