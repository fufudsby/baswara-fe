import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography, Box } from '@mui/material'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import { isNumber, find } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { EmptyState } from 'src/core/components/hpp/Table'
import { StyledBoxTable, StyledPagination, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { SnackbarContext } from 'src/contexts/snackbar'
import { Customer } from 'src/validations/customer/schemas'
import { DELETECUSTOMER } from 'src/graphql/customer/mutations'

interface Props {
  data: z.infer<typeof Customer>[]
  loading: boolean
  count: number
  page: number
  refetch: () => void
  setPage: (page: number) => void
  setEdit: (data: z.infer<typeof Customer>) => void
}

interface Column {
  id: 'no' | 'name' | 'phone' | 'address' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'name', label: 'Nama Konsumen', minWidth: 250 },
  { id: 'phone', label: 'No. Telepon', minWidth: 150 },
  { id: 'address', label: 'Alamat', minWidth: 250 },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

const TableCustomer: React.FunctionComponent<Props> = ({
  data,
  loading,
  count,
  page,
  refetch,
  setPage,
  setEdit,
}: Props) => {
  const { showSnackbar } = React.useContext(SnackbarContext)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<z.infer<typeof Customer> | null>(null)
  const [mutationDeleteCustomer, { loading: loadingDelete }] = useMutation(DELETECUSTOMER, {
    variables: { id: selected?.id },
    onCompleted: ({ removeCustomer }) => {
      const { name } = removeCustomer
      refetch()
      setOpen(false)
      setSelected(null)
      showSnackbar(<>Data <strong>{name}</strong> berhasil dihapus.</>)
    },
    onError: () => {
      showSnackbar('Terjadi kesalahan pada server.', 'error')
    },
  })

  const onDelete = React.useCallback(
    (id: number) => {
      const is_number = isNumber(id)
      if (!is_number) return
      const findData = find(data, { id })
      setSelected(findData || null)
      setOpen(true)
    },
    [data]
  )
  console.log('xxx', page)
  return (
    <StyledBoxTable>
      <Box sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <StyledTableCell
                  key={i}
                  component="th"
                  align={column.id === 'aksi' ? column.align : 'left'}
                  className={`head ${column.id === 'aksi' ? 'sticky sticky-header' : ''} ${!i ? 'first' : ''}`}
                  style={{ minWidth: column.minWidth, whiteSpace: 'nowrap' }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <EmptyState text="Loading ..." />
            ) : (
              <>
                {!!data?.length && data.map((row, index) => {
                  return (
                    <StyledTableRow tabIndex={-1} key={index}>
                      {columns.map((column, i) => {
                        let value: any
                        if (column.id === 'aksi') {
                          value = (
                            <ButtonOptions
                              id={row.id || 0}
                              onEdit={() => {
                                setEdit(row)
                              }}
                              onDelete={onDelete}
                              justifyContent="center"
                            />
                          )
                        } else if (column.id === 'no') {
                          value = (
                            <Typography>{((page - 1) * 10) + (index + 1)}</Typography>
                          )
                        } else {
                          value = <Typography align={column.align || 'left'}>
                            {row[column.id] ? row[column.id] : isNumber(row[column.id]) ? '0' : '-'}
                            </Typography>
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
              </>
            )}

            {!loading && !data?.length && (
              <EmptyState text="Data tidak ditemukan" />
            )}
          </TableBody>
        </Table>
      </Box>

      {count > 1 && (
        <StyledPagination
          count={count}
          page={page}
          shape="rounded"
          onChange={(_e: React.ChangeEvent<unknown>, page: number) => setPage(page)}
          showFirstButton
          showLastButton
        />
      )}

      <BackdropGlobal loading={loading || loadingDelete} withCircular={false} />
      <DialogDelete
        open={open}
        id={selected?.id || 0}
        title={selected && selected.name ? `"${selected.name}"` : ''}
        loading={loadingDelete}
        handleClose={() => setOpen(false)}
        handleDelete={() => mutationDeleteCustomer()}
      />
    </StyledBoxTable>
  )
}

export default memo(TableCustomer)
