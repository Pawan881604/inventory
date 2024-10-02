import Input_field from "@/components/common/fields/Input_field";
import Select_field from "@/components/common/fields/Select_field";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";

interface vender_form_props {
  set_open: (value: boolean) => void;
  onsubmit: (data: any) => void;
}

const Product_form: React.FC<vender_form_props> = ({ set_open, onsubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {/* {edit ? "Update Vender From" : "Vender From"} */}
        </ModalHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex  items-center justify-between p-2">
            <p className="text-lg">Basic Details</p>
            <div className="w-52">
              <Input_field
                control={control}
                errors={errors}
                name="name"
                label="Item Name"
              />
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
                isLoading={false}
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

export default Product_form;
