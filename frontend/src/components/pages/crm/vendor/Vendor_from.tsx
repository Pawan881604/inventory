"use client";
import Input_field from "@/components/common/fields/Input_field";
import Phone_number_field from "@/components/common/fields/Phone_number_field";
import { vendr_form, vendr_list } from "@/types/Vendor_type";
import { vendor_schema } from "@/zod-schemas/vendor_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
interface vender_form_props {
  open: boolean;
  set_open: (value: boolean) => void;
  onSubmit: (data: vendr_form) => void;
  isLoading: boolean;
  vendor_data: vendr_list | never[];
  edit: boolean;
}
const Vendor_from: React.FC<vender_form_props> = ({
  open,
  set_open,
  onSubmit,
  isLoading,
  vendor_data,
  edit,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<vendr_form>({
    resolver: zodResolver(vendor_schema),
    defaultValues: {
      country: "India", // Set default country value
    },
  });
  const memoizedVendorData = useMemo(() => {
    if (!Array.isArray(vendor_data)) {
      return {
        name: vendor_data.vendor_name,
        phone: vendor_data.phone,
        email: vendor_data.email,
        company: vendor_data.company_name,
        gstin: vendor_data.gstin,
        address_line_1: vendor_data.address_line_1,
        address_line_2: vendor_data.address_line_2,
        pin_code: vendor_data.pincode,
        state: vendor_data.state,
        city: vendor_data.city,
        country: vendor_data.country,
      };
    }
    return {} as Partial<vendr_form>; // Use Partial<vendr_form> to allow missing keys
  }, [vendor_data]);

  useEffect(() => {
    if (edit) {
      if (Object.keys(memoizedVendorData).length > 0) {
        (Object.keys(memoizedVendorData) as (keyof vendr_form)[]).forEach(
          (key) =>
            setValue(key, memoizedVendorData[key] as vendr_form[typeof key])
        );
      }
    } else {
      (Object.keys(memoizedVendorData) as (keyof vendr_form)[]).forEach((key) =>
        setValue(key, "")
      );
    }
  }, [memoizedVendorData, setValue, edit]);

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {edit ? "Update Vender From" : "Vender From"}
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  items-center justify-between p-2">
            <p className="text-lg">Basic Details</p>
            <Button className="bg-black text-white">Link Customer</Button>
          </div>
          <div className="bg-white">
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <Input_field
                  control={control}
                  errors={errors}
                  name="name"
                  label="Name"
                />
              </div>
              <div className="w-[49%]">
                <Phone_number_field
                  control={control}
                  errors={errors}
                  name="phone"
                  label="Phone"
                />
              </div>

              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="email"
                  label="Email"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-lg py-2">Company Details</p>
          </div>
          <div className="bg-white">
            <div className="flex flex-wrap gap-2">
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="company"
                  label="Company"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="gstin"
                  label="GSTIN"
                />
              </div>

              <div className="w-full">
                <p className="text-lg">Billing Address</p>
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="address_line_1"
                  label="Address Line 1"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="address_line_2"
                  label="Address Line 2"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="pin_code"
                  label="Pin Code"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="state"
                  label="Select State"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="city"
                  label="Select City"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="country"
                  label="Country"
                />
              </div>
            </div>
          </div>
          <div>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => set_open(false)}
              >
                Close
              </Button>

              <Button
                isLoading={isLoading}
                className="bg-black text-white"
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vendor_from;
