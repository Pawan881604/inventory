// https://mui.com/store/previews/uko-client-admin-dashboard/
// https://lotru.devias.io/dashboard/tasks

"use client"
import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Data_grid_table } from "@/lib/data_grid_table/Data_grid_table";
import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";


interface Product {
  productId: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  website_id?: string; // Optional if it might not be available in all rows
}

const Inventory = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [row_Per_page, setrow_Per_page] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [isvisible, setIsvisible] = useState(false);
  // const { data: products, isError, isLoading } = useGetProductsQuery();

  // if (isLoading) {
  //   return <div className="py-4">Loading...</div>;
  // }
  // const columns:MRT_ColumnDef<Product>[] = useMemo(
  //   () => [
  //     {
  //       accessorKey: "productId",
  //       header: "productId",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "price",
  //       header: "price",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "rating",
  //       header: "rating",
  //       size: 150,
       
  //     },
  //     {
  //       accessorKey: "stockQuantity",
  //       header: "Stock Quantity",
  //       size: 150,
     
  //     },
  //     {
  //       accessorKey: "action",
  //       header: "Action",
  //       size: 150,
  //       Cell: ({ row }: { row: { original: Product } }) => {
  //         return (
  //           <Button
  //             // onClick={() => get_single_website(row.original.website_id || "")}
  //             color="secondary"
  //             // disabled={isLoading} // Disable only if this row is loading
  //           >Edit
  //             {/* {isLoading ? <CircularProgress size={24} /> : "Edit"} */}
  //           </Button>
  //         );
  //       },
  //     },
  //   ],
  //   [loadingStates]
  // );

  const products = [
    { productId: 1, name: "Product A", price: 29.99, rating: 4.5, stockQuantity: 120 },
    { productId: 2, name: "Product B", price: 19.99, rating: 3.8, stockQuantity: 200 },
    { productId: 3, name: "Product C", price: 39.99, rating: 4.7, stockQuantity: 50 },
    { productId: 4, name: "Product D", price: 49.99, rating: 4.2, stockQuantity: 30 },
    { productId: 5, name: "Product E", price: 59.99, rating: 4.9, stockQuantity: 80 },
    { productId: 6, name: "Product F", price: 9.99, rating: 4.0, stockQuantity: 300 },
    { productId: 7, name: "Product G", price: 24.99, rating: 3.5, stockQuantity: 150 },
    { productId: 8, name: "Product H", price: 14.99, rating: 4.1, stockQuantity: 180 },
    { productId: 9, name: "Product I", price: 34.99, rating: 4.6, stockQuantity: 90 },
    { productId: 10, name: "Product J", price: 44.99, rating: 4.3, stockQuantity: 70 },
    { productId: 11, name: "Product K", price: 54.99, rating: 4.4, stockQuantity: 40 },
    { productId: 12, name: "Product L", price: 64.99, rating: 4.8, stockQuantity: 60 },
    { productId: 13, name: "Product M", price: 74.99, rating: 4.2, stockQuantity: 20 },
    { productId: 14, name: "Product N", price: 84.99, rating: 3.9, stockQuantity: 110 },
    { productId: 15, name: "Product O", price: 94.99, rating: 4.5, stockQuantity: 150 },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // if (isError || !products) {
    if ( !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      {/* <Data_grid_table
        apidata={products}
        columns={columns}
        loading={false}
        totalPages={100}
        pageSize={25}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        row_Per_page={row_Per_page}
        setrow_Per_page={setrow_Per_page}

      /> */}
    </div>
  );
};

export default Inventory;
