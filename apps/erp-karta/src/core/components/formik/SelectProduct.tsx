import React, { memo } from 'react'
import { Box, DialogTitle, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material'
import CurrencyFormat from 'react-currency-format'
import { z } from 'zod'
import { useQuery as useQueryApollo } from '@apollo/client'
import { isNumber, pick } from 'lodash'
import { ReactSVG } from 'react-svg'
import FormikField from 'src/core/components/formik/Field'
import { StyledDialogSelect } from 'src/styles/select'
import { FormikContext } from 'src/contexts/formik'
import { SearchComponent } from 'src/core/components/formik/Select'
import { Product } from 'src/validations/product/schemas'
import { StyledBoxTable, StyledTableCell, StyledTableRow } from 'src/styles/table'
import { EmptyState } from 'src/core/components/hpp/Table'
import { GETALLPRODUCTS } from 'src/graphql/product/queries'
import { OrderDesignProduct } from 'src/validations/order-design/schemas'

interface Props {
  selected: z.infer<typeof OrderDesignProduct> | null,
  setSelected: React.Dispatch<React.SetStateAction<z.infer<typeof OrderDesignProduct> | null>>
}

export interface RefProps {
  setOpen: (open: boolean) => void
}

interface Column {
  id: 'title' | 'priceDpp' | 'unit' | 'description' | 'checked'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
}

const columns: Column[] = [
  { id: 'title', label: 'Nama Produk', minWidth: 250 },
  { id: 'priceDpp', label: 'Harga Jual (Rp)', minWidth: 130, align: 'right' },
  { id: 'unit', label: 'Satuan', minWidth: 70 },
  { id: 'description', label: 'Catatan', minWidth: 250 },
  { id: 'checked', label: '', minWidth: 50 },
]

const FormikSelectProduct = React.forwardRef<RefProps, Props>(({ selected, setSelected }, ref) => {
  const { formik } = React.useContext(FormikContext)

  const [open, setOpen] = React.useState(false)
  const [loadingSearch, setLoadingSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const { data } = useQueryApollo(GETALLPRODUCTS, { variables: {
    input: { limit: 10, search },
  }})
  
  React.useImperativeHandle(ref, () => ({
    setOpen,
  }))

  const handleClickButton = React.useCallback((item: z.infer<typeof Product>) => {
    formik?.setFieldValue('productId', item.id)
    setSelected(pick(item, ['id', 'title', 'priceDpp', 'unit']))
    setOpen(false)
  }, [])

  React.useEffect(() => {
    setLoadingSearch(true)
    const delayDebounceFn = setTimeout(() => {
      setSearch(formik?.values['search-productId'])
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [formik?.values['search-productId']])
  
  React.useEffect(() => {
    setLoadingSearch(false)
  }, [data?.getAllProducts])

  return (
    <>
      <FormikField
        id="productId"
        label="Produk"
        disabled
        withButton
        hiddenLabel
        isSelect
        value={selected?.title || ''}
        onClickButton={() => setOpen(true)}
      />

      <StyledDialogSelect className="with-search" onClose={() => setOpen(false)} open={open} fullWidth maxWidth="lg">
        <DialogTitle>Produk</DialogTitle>
        <Box maxWidth={500}>
          <SearchComponent id="productId" label="Produk" loading={loadingSearch} />
        </Box>
        <StyledBoxTable marginBottom={4}>
          <Box sx={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <StyledTableCell
                      key={i}
                      component="th"
                      align={column.align}
                      className={`head ${!i ? 'first' : ''} ${column.id === 'checked' ? 'checked' : ''}`}
                      style={{ minWidth: column.minWidth, whiteSpace: 'nowrap' }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingSearch ? (
                  <EmptyState text="Loading ..." />
                ) : (
                  <>
                    {!!data?.getAllProducts?.length && (data.getAllProducts as z.infer<typeof Product>[]).map((row, index) => {
                      return (
                        <StyledTableRow
                          className={`link`}
                          tabIndex={-1}
                          key={index}
                          onClick={() => handleClickButton(row)}
                        >
                          {columns.map((column, i) => {
                            let value: any
                            if (column.id === 'checked') {
                              value = row.id === selected?.id ? (
                                <ReactSVG
                                  beforeInjection={(svg) => {
                                    svg.classList.add(`svg-icon`)
                                    svg.setAttribute('style', `display: block;`)
                                  }}
                                  className={`wrapper-svg`}
                                  src={`/images/icons/centang.svg`}
                                  wrapper="div"
                                />
                              ) : <></>
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
                                className={`${!i ? 'first' : ''} ${column.id === 'checked' ? 'checked' : ''}`}
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

                {!loadingSearch && !data?.getAllProducts?.length && (
                  <EmptyState text="Data tidak ditemukan" />
                )}
              </TableBody>
            </Table>
          </Box>
        </StyledBoxTable>
      </StyledDialogSelect>
    </>
  )
})

export default memo(FormikSelectProduct)
