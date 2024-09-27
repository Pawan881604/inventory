import List_table from "@/components/common/table/List_table";
import Test from "@/components/common/table/Test";
import { useGetAllVendorsQuery } from "@/state/vendorApi";
import React from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { DeleteIcon, Edit, Eye } from "lucide-react";

import { vendr_list } from "@/types/Vendor_type";
interface list_props {
  set_open: (value: boolean) => void;
}
const Vendor_list: React.FC<list_props> = ({ set_open }) => {
  const { data, error, isLoading } = useGetAllVendorsQuery("");
  const vendors: vendr_list[] = data?.vendor || [];

  const renderCell = React.useCallback(
    (vendor: vendr_list, columnKey: React.Key) => {
      const cellValue = vendor[columnKey as keyof vendr_list];

      switch (columnKey) {
        case "vendor_name":
          return (
            <User
              avatarProps={{ radius: "lg", src: "" }} // Replace with a valid image URL if available
              description={vendors.vendor_name}
              name={cellValue}
            >
              {vendors.vendor_name}
            </User>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Eye />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Edit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );
  
  return (
    <div>
      {/* <Test set_open={set_open} data={data} />
       */}
      <List_table data={vendors} loading={isLoading} renderCell={renderCell} />
    </div>
  );
};

export default Vendor_list;
