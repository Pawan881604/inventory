"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Vendor_list from "./Vendor_list";
import Vendor_from from "./Vendor_from";
import Popover_component from "@/components/Popover_component/Popover_component";
import {
  Post_VendorResponse,
  vendr_form,
  vendr_list,
} from "@/types/Vendor_type";
import {
  useAddNew_vendorMutation,
  useGetSingeVendorMutation,
  useUpdate_vendorMutation,
} from "@/state/vendorApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import toast from "react-hot-toast";

const Vendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const [addNew_vendor, { error, isSuccess, isLoading }] =
    useAddNew_vendorMutation();
  const [update_vendor] = useUpdate_vendorMutation();

  const [getSingeVendor, { data }] = useGetSingeVendorMutation();

  // Memoize vendor data to avoid recalculating on every render
  const response: Post_VendorResponse | undefined = data as
    | Post_VendorResponse
    | undefined;

  const vendor: vendr_list | never[] = useMemo(() => {
    const vendor: vendr_list | never[] = response?.vendor || [];
    return vendor;
  }, [response]);

  // useCallback to prevent re-creating the function on each render
  const onSubmit = useCallback(
    async (data: vendr_form) => {
      if (edit) {
        if (Array.isArray(vendor) || !vendor?._id) {
          console.error("Vendor data is invalid or empty");
          return;
        }
        console.log('Updating vendor:', vendor?._id);  // Log the vendor ID
        const updated_data = { ...data, id: vendor?._id };
  
        // Log the updated data to check the payload
        console.log('Updated Data:', updated_data);
  
        // Make the update API call
        try {
          await update_vendor(updated_data);
          console.log("Vendor updated successfully.");
        } catch (error) {
          console.error("Error updating vendor:", error);
        }
      } else {
        const updated_data = { ...data, uuid: generate32BitUUID() };
        await addNew_vendor(updated_data);
      }
    },
    [addNew_vendor, update_vendor, edit, vendor]
  );

  const edit_handler = useCallback(
    async (value: string) => {
      setIsOpen(true);
      await getSingeVendor(value);
      setEdit(true);
    },
    [setEdit, getSingeVendor]
  );

  // Handle success and error messages
  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } }).data?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
    if (isSuccess) {
      toast.success("Vendor added successfully");
      setIsOpen(false);
    }
    if (!isOpen) {
      setEdit(false);
    }
  }, [error, isSuccess, isOpen, setEdit]);

  return (
    <div>
      {isOpen && (
        <Popover_component
          open={isOpen}
          set_open={setIsOpen}
          components={
            <Vendor_from
              isLoading={isLoading}
              edit={edit}
              open={isOpen}
              set_open={setIsOpen}
              vendor_data={vendor}
              onSubmit={onSubmit}
            />
          }
        />
      )}

      <Vendor_list set_open={setIsOpen} edit_handler={edit_handler} />
    </div>
  );
};

export default Vendor;
