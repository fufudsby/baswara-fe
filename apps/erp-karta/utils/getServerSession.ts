import { Session } from 'next-auth'
import { getServerSession as getSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

const getServerSession = async (req: NextApiRequest, res: NextApiResponse): Promise<Session | null> => {
  return await getSession(req, res, authOptions)
}

export default getServerSession