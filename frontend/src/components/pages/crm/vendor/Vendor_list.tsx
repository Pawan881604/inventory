import Test from '@/components/common/table/Test'
import React from 'react'

interface list_props{
  set_open:(value:boolean)=>void
}
const Vendor_list:React.FC<list_props> = ({set_open}) => {
  return (
    <div><Test set_open={set_open}/></div>
  )
}

export default Vendor_list