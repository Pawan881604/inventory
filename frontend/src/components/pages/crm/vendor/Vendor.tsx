"use client"
import React, { useState } from 'react'
import Vendor_list from './Vendor_list'
import PageHeader from '@/components/common/Page_header'
import Vendor_from from './Vendor_from'
import Popover_component from '@/components/Popover_component/Popover_component'

const Vendor:React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div>
            <div></div>
            {/* <div>
                <PageHeader title={'Vendors'} link={''}/>
            </div> */}
            <Popover_component open={isOpen} set_open={setIsOpen}/>
            {/* <Vendor_from /> */}
            <Vendor_list set_open={setIsOpen}/>
        </div>
    )
}

export default Vendor