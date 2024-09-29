"use client";
import React, { useState, useEffect } from "react";
import Vendor_list from "./Vendor_list";
import Vendor_from from "./Vendor_from";
import Popover_component from "@/components/Popover_component/Popover_component";
import { vendr_form } from "@/types/Vendor_type";
import {
  useAddNew_vendorMutation,
  useGetSingeVendorMutation,
} from "@/state/vendorApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";

const Vendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addNew_vendor, { error, isSuccess, isLoading }] =
    useAddNew_vendorMutation();
  console.log(selectedId);
  const onSubmit = async (data: vendr_form) => {
    const updated_data = { ...data, uuid: generate32BitUUID() };
    await addNew_vendor(updated_data);
  };
  const [getSingeVendor] = useGetSingeVendorMutation();
  const edit_handler = async (value: string) => {
    setIsOpen(true);
    await getSingeVendor(value);
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
      setIsOpen(false);
    }
    if (!isOpen) {
      setSelectedId(null);
    }
  }, [error, isSuccess, isOpen]);
  return (
    <div>
      <Popover_component
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
      />

      <Vendor_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Vendor;
