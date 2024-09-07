import React, { memo } from 'react'
import { Box, Button } from '@mui/material'
import { ReactSVG } from 'react-svg'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { StyledSidebar, StyledListMenu, StyledSignOut } from 'src/styles/sidebar'
import AvatarTitle from 'src/core/components/Avatar'
import IconButtonRounded from 'src/core/components/IconButtonRounded'
import { SnackbarContext } from 'src/contexts/snackbar'
import { AccountContext } from 'src/contexts/account'
import useCurrentPage from 'src/hooks/useCurrentPage'
import { GETCURRENTUSER } from 'src/graphql/auth/queries'

interface Props {}

interface PropsButton {
  text: string
  href: string
  icon: string
}

const ComponentButton = React.memo((props: PropsButton) => {
  const { text, href, icon } = props
  const current = useCurrentPage()
  return (
    <Box className={`item ${current === href ? 'active' : ''}`}>
      <IconButtonRounded href={`/admin/${href}`}>
        <ReactSVG
          beforeInjection={(svg) => {
            svg.classList.add(`svg-icon`)
            svg.setAttribute('style', `display: block;`)
          }}
          className={`wrapper-svg`}
          src={`/images/icons/${icon}.svg`}
          wrapper="div"
        />
      </IconButtonRounded>
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
  const { data } = useQuery(GETCURRENTUSER)
  const { showSnackbar } = React.useContext(SnackbarContext)
  const { account, setAccount } = React.useContext(AccountContext)
  const onSignOut = React.useCallback(async () => {
    await signOut({ redirect: false })
    await router
      .replace('https://admin.surabaya.go.id', 'https://admin.surabaya.go.id', {
        unstable_skipClientCache: true,
      })
      .then(() => router.reload())
  }, [])
  console.log('ddd', account)
  React.useEffect(() => {
    // eslint-disable-next-line
    if (!account && data && data.getCurrentUser) {
      setAccount({
        email: data.getCurrentUser?.email,
        username: data.getCurrentUser?.username,
      })
    }
  }, [data])
  return (
    <StyledSidebar className="sidebar">
      <AvatarTitle user={account} />
      <StyledListMenu>
        <ComponentButton icon="berita" text="Berita" href="news" />
        <ComponentButton icon="halaman" text="Infografis" href="infographic" />
        <StyledSignOut>
          <IconButtonRounded onClick={onSignOut} reverse>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add(`svg-icon`)
                svg.setAttribute('style', `display: block;`)
              }}
              className={`wrapper-svg`}
              src={`/images/icons/keluar-akun.svg`}
              wrapper="div"
            />
          </IconButtonRounded>
          <Button className="text-button" onClick={onSignOut} component="a" disableRipple>
            Keluar
          </Button>
        </StyledSignOut>
      </StyledListMenu>
    </StyledSidebar>
  )
}

export default memo(Sidebar)
