import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import CurrencyFormat from 'react-currency-format'
import { useMutation } from '@apollo/client'
import { isNumber, find } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { EmptyState } from 'src/core/components/hpp/Table'
import { StyledBoxTable, StyledPagination, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { SnackbarContext } from 'src/contexts/snackbar'
import { OrderStatus, OrderDesign, formatOrderId } from 'src/validations/order-design/schemas'
import { DELETEPRODUCT } from 'src/graphql/product/mutations'

interface Props {
  data: z.infer<typeof OrderDesign>[]
  loading: boolean
  count: number
  page: number
  refetch: () => void
  setPage: (page: number) => void
}

interface Column {
  id: 'no' | 'orderId' | 'customer' | 'priceTotal' | 'operatorDesign' | 'cashier' | 'statusPaid' | 'status' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'orderId', label: 'No. Pesanan', minWidth: 250 },
  { id: 'customer', label: 'Konsumen', minWidth: 250 },
  { id: 'priceTotal', label: 'Total (Rp)', minWidth: 130, align: 'right' },
  { id: 'operatorDesign', label: 'Operator Desain', minWidth: 130 },
  { id: 'cashier', label: 'Kasir', minWidth: 130 },
  { id: 'statusPaid', label: 'Keterangan', minWidth: 130 },
  { id: 'status', label: 'Status', minWidth: 130 },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

const TableOrderDesign: React.FunctionComponent<Props> = ({
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
  const [selected, setSelected] = React.useState<z.infer<typeof OrderDesign> | null>(null)
  const [mutationDeleteProduct, { loading: loadingDelete }] = useMutation(DELETEPRODUCT, {
    variables: { id: selected?.id },
    onCompleted: ({ removeProduct }) => {
      const { title } = removeProduct
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
    await router.push(`/admin/order-design/update/[typeId]/[id]`, `/admin/order-design/update/${id}`)
  }, [])

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
                        } else if (column.id === 'orderId') {
                          value = (
                            <Typography>KRT{formatOrderId(row[column.id].toString())}</Typography>
                          )
                        } else if (column.id === 'customer') {
                          value = (
                            <Typography>{row[column.id].name}</Typography>
                          )
                        } else if (column.id === 'operatorDesign' || column.id === 'cashier') {
                          value = (
                            <Typography>{row[column.id]?.username || '-'}</Typography>
                          )
                        } else if (column.id === 'statusPaid') {
                          value = (
                            <Typography>{row[column.id] ? 'LUNAS' : 'BELUM LUNAS'}</Typography>
                          )
                        } else if (column.id === 'status') {
                          value = (
                            <Typography>{row['statusPaid'] ? OrderStatus[row[column.id]] : '-'}</Typography>
                          )
                        } else if (column.id === 'priceTotal') {
                          let priceTotal = 0
                          row.orderDesignDetail?.forEach((item) => {
                            priceTotal = priceTotal + (item?.product?.priceDpp || 0)
                          })
                          value = <Typography align="right">
                            {<CurrencyFormat value={priceTotal} displayType="text" thousandSeparator={true} prefix={'Rp'} />}
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
        title={selected?.orderId.toString() || ''}
        loading={loadingDelete}
        handleClose={() => setOpen(false)}
        handleDelete={() => mutationDeleteProduct()}
      />
    </StyledBoxTable>
  )
}

export default memo(TableOrderDesign)
