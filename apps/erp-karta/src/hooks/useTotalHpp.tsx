import React from 'react'
import { FormikProps } from 'formik'
import { useQuery } from '@tanstack/react-query'
import { find } from 'lodash'
import { HPPType } from 'src/pages/admin/products/update/[typeId]/[id]'

interface Props {
  formik: FormikProps<any>
}

const useTotalHpp = ({ formik }: Props) => {
  const { data: material } = useQuery<HPPType[]>(['material'], { enabled: false })
  const { data: printers } = useQuery<HPPType[]>(['printers'], { enabled: false })
  const { data: inks } = useQuery<HPPType[]>(['inks'], { enabled: false })
  const { data: maskings } = useQuery<HPPType[]>(['maskings'], { enabled: false })
  const { data: displays } = useQuery<HPPType[]>(['displays'], { enabled: false })

  React.useEffect(() => {
    if (formik.values.material && material?.length) {
      const findData = find(material, { id: formik.values.material })
      if (findData) {
        const totalHpp = formik.values.totalHpp || '0'
        void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
      }
    }
  }, [formik.values.material])

  React.useEffect(() => {
    if (formik.values.printer && printers?.length) {
      const findData = find(printers, { id: formik.values.printer })
      if (findData) {
        const totalHpp = formik.values.totalHpp || '0'
        void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
      }
    }
  }, [formik.values.printer])

  React.useEffect(() => {
    if (formik.values.ink && inks?.length) {
      const findData = find(inks, { id: formik.values.ink })
      if (findData) {
        const totalHpp = formik.values.totalHpp || '0'
        void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
      }
    }
  }, [formik.values.ink])

  React.useEffect(() => {
    if (formik.values.masking && maskings?.length) {
      const findData = find(maskings, { id: formik.values.masking })
      if (findData) {
        const totalHpp = formik.values.totalHpp || '0'
        void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
      }
    }
  }, [formik.values.masking])

  React.useEffect(() => {
    if (formik.values.display && displays?.length) {
      const findData = find(displays, { id: formik.values.ink })
      if (findData) {
        const totalHpp = formik.values.totalHpp || '0'
        void formik.setFieldValue('totalHpp', parseInt(totalHpp) + findData.hpp)
      }
    }
  }, [formik.values.display])
}

export default useTotalHpp
