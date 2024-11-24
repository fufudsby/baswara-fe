import React from 'react'
import { FormikProps } from 'formik'

interface Data {
  formik: FormikProps<any> | null
}

export const FormikContext = React.createContext<Data>({
  formik: null,
})
