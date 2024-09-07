import React from 'react'
import { FormikValues } from 'formik'

interface Data {
  formik: FormikValues
}

export const FormikContext = React.createContext<Data>({
  formik: {},
})
