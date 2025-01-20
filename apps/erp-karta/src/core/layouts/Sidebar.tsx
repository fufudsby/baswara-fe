import React, { memo } from 'react'
import { Box, Button, Collapse } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { StyledSidebar, StyledListMenu, StyledSignOut } from 'src/styles/sidebar'
import AvatarTitle from 'src/core/components/Avatar'
import { AccountContext } from 'src/contexts/account'
import useCurrentPage from 'src/hooks/useCurrentPage'
import { GETCURRENTUSER } from 'src/graphql/auth/queries'

interface Props {}

interface PropsButton {
  text: string
  href: string
}

const ComponentButton = React.memo((props: PropsButton) => {
  const { text, href } = props
  const current = useCurrentPage()
  return (
    <Box className={`item ${current === href ? 'active' : ''}`}>
      <Link href={`/admin/${href}`} legacyBehavior passHref>
        <Button className="text-button" component="a" disableRipple>
          {text}
        </Button>
      </Link>
    </Box>
  )
})

const Sidebar: React.FunctionComponent<Props> = () => {
  const router = useRouter()
  const { data, loading } = useQuery(GETCURRENTUSER)
  const { account, setAccount, setIsLoading } = React.useContext(AccountContext)
  const [open, setOpen] = React.useState<number | null>(1)
  
  const onSignOut = React.useCallback(async () => {
    await signOut({ redirect: false })
    await router
      .replace('/', '/', {
        unstable_skipClientCache: true,
      })
      .then(() => router.reload())
  }, [])

  React.useEffect(() => {
    // eslint-disable-next-line
    if (!account && data && data.getCurrentUser) {
      setAccount({
        email: data.getCurrentUser?.email,
        username: data.getCurrentUser?.username,
      })
    }
  }, [data])

  React.useEffect(() => {
    if (!loading) {
      setIsLoading(false)
    }
  }, [loading])

  const avatar = React.useMemo(() => {
    return (
      <AvatarTitle user={account} />
    )
  }, [account])
  return (
    <StyledSidebar className="sidebar">
      {avatar}
      <StyledListMenu>
        <Box className="item">
          <Button
            className="text-button head-button"
            endIcon={<ExpandMore />}
            disableRipple
            onClick={() => setOpen(2)}
          >
            Operator
          </Button>
        </Box>
        <Collapse in={open === 2} timeout="auto" unmountOnExit>
          <ComponentButton text="Operator Desain" href="operator-design" />
        </Collapse>
        <Box className="item">
          <Button
            className="text-button head-button"
            endIcon={<ExpandMore />}
            disableRipple
            onClick={() => setOpen(1)}
          >
            Daftar
          </Button>
        </Box>
        <Collapse in={open === 1} timeout="auto" unmountOnExit>
          <ComponentButton text="Harga Jual Produk" href="products" />
          <ComponentButton text="Harga Jual Finishing" href="finishing" />
          <ComponentButton text="HPP" href="hpp" />
          <ComponentButton text="Komponen" href="components" />
          <ComponentButton text="Konsumen" href="customers" />
          <ComponentButton text="Barang" href="goods" />
        </Collapse>
        <StyledSignOut>
          <Button className="text-button" onClick={onSignOut} component="a" disableRipple>
            Keluar
          </Button>
        </StyledSignOut>
      </StyledListMenu>
    </StyledSidebar>
  )
}

export default memo(Sidebar)
