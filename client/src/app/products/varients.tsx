import { MRT_ColumnDef } from 'material-react-table'
import React, { useMemo } from 'react'

const columns:MRT_ColumnDef<>=useMemo(()=>
[
    {
        accessorKey:'id',
        header:'id',
        size: 150,
    },
    {
        accessorKey:'label',
        header:'La',
        size: 150,
    }
]
,[]) 
const Varients = () => {
  return (
    <div>Varients</div>
  )
}

export default Varients