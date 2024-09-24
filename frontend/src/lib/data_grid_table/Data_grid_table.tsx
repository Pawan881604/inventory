import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Paginations } from "../pagination/Pagination";

interface Data_grid_table_props {
  apidata?: any[];
  columns: MRT_ColumnDef<any>[]; // Ensure columns has the correct type
  loading: boolean;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  row_Per_page: number;
  setrow_Per_page: (value: number) => void;
}

export const Data_grid_table: React.FC<Data_grid_table_props> = ({
  apidata,
  columns,
  loading,
  totalPages,
  pageSize,
  currentPage,
  handlePageChange,
  row_Per_page,
  setrow_Per_page,
}) => {
  const validRows = Array.isArray(apidata) ? apidata : [];

  return (
    <>
      <MaterialReactTable
        columns={columns} // Now it's properly typed
        // className="bg-white shadow-md rounded-md border border-gray-300 mt-5 text-gray-700" // Tailwind classes
        data={validRows}
        renderBottomToolbar={() => (
          <div className="flex justify-between items-center flex-wrap">
            <div>
              {pageSize < totalPages && (
                <Paginations
                  totalItemsCount={totalPages}
                  activePage={currentPage}
                  itemsCountPerPage={pageSize}
                  handlePageChange={handlePageChange}
                />
              )}
            </div>
            <div>
              {/* <Typography variant="h4">Total item {totalPages}</Typography> */}
            </div>
          </div>
        )}
      />
    </>
  );
};
