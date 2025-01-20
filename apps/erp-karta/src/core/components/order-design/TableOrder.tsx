import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography, Box } from '@mui/material'
import { z } from 'zod'
import CurrencyFormat from 'react-currency-format'
import { isNumber, find } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { EmptyState } from 'src/core/components/hpp/Table'
import { StyledBoxTable, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { OrderDesignProduct, OrderDesignFinishing } from 'src/validations/order-design/schemas'
import { FormikContext } from 'src/contexts/formik'
import { Value } from 'src/core/components/formik/Select'

export interface OrderProduct {
  id: number
  product: z.infer<typeof OrderDesignProduct> | null
  size: {
    width: number
    length: number
  }
  lamination: z.infer<typeof OrderDesignFinishing> | null
  cuttingDigital: z.infer<typeof OrderDesignFinishing> | null
  cuttingManual: z.infer<typeof OrderDesignFinishing> | null
  folder: string
  file: string
  description: string
  quantity: number
  price: number
}

interface Props {
  data: OrderProduct[]
  setData: React.Dispatch<React.SetStateAction<OrderProduct[]>>
  setOpenForm: () => void
  setProductSelected?: React.Dispatch<React.SetStateAction<z.infer<typeof OrderDesignProduct> | null>>
}

export interface RefProps {}

interface Column {
  id: 'no' | 'product' | 'size' | 'lamination' | 'cuttingDigital' | 'cuttingManual' | 'folder' | 'file' | 'description' | 'quantity' | 'price' | 'subTotal' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'product', label: 'Produk', minWidth: 250 },
  { id: 'size', label: 'Ukuran', minWidth: 200 },
  { id: 'lamination', label: 'Laminasi', minWidth: 200 },
  { id: 'cuttingDigital', label: 'Potong Digital', minWidth: 200 },
  { id: 'folder', label: 'Folder', minWidth: 200 },
  { id: 'file', label: 'File', minWidth: 200 },
  { id: 'description', label: 'Catatan', minWidth: 200 },
  { id: 'quantity', label: 'Jumlah', minWidth: 100 },
  { id: 'price', label: 'Harga Satuan (Rp)', minWidth: 200, align: 'right' },
  { id: 'subTotal', label: 'Sub Total (Rp)', minWidth: 200, align: 'right' },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

const TableOrderDesignList = React.forwardRef<RefProps, Props>(({ data, setData, setOpenForm, setProductSelected }, ref) => {
  const { formik } = React.useContext(FormikContext)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<OrderProduct | null>(null)

  React.useImperativeHandle(ref, () => ({}))

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

  const onEdit = React.useCallback(async (item: OrderProduct) => {
    const { id } = item
    const findData = find(data, { id })
    if (findData) {
      await formik?.setFieldValue('editOrderMode', true)
      await formik?.setFieldValue('productId', findData.product?.id || '')
      await formik?.setFieldValue('width', findData.size?.width || '')
      await formik?.setFieldValue('length', findData.size?.length || '')
      await formik?.setFieldValue('quantity', findData.quantity || '')
      await formik?.setFieldValue('fileName', findData.file || '')
      await formik?.setFieldValue('folderName', findData.folder || '')
      await formik?.setFieldValue('description', findData.description || '')
      await formik?.setFieldValue('cuttingDigitalId', findData.cuttingDigital?.id || '')
      await formik?.setFieldValue('cuttingManualId', findData.cuttingManual?.id || '')
      await formik?.setFieldValue('laminationId', findData.lamination?.id || '')
      if (setProductSelected) {
        setProductSelected(item.product)
      }
      setOpenForm()
    }
  }, [data, setProductSelected])

  const handleDeleteOrder = React.useCallback(async (id: number) => {
    setData((values) => values.filter((item) => item.id !== id))
    setOpen(false)
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
            {!!data?.length && data.map((row, index) => {
              return (
                <StyledTableRow tabIndex={-1} key={index}>
                  {columns.map((column, i) => {
                    let value: any
                    if (column.id === 'aksi') {
                      value = (
                        <ButtonOptions
                          id={row.id || 0}
                          onEdit={(id) => onEdit(row)}
                          onDelete={onDelete}
                          justifyContent="center"
                        />
                      )
                    } else if (column.id === 'product' || column.id === 'lamination' || column.id === 'cuttingDigital' || column.id === 'cuttingManual') {
                      value = (
                        <Typography>{row[column.id]?.title || '-'}</Typography>
                      )
                    } else if (column.id === 'size') {
                      value = (
                        <Typography>{row[column.id]?.width}</Typography>
                      )
                    } else if (column.id === 'no') {
                      value = (
                        <Typography>{index + 1}</Typography>
                      )
                    } else if (column.id === 'price' || column.id === 'subTotal') {
                      let priceTotal = 0
                      value = (
                        <Typography align="right">
                          {<CurrencyFormat value={priceTotal} displayType="text" thousandSeparator={true} prefix={'Rp'} />}
                        </Typography>
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

            {!data?.length && (
              <EmptyState text="Data tidak ditemukan" colSpan={12} />
            )}
          </TableBody>
        </Table>
      </Box>

      <BackdropGlobal loading={false} withCircular={false} />
      <DialogDelete
        open={open}
        id={selected?.id || 0}
        title={selected?.product?.title || ''}
        loading={false}
        handleClose={() => setOpen(false)}
        handleDelete={handleDeleteOrder}
      />
    </StyledBoxTable>
  )
})

export default memo(TableOrderDesignList)
