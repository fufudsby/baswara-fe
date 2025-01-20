import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import CurrencyFormat from 'react-currency-format'
import { useMutation } from '@apollo/client'
import { isNumber, truncate, find } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { EmptyState } from 'src/core/components/hpp/Table'
import { StyledBoxTable, StyledPagination, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { SnackbarContext } from 'src/contexts/snackbar'
import { Finishing } from 'src/validations/finishing/schemas'
import { DELETEFINISHING } from 'src/graphql/finishing/mutations'

interface Props {
  typeId: number
  data: z.infer<typeof Finishing>[]
  loading: boolean
  count: number
  page: number
  refetch: () => void
  setPage: (page: number) => void
}

interface Column {
  id: 'no' | 'title' | 'priceDpp' | 'unit' | 'description' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'title', label: 'Bahan', minWidth: 250 },
  { id: 'priceDpp', label: 'Harga Jual (Rp)', minWidth: 130, align: 'right' },
  { id: 'unit', label: 'Satuan', minWidth: 130 },
  { id: 'description', label: 'Catatan', minWidth: 130 },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

const TableFinishing: React.FunctionComponent<Props> = ({
  typeId,
  data,
  loading,
  count,
  page,
  refetch,
  setPage,
}: Props) => {
  const { showSnackbar } = React.useContext(SnackbarContext)
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<z.infer<typeof Finishing> | null>(null)
  const [mutationDeleteFinishing, { loading: loadingDelete }] = useMutation(DELETEFINISHING, {
    variables: { id: selected?.id },
    onCompleted: ({ removeFinishing }) => {
      const { title } = removeFinishing
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
      const findData = find(data, { id })
      setSelected(findData || null)
      setOpen(true)
    },
    [data]
  )

  const onEdit = React.useCallback(async (id: number) => {
    await router.push(`/admin/finishing/update/[typeId]/[id]`, `/admin/finishing/update/${typeId}/${id}`)
  }, [typeId])

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
                              onEdit={(id) => onEdit(id)}
                              onDelete={onDelete}
                              justifyContent="center"
                            />
                          )
                        } else if (column.id === 'no') {
                          value = (
                            <Typography>{index + 1}</Typography>
                          )
                        } else if (column.id === 'unit') {
                          value = (
                            <Typography>{row[column.id]?.title || '-'}</Typography>
                          )
                        } else if (column.id === 'priceDpp') {
                          value = <Typography align="right">
                            {<CurrencyFormat value={row[column.id]} displayType="text" thousandSeparator={true} prefix={'Rp'} />}
                            </Typography>
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
        title={selected && selected.title ? `"${truncate(selected.title, { length: 60 })}"` : ''}
        loading={loadingDelete}
        handleClose={() => setOpen(false)}
        handleDelete={() => mutationDeleteFinishing()}
      />
    </StyledBoxTable>
  )
}

export default memo(TableFinishing)
