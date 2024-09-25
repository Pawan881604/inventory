"use client";
import React, { useState, useEffect } from "react";
import Vendor_list from "./Vendor_list";
import PageHeader from "@/components/common/Page_header";
import Vendor_from from "./Vendor_from";
import Popover_component from "@/components/Popover_component/Popover_component";
import { vendr_form } from "@/types/Vendor_type";
import { useAddNew_vendorMutation } from "@/state/vendorApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";

const Vendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addNew_vendor, { data, error, isSuccess, isLoading }] =
    useAddNew_vendorMutation();

  const onSubmit = async (data: vendr_form) => {
    const updated_data = { ...data, uuid: generate32BitUUID() };
    const response = await addNew_vendor(updated_data);
  };

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage); // Show the error toast
    }
    if (isSuccess) {
      toast.success("Vendor addd successfuly"); // Show the error toast
      setIsOpen(false)
    }
  }, [error, isSuccess]);
  return (
    <div>
      <div></div>
      {/* <div>
                <PageHeader title={'Vendors'} link={''}/>
            </div> */}
      {/* <Popover_component
        open={isOpen}
        set_open={setIsOpen}
        components={
          <Vendor_from
            isLoading={isLoading}
            open={isOpen}
            set_open={setIsOpen}
            onSubmit={onSubmit}
          />
        }
      /> */}

      {/* <Vendor_from /> */}
      <Vendor_list set_open={setIsOpen} />
    </div>
  );
};

export default Vendor;
