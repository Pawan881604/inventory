"use client";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import { order_product_type_form, order_type_form } from "@/types/order_type";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Modak } from "next/font/google";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { order_status_arr } from "../../common/Data";
import debounce from "lodash.debounce";
import { useGetAllproductsQuery } from "@/state/productApi";
import Input_field from "@/components/common/fields/Input_field";

const Order_product_form = () => {
  const {
    isOpen: isProductFormOpen,
    onOpen: onProductFormOpen,
    onClose: onProductFormClose,
  } = useDisclosure();

  const {
    isOpen: isServiceFormOpen,
    onOpen: onServiceFormOpen,
    onClose: onServiceFormClose,
  } = useDisclosure();

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex w-full">
            <p className="w-[70%]">Item</p>
            <p className="w-[10%] text-center">Cost</p>
            <p className="w-[10%] text-center">Qnty</p>
            <p className="w-[10%] text-center">Total</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex justify-end">
            <div>
              <p>
                Items Subtotal: <span>0</span>
              </p>
              <p>
                Order Total: <span>0</span>
              </p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex gap-2 justify-end">
            <Button size="sm" onPress={onProductFormOpen}>
              Add product(s)
            </Button>
            <Button size="sm" onPress={onServiceFormOpen}>
              Add service
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </CardFooter>
      </Card>

      <Product_service
        isOpen={isServiceFormOpen}
        onClose={onServiceFormClose}
      />
      <ProductForm isOpen={isProductFormOpen} onClose={onProductFormClose} />
    </div>
  );
};


interface popover {
  isOpen: boolean;
  onClose: () => void;
}

const ProductForm: React.FC<popover> = ({ isOpen, onClose }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState<string>(filterValue);
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<order_product_type_form>({});

  // Fetching product data
  const { data: product_data } = useGetAllproductsQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: 10,
    page: 1,
  });

  // Debounce for filtering products
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);

  // Filter the product data
  const filter_product_data = useMemo(() => {
    return (
      product_data?.product?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) || []
    );
  }, [product_data]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add products</ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <div className="w-[69%]">Product</div>
                <div className="w-[29%]">Quantity</div>
              </div>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                  <div className="w-[69%]">
                    <Secondary_Autocomplete_field
                      control={control}
                      errors={errors}
                      name="product"
                      label_name="Search product"
                      options={filter_product_data}
                    />
                  </div>

                  <div className="w-[29%]">
                    <Input_field
                      control={control}
                      errors={errors}
                      name="quantity"
                      label="Quantity"
                      type="number"
                    />
                  </div>
                </div>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Add
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};



const Product_service: React.FC<popover> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<order_type_form>({});
  const onSubmit = () => {};
  return (
    <>
      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add products
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  <div className="w-[49%]">Add shipping</div>
                  <div className="w-[49%]">Add Other Charge</div>
                </div>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-2">
                    <div className="w-[49%]">
                      <Secondary_Autocomplete_field
                        control={control}
                        errors={errors}
                        name="customer"
                        label_name=""
                        options={order_status_arr}
                      />
                    </div>

                    <div className="w-[49%]">
                      <Secondary_Autocomplete_field
                        control={control}
                        errors={errors}
                        name="customer"
                        label_name=""
                        options={order_status_arr}
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
