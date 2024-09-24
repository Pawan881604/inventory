"use client";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import Vendor_from from "../pages/crm/vendor/Vendor_from"; // Adjust path as necessary
import React, { useState } from "react";
interface propsss{
    open:boolean;
    set_open:(value:boolean)=>void;
}

const PopoverComponent:React.FC<propsss>=({open,set_open})=> {

   

    return (
        <Popover
            backdrop={"blur"}
            showArrow
            isOpen={open} // Control popover open state
            offset={10}
            placement="top-end" // Change placement to top-right
        >
            <PopoverTrigger>
            <span> {/* Placeholder for the trigger element */} </span>
            </PopoverTrigger>
            <PopoverContent className="w-[540px]">
                <Button onClick={()=>set_open(false)} className="absolute top-2 right-2">X</Button>
                <Vendor_from />
            </PopoverContent>
        </Popover>
    );
}

export default PopoverComponent;