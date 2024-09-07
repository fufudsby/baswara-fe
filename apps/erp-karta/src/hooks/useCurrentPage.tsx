import React from 'react'
import { useRouter } from 'next/router'

const useCurrentPage = () => {
  const { asPath } = useRouter()

  const fixedAsPath = React.useMemo(() => {
    const parts = asPath.split('/')
    const newPath = parts[2] ? parts[2].split('?')[0] : ''
    return newPath
  }, [asPath])

  return fixedAsPath
}

export default useCurrentPage
