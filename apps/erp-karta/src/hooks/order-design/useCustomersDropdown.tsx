import React from 'react'
import { FormikProps } from 'formik'
import { z } from 'zod'
import { useQuery as useQueryApollo } from '@apollo/client'
import { GETCUSTOMERS } from 'src/graphql/customer/queries'
import { Customer } from 'src/validations/customer/schemas'
import { Value } from 'src/core/components/formik/Select'
import { RefProps } from 'src/core/components/customer/DialogUpdate'
import { ActiveFieldContext } from 'src/contexts/activeField'
import { find } from 'lodash'


interface Props {
  formik: FormikProps<any>
  updateRef: React.RefObject<RefProps>
  formikSelectRefProps: React.RefObject<RefProps>
}

const useCustomersDropdown = ({ formik, updateRef, formikSelectRefProps }: Props) => {
  const { setActiveField } = React.useContext(ActiveFieldContext)
  const [loadingSearch, setLoadingSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState<z.infer<typeof Customer> | null>(null)

  const { data, refetch } = useQueryApollo(GETCUSTOMERS, { variables: {
    input: { limit: 10, page: 1, search },
  }})

  const customers: Value[] = React.useMemo(() => {
    setLoadingSearch(false)
    if (data?.getCustomers?.data) {
      return data?.getCustomers?.data.map((item: z.infer<typeof Customer>) => {
        return {
          id: item.id,
          title: item.name,
        }
      })
    }
    return []
  }, [data])

  const handleCloseUpdateCustomer = React.useCallback(() => {
    updateRef.current?.setOpen(false)
    formikSelectRefProps.current?.setOpen(true)
    setActiveField('')
  }, [updateRef])
  
  const handleUpdateCustomer = React.useCallback(() => {
    updateRef.current?.setOpen(true)
  }, [updateRef])

  React.useEffect(() => {
    setLoadingSearch(true)
    const delayDebounceFn = setTimeout(() => {
      setSearch(formik.values['search-customerId'])
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [formik.values['search-customerId']])

  React.useEffect(() => {
    const findCustomer = find(data?.getCustomers?.data || [], { id: parseInt(formik.values.customerId || '0') })
    if (findCustomer) setSelected(findCustomer)
  }, [formik.values['customerId']])

  // React.useEffect(() => {
  //   if (formik.values.material && material?.length) {
  //     const findData = find(material, { id: formik.values.material })
  //     if (findData) {
  //       const totalHpp = formik.values.totalHpp || '0'
  //       void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
  //     }
  //   }
  // }, [formik.values.material])

  return {
    customers,
    selected,
    loading: loadingSearch,
    refetch,
    handleCloseUpdateCustomer,
    handleUpdateCustomer,
  }
}

export default useCustomersDropdown
