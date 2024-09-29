import List_table from "@/components/common/table/List_table";
import { useGetAllVendorsQuery, useRemoveVendorMutation } from "@/state/vendorApi";
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useState } from "react";
import {
  Chip,
  ChipProps,
  CircularProgress,
  Tooltip,
  User,
} from "@nextui-org/react";
import { Trash2, Edit, Eye, RotateCcw, Eraser } from "lucide-react";

import { vendr_list, Get_VendorResponse, vendor_Column } from "@/types/Vendor_type";
import toast from "react-hot-toast";

interface list_props {
  set_open: (value: boolean) => void;
}




const columns: vendor_Column[] = [
  { name: "Name", uid: "vendor_name" },
  { name: "Phone", uid: "phone" },
  { name: "Email", uid: "email" },
  { name: "Company", uid: "company" },
  { name: "Status", uid: "status" },
  { name: "GSTIN", uid: "gstin" },
  { name: "Address Line 1", uid: "address_line_1" },
  { name: "Address Line 2", uid: "address_line_2" },
  { name: "Pincode", uid: "pin_code" },
  { name: "State", uid: "state" },
  { name: "City", uid: "city" },
  { name: "Country", uid: "country" },
  { name: "Actions", uid: "actions" }, // Added actions column
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
};

const Vendor_list: React.FC<list_props> = ({ set_open }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [page_status, set_page_status] = useState<string>("yes");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState<string>(filterValue);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);


  const [removeVendor, { error: delete_error, isLoading: delete_loading, isSuccess: delete_success }] = useRemoveVendorMutation();
  // Debounce the filter value to avoid excessive API calls
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);
  useEffect(() => {
    if (delete_error) {
      const errorMessage =
        (delete_error as { data?: { message?: string } }).data?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage); // Show the error toast
    }
    if (delete_success) {
      toast.success("Vendor Delete successfuly"); // Show the error toast
    }

  }, [delete_error, delete_success, toast])
  // Fetch vendors only when debouncedFilterValue has a valid value
  const { data, error, isLoading } = useGetAllVendorsQuery(
    { is_active: page_status, keyword: debouncedFilterValue, status: statusFilter, rowsPerPage: rowsPerPage, page: page }
  );
  const response: Get_VendorResponse | undefined = data as Get_VendorResponse | undefined;
  const vendors: Get_VendorResponse = useMemo(() => {
    const vendor: vendr_list[] = response?.vendor || [];
    const resultPerpage: number = response?.resultPerpage || 0;
    const data_counter: number = response?.data_counter || 0;
    return { vendor, resultPerpage, data_counter }
  }, [response]);



  console.log(typeof page_status, page_status);
  const renderCell = React.useCallback(
    (vendor: vendr_list, columnKey: React.Key) => {
      const cellValue = vendor[columnKey as keyof vendr_list];


      const deleteHandler = async (id: string) => {
        await removeVendor({ id })
      }


      switch (columnKey) {
        case "vendor_name":
          return (
            <User
              key={vendor._id}
              avatarProps={{ radius: "lg", src: "" }} // Replace with a valid image URL if available
              description={vendor.vendor_name}
              name={cellValue}
            >
              {vendor.vendor_name}
            </User>
          );
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[vendor.status.toLocaleLowerCase()]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">

              <Tooltip content="Edit user">
                <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                  { vendor && vendor?.is_active==="yes" ?(
                    <Edit size={20} />
                  ) : (
                    <RotateCcw size={20} />
                  )}
                </span>
              </Tooltip>

              <Tooltip color="danger" content="Delete user">
                <span className="text-sm text-danger cursor-pointer active:opacity-50">
                  {delete_loading ? (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  ) :  vendor && vendor?.is_active==="yes" ?(
                    <Trash2 onClick={() => deleteHandler(vendor._id)} size={20} />
                  ) : (
                    <Eraser onClick={() => deleteHandler(vendor._id)} size={20} />
                  )}
                </span>
              </Tooltip>


            </div >
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
      <List_table<vendr_list>
        data={vendors.vendor}
        loading={isLoading}
        columns={columns}
        resultPerpage={vendors.resultPerpage}
        setRowsPerPage={setRowsPerPage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        data_length={vendors.data_counter}
        page={page}
        setPage={setPage}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        form_open={set_open}
        set_page_status={set_page_status}
        renderCell={renderCell} />
    </div>
  );
};

export default Vendor_list;
