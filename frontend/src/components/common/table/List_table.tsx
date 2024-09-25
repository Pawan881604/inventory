import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { vendr_list as Vendor } from "@/types/Vendor_type";

const columns = [
  { name: "Name", uid: "name" },
  { name: "Phone", uid: "phone" },
  { name: "Email", uid: "email" },
  { name: "Company", uid: "company" },
  { name: "GSTIN", uid: "gstin" },
  { name: "Address Line 1", uid: "address_line_1" },
  { name: "Address Line 2", uid: "address_line_2" },
  { name: "Pincode", uid: "pin_code" },
  { name: "State", uid: "state" },
  { name: "City", uid: "city" },
  { name: "Country", uid: "country" },
  { name: "Actions", uid: "actions" }, // Added actions column
];

interface Props {
  data: Vendor[];
  renderCell: (vendor: Vendor, columnKey: React.Key) => React.ReactNode;
}

const List_table: React.FC<Props> = ({ data, renderCell }) => {
  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default List_table;
