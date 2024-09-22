import React, { memo } from 'react'
import { Avatar, Typography } from '@mui/material'
import Link from 'next/link'
import { upperCase, truncate } from 'lodash'
import { StyledAvatar } from 'src/styles/sidebar'
import { z } from 'zod'
import { User } from 'src/validations/user/schemas'

interface Props {
  user?: z.infer<typeof User> | null
}

function stringAvatar(name: string) {
  const split = name?.split(' ')[0]
  return {
    children: upperCase(split?.split('')[0]),
  }
}

const AvatarTitle: React.FunctionComponent<Props> = ({ user }: Props) => {
  return (
    <StyledAvatar className="avatar">
      <Link href="/admin/account" legacyBehavior passHref>
        <Avatar
          className="letter"
          component="a"
          {...stringAvatar(user?.username || 'A')}
          src=""
        />
      </Link>
      <Typography className="intro">Akun Anda</Typography>
      <Link href="/admin/account" legacyBehavior passHref>
        <Typography component="a">
          <strong>{truncate(user?.username, { length: 22 }) || '-'}</strong>
        </Typography>
      </Link>
      <Typography className="role">{'Admin'}</Typography>
    </StyledAvatar>
  )
}

export default memo(AvatarTitle)
