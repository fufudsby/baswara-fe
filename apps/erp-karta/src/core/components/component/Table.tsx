import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { isNumber, truncate, find } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { StyledBoxTable, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { SnackbarContext } from 'src/contexts/snackbar'
import { ComponentType } from 'src/validations/component/schemas'
import { DELETECOMPONENT } from 'src/graphql/component/mutations'

interface Props {
  typeId: number
  data: z.infer<typeof ComponentType>[]
  loading: boolean
  refetch: () => void
}

interface Column {
  id: 'no' | 'title' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: readonly Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'title', label: 'Bahan', minWidth: 400 },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

const TableComponent: React.FunctionComponent<Props> = ({
  typeId,
  data,
  loading,
  refetch,
}: Props) => {
  const { showSnackbar } = React.useContext(SnackbarContext)
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<z.infer<typeof ComponentType> | null>(null)

  const [mutationDeleteComponent, { loading: loadingDelete }] = useMutation(DELETECOMPONENT, {
    variables: { id: selected?.id },
    onCompleted: ({ removeComponent }) => {
      const { title } = removeComponent
      refetch()
      setOpen(false)
      setSelected(null)
      showSnackbar(<>Data <strong>{title}</strong> berhasil dihapus.</>)
    },
    onError: () => {
      showSnackbar('Terjadi kesalahan pada server.', 'error')
    },
  })

  const onDelete = React.useCallback(
    (id: number) => {
      const is_number = isNumber(id)
      if (!is_number) return
      const article = find(data, { id })
      setSelected(article || null)
      setOpen(true)
    },
    [data]
  )

  const onEdit = React.useCallback(async (id: number) => {
    await router.push(`/admin/components/update/[typeId]/[id]`, `/admin/components/update/${typeId}/${id}`)
  }, [])

  return (
    <StyledBoxTable>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <StyledTableCell
                key={i}
                component="th"
                align={column.align}
                className={`head ${column.id === 'aksi' ? 'sticky sticky-header' : ''} ${!i ? 'first' : ''}`}
                style={{ minWidth: column.minWidth, whiteSpace: 'nowrap' }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data?.length &&
            data.map((row, index) => {
              return (
                <StyledTableRow tabIndex={-1} key={index}>
                  {columns.map((column, i) => {
                    let value: any
                    if (column.id === 'aksi') {
                      value = (
                        <ButtonOptions
                          id={row.id || 0}
                          onEdit={(id) => onEdit(id)}
                          onDelete={onDelete}
                          justifyContent="center"
                        />
                      )
                    } else if (column.id === 'no') {
                      value = (
                        <Typography>{index + 1}</Typography>
                      )
                    } else {
                      value = <Typography>{row[column.id] ? row[column.id] : '-'}</Typography>
                    }
                    return (
                      <StyledTableCell
                        key={i}
                        align={column.align}
                        className={`${column.id === 'aksi' ? 'sticky' : ''} ${!i ? 'first' : ''}`}
                        sx={{
                          whiteSpace: i === 3 || i === 4 ? 'nowrap' : 'normal',
                        }}
                      >
                        {value}
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              )
            })}
          {!data?.length && (
            <StyledTableRow tabIndex={-1}>
              <StyledTableCell className="first" align="center" colSpan={7}>
                <Typography paddingY={3} sx={{ color: 'grey.500' }}>
                  {loading ? 'Loading ...' : 'Data tidak ditemukan'}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>

      <BackdropGlobal loading={loading || loadingDelete} withCircular={false} />
      <DialogDelete
        open={open}
        id={selected?.id || 0}
        title={selected && selected.title ? `"${truncate(selected.title, { length: 60 })}"` : ''}
        loading={loadingDelete}
        handleClose={() => setOpen(false)}
        handleDelete={() => mutationDeleteComponent()}
      />
    </StyledBoxTable>
  )
}

export default memo(TableComponent)
