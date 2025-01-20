import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { find, isNumber } from 'lodash'
import { z } from 'zod'
import { Finishing } from 'src/validations/finishing/schemas'

interface Props {
  isNew: boolean
}

const useValueHpp = ({ isNew }: Props) => {
  const { data } = useQuery<z.infer<typeof Finishing>>(['finishing'], { enabled: false })

  const valueMaterial = React.useMemo(() => {
    if (isNew) return ''
    const findData = find(data?.hpp || [], { HPPType: { id: 2 }}); // (2) adalah id hppType material bahan
    return isNumber(findData) ? '' : findData ? findData['id'] : '';
  }, [data])

  const valuePrinter = React.useMemo(() => {
    if (isNew) return ''
    const findData = find(data?.hpp || [], { HPPType: { id: 3 }}); // Mesin cetak
    return isNumber(findData) ? '' : findData ? findData['id'] : '';
  }, [data])

  const valueInk = React.useMemo(() => {
    if (isNew) return ''
    const findData = find(data?.hpp || [], { HPPType: { id: 1 }});
    return isNumber(findData) ? '' : findData ? findData['id'] : '';
  }, [data])

  const valueMasking = React.useMemo(() => {
    if (isNew) return ''
    const findData = find(data?.hpp || [], { HPPType: { id: 7 }}); // Masking
    return isNumber(findData) ? '' : findData ? findData['id'] : '';
  }, [data])

  const valueDisplay = React.useMemo(() => {
    if (isNew) return ''
    const findData = find(data?.hpp || [], { HPPType: { id: 6 }});
    return isNumber(findData) ? '' : findData ? findData['id'] : '';
  }, [data])

  return {
    valueMaterial,
    valuePrinter,
    valueInk,
    valueMasking,
    valueDisplay,
  }
}

export default useValueHpp
