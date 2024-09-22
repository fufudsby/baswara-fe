import React, { memo } from 'react'
import { Table, TableHead, TableBody, TableRow, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { z } from 'zod'
import CurrencyFormat from 'react-currency-format'
import { useMutation } from '@apollo/client'
import { isNumber, truncate, find, includes } from 'lodash'
import ButtonOptions from 'src/core/components/ButtonOptions'
import BackdropGlobal from 'src/core/components/BackdropGlobal'
import DialogDelete from 'src/core/components/DialogDelete'
import { StyledBoxTable, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { SnackbarContext } from 'src/contexts/snackbar'
import { Hpp } from 'src/validations/hpp/schemas'
import { DELETEGOODS } from 'src/graphql/goods/mutations'

/**
 * Type ID
 * 1 = Tinta
 * 3 = Mesin cetak
 * 5 = Jasa potong digital
 * 8 = Jasa potong manual
 */
interface Props {
  typeId: number
  data: z.infer<typeof Hpp>[]
  loading: boolean
  refetch: () => void
}

interface Column {
  id: 'no' | 'title' | 'area' | 'unit' | 'printer' | 'hpp' | 'priceRoll' | 'priceCutter' | 'pricePrintHead' | 'priceInk' | 'unitInk' | 'aksi'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'no', label: 'No.', minWidth: 60 },
  { id: 'title', label: 'Bahan', minWidth: 250 },
  { id: 'printer', label: 'Mesin', minWidth: 250 }, // Custom
  { id: 'priceInk', label: 'Tinta/CC (Rp)', minWidth: 130 },
  { id: 'priceRoll', label: 'Roll (Rp)', minWidth: 130 },
  { id: 'priceCutter', label: 'Pisau (Rp)', minWidth: 130 },
  { id: 'pricePrintHead', label: 'Print Head (Rp)', minWidth: 150 },
  { id: 'area', label: 'Area', minWidth: 130 },
  { id: 'unit', label: 'Satuan', minWidth: 130 }, // Custom
  { id: 'unitInk', label: 'Tinta/M2', minWidth: 130 },
  { id: 'hpp', label: 'HPP (Rp)', minWidth: 130, align: 'right' },
  { id: 'aksi', label: 'Aksi', align: 'center', minWidth: 70 },
]

function typeColumnsFunction(typeId: number) {
  const printerColumns = ['priceRoll', 'priceCutter', 'pricePrintHead']
  const inkColumns = ['priceInk', 'unitInk']
  const removeColumns = ['printer']
  switch (typeId) {
    case 1: {
      const filterColumns = columns.filter((item) => !includes([...removeColumns, ...printerColumns], item.id))

      return filterColumns.map((item) => {
        if (item.id === 'title') return { ...item, label: 'Tinta' }
        if (item.id === 'area') return { ...item, label: 'Area Cetak' }
        return item
      })
    }
    case 3: {
      const filterColumns = columns.filter((item) => !includes(inkColumns, item.id))

      return filterColumns.map((item) => {
        if (item.id === 'title') return { ...item, label: 'Cetak' }
        return item
      })
    }
    default: {
      const filterColumns = columns.filter((item) => !includes([...inkColumns, ...printerColumns, ...removeColumns], item.id))
      return filterColumns
    }
  }
}

const TableHpp: React.FunctionComponent<Props> = ({
  typeId,
  data,
  loading,
  refetch,
}: Props) => {
  const { showSnackbar } = React.useContext(SnackbarContext)
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<z.infer<typeof Hpp> | null>(null)
  const typeColumns = React.useMemo(() => typeColumnsFunction(typeId), [typeId])
  const [mutationDeleteGoods, { loading: loadingDelete }] = useMutation(DELETEGOODS, {
    variables: { id: selected?.id },
    onCompleted: ({ removeGoods }) => {
      const { title } = removeGoods
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
    await router.push(`/admin/goods/update/[typeId]/[id]`, `/admin/goods/update/${typeId}/${id}`)
  }, [])

  return (
    <StyledBoxTable>
      <Box sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {typeColumns.map((column, i) => (
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
            {!!data?.length &&
              data.map((row, index) => {
                return (
                  <StyledTableRow tabIndex={-1} key={index}>
                    {typeColumns.map((column, i) => {
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
                      } else if (column.id === 'printer') {
                        /**
                         * ID componentType = 2 adalah Mesin (di table ComponentType)
                         */
                        const findValue = find(row.components, (componentValue) => componentValue.componentType?.id === 2)
                        value = (
                          <Typography>{findValue?.title || '-'}</Typography>
                        )
                      } else if (column.id === 'unit') {
                        /**
                         * ID componentType = 1 adalah Satuuan (di table ComponentType)
                         */
                        const findValue = find(row.components, (componentValue) => componentValue.componentType?.id === 1)
                        value = (
                          <Typography>{findValue?.title || '-'}</Typography>
                        )
                      } else if (column.id === 'hpp' || column.id === 'priceCutter' || column.id === 'priceRoll' || column.id === 'pricePrintHead' || column.id === 'priceInk') {
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
      </Box>

      <BackdropGlobal loading={loading || loadingDelete} withCircular={false} />
      <DialogDelete
        open={open}
        id={selected?.id || 0}
        title={selected && selected.title ? `"${truncate(selected.title, { length: 60 })}"` : ''}
        loading={loadingDelete}
        handleClose={() => setOpen(false)}
        handleDelete={() => mutationDeleteGoods()}
      />
    </StyledBoxTable>
  )
}

export default memo(TableHpp)
