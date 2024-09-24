"use client";
import Input_field from "@/components/common/fields/Input_field";
import Phone_number_field from "@/components/common/fields/Phone_number_field";
import { vendr_form } from "@/types/Vendor_type";
import { Button } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";

const Vendor_from = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<vendr_form>();
  return (
    <div>
      <div>
        <form>
          <div className="flex  items-center justify-between p-2">
            <p>Basic Details</p>
            <Button>Link Customer</Button>
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
            <p>Company Details</p>
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
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="email"
                  label="Email"
                />
              </div>
              <div className="w-full">
                <p>Billing Address</p>
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
        </form>
      </div>
    </div>
  );
};

export default Vendor_from;
