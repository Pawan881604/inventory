"use client";
import React, { useEffect, useMemo } from "react";
import Input_field from "@/components/common/fields/Input_field";
import Phone_number_field from "@/components/common/fields/Phone_number_field";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import DatePickerField from "@/components/common/fields/DatePicker_field";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import { order_status_arr, Payment_mode_arr } from "../../common/Data";
import Select_field from "@/components/common/fields/Select_field";

export const Order_form = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shipping_address: { country: "India" }, // Set default country value
      billing_address: { country: "India" }, // Set default country value
      status: "active", // Set default country value
    },
  });
  const onSubmit = () => {};
  return (
    <>
      <div>
        <div>
          {/* <ModalHeader className="flex flex-col gap-1">
            {edit ? "Update Customer From" : "Customer From"}
          </ModalHeader> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white">
              <div className="flex flex-wrap gap-2">
                <div className="w-[32%]">
                  <div className="w-full">
                    <DatePickerField
                      control={control}
                      errors={errors}
                      name="name"
                      label="Name"
                    />
                  </div>
                  <div className="w-52">
                    <Select_field
                      control={control}
                      errors={errors}
                      name="status"
                      label="Status"
                      options={order_status_arr}
                    />
                  </div>
                  <div className="w-[48%] lg:w-[49%]">
                    <Secondary_Autocomplete_field
                      control={control}
                      errors={errors}
                      name="categorie"
                      label_name="Customer"
                      options={order_status_arr}
                      // setFilterValue={setFilterValue}
                    />
                  </div>
                  <div className="w-[48.5%] lg:w-[49%] ">
                    <Input_field
                      control={control}
                      errors={errors}
                      name="email"
                      label="Email"
                    />
                  </div>
                </div>
                <div className="w-[32%]">
                  <p>Billing</p>
                  <p>Address:</p>
                  <div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="First name"
                        label="First name"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Company"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Address line 1"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Address line 2"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="City"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Postcode / ZIP"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Country / Region"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="State / County"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Email address"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Phone"
                      />
                    </div>
                    <div>
                      <Select_field
                        control={control}
                        errors={errors}
                        name="status"
                        label="Status"
                        options={Payment_mode_arr}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[32%]">
                  <p>Shipping</p>
                  <p>Address:</p>
                  <div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="First name"
                        label="First name"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Company"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Address line 1"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Address line 2"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="City"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Postcode / ZIP"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="Country / Region"
                      />
                    </div>
                    <div>
                      <Input_field
                        control={control}
                        errors={errors}
                        name="Company"
                        label="State / County"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <ModalFooter> */}
              <Button
                color="danger"
                variant="light"
                // onPress={() => set_open(false)}
              >
                Close
              </Button>

              <Button
                // isLoading={isLoading}
                className="bg-black text-white"
                type="submit"
              >
                Save
              </Button>
              {/* </ModalFooter> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
