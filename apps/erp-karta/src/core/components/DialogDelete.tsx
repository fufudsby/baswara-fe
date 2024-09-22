import React, { memo } from 'react'
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { isNumber } from 'lodash'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import ButtonMain from 'src/core/components/ButtonMain'
import { StyledDeleteDialog } from 'src/styles/app'

interface Props {
  open: boolean
  id: number
  title: string
  loading: boolean
  handleClose: () => void
  handleDelete: (id: number | null) => void
}

const DialogDelete: React.FunctionComponent<Props> = ({
  open,
  id,
  title,
  loading,
  handleClose,
  handleDelete,
}: Props) => {
  return (
    <StyledDeleteDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Konfirmasi Hapus Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah Anda yakin ingin menghapus data {!!title && <strong>{title} </strong>}?
        </DialogContentText>
        <small>
          Hati - hati sebelum melakukan penghapusan data, cek kembali data yang ingin dihapus.
        </small>
      </DialogContent>
      <DialogActions>
        <ButtonMain text="Kembali" color="info" onClick={handleClose} loading={loading} />
        <ButtonMain
          text="Hapus"
          color="error"
          onClick={() => handleDelete(isNumber(id) ? id : null)}
          loading={loading}
        />
      </DialogActions>
      <BackdropGlobal loading={loading} />
    </StyledDeleteDialog>
  )
}

export default memo(DialogDelete)
