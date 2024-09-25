import Test from "@/components/common/table/Test";
import { useGetAllVendorsQuery } from "@/state/vendorApi";
import React from "react";

interface list_props {
  set_open: (value: boolean) => void;
}
const Vendor_list: React.FC<list_props> = ({ set_open }) => {
  const { data: vendors, error, isLoading } = useGetAllVendorsQuery("");
  console.log(vendors);
  return (
    <div>
      <Test set_open={set_open} />
    </div>
  );
};

export default Vendor_list;
