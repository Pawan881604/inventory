"use client"
import React from "react";
import {
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { vendr_list as Vendor, vendor_Column } from "@/types/Vendor_type";
import TableBottomContent from "./TableBottomContent";
import TableTopContent from "./TableTopContent";

const INITIAL_VISIBLE_COLUMNS = ["vendor_name", "phone","gstin","state", "status", "actions"];

interface TableProps<T> {
  data: T[];
  loading: boolean;
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
  filterValue: string;
  setFilterValue: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  resultPerpage: number;
  setRowsPerPage: (value: number) => void;
  data_length: number;
  page: number;
  setPage: (value: number) => void;
  columns: any; // You may want to further type this based on your column definitions
  form_open: (value: boolean) => void;
  set_page_status: (value: string) => void;
}
interface Identifiable {
  _id: string;
}
const ListTable = <T extends Identifiable>({
  data,
  renderCell,
  loading,
  filterValue,
  setFilterValue,
  statusFilter,
  setStatusFilter,
  resultPerpage,
  setRowsPerPage,
  data_length,
  page,
  setPage, columns,form_open,set_page_status
}: TableProps<T>) => {
  const pages = Math.ceil(data_length / Number(resultPerpage));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));



  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column:any) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  return (
    <Table aria-label="Example table with custom cells"
      isHeaderSticky
      bottomContent={<TableBottomContent page={page} pages={pages} setPage={setPage} />}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[600px]",
      }}
      topContent={
        <TableTopContent
          filterValue={filterValue}
          statusFilter={statusFilter}
          setPage={setPage}
          setStatusFilter={setStatusFilter}
          columns={columns}
          setFilterValue={setFilterValue}
          data_length={data_length}
          setRowsPerPage={setRowsPerPage}
          form_open={form_open}
          setVisibleColumns={setVisibleColumns}
          visibleColumns={visibleColumns}
          set_page_status={set_page_status}
        />}
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column: vendor_Column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No vendors found"} items={data}
        loadingContent={<Spinner />}
        isLoading={loading}
      >
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

export default ListTable;
