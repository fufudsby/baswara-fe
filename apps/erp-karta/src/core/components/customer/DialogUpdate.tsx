import React, { memo } from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import { z } from 'zod'
import { StyledDialog } from 'src/styles/app'
import { Customer } from 'src/validations/customer/schemas'
import Form from 'src/core/components/customer/Form'

interface Props {
  refetch: () => void
  onClose: () => void
  onSuccess?: () => void
  data?: z.infer<typeof Customer>
}

export interface RefProps {
  setOpen: (open: boolean) => void
}

const DialogUpdateCustomer = React.forwardRef<RefProps, Props>(({ data, refetch, onClose, onSuccess }, ref) => {
  const [open, setOpen] = React.useState(false)
  React.useImperativeHandle(ref, () => ({
    setOpen,
  }))

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Konfirmasi Hapus Data</DialogTitle>
      <Form
        isDialog
        refetch={refetch}
        data={data || undefined}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </StyledDialog>
  )
})

export default memo(DialogUpdateCustomer)
