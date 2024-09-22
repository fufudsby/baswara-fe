import React, { memo } from 'react'
import { StyledBoxOptions } from 'src/styles/table'
import IconButtonAction from 'src/core/components/IconButtonAction'

interface Props {
  id: number
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  justifyContent?: 'center' | 'flex-end'
}

const ButtonOptions: React.FunctionComponent<Props> = ({
  id,
  onDelete,
  onEdit,
  justifyContent,
}: Props) => {
  return (
    <StyledBoxOptions justifyContent={justifyContent || 'flex-end'}>
      <IconButtonAction onClick={() => onEdit(id)} />
      <IconButtonAction onClick={() => onDelete(id)} variant="delete" />
    </StyledBoxOptions>
  )
}

export default memo(ButtonOptions)
