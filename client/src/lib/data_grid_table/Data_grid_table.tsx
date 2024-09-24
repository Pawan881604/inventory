"use client";
import { MaterialReactTable } from "material-react-table";
import { useState } from "react";
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { Loading_section } from "../Loading_section";
import { Paginations } from "../pagination/Pagination";

interface Data_grid_table_props {
    apidata?: any[],
    columns?: any[],
    loading: boolean,
    totalPages: number,
    pageSize: number,
    currentPage: number,
    handlePageChange: (page: number) => void,
    row_Per_page: number,
    setrow_Per_page: (value: number) => void;
}
const StyledDiv = `
background-color: #ffffff;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: 0.5rem;
border: 1px solid #e5e7eb;
margin-top: 1.25rem;
color: #4a5568;
`;

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
            {loading ? (
                <Loading_section />
            ) : (
                <>
                    <MaterialReactTable
                        columns={columns}
                        className={StyledDiv}

                        data={validRows}
                        renderBottomToolbar={() => (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Row per page
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={row_Per_page}
                      label="Row per page"
                      onChange={handleChange}
                      inputProps={{
                        sx: { fontSize: "12px" },
                      }}
                    >
                      <MenuItem sx={{ fontSize: "12px" }} value={5}>
                        5
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={10}>
                        10
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={25}>
                        25
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={50}>
                        50
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={75}>
                        75
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "12px" }} value={100}>
                        100
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                                </Box>
                                <Box>
                                    {pageSize < totalPages &&
                                        <Paginations
                                            totalItemsCount={totalPages}
                                            activePage={currentPage}
                                            itemsCountPerPage={pageSize}
                                            handlePageChange={handlePageChange}
                                        />}
                                </Box>
                                <Box>
                                    {/* <Typography variant="h4">Total item {totalPages}</Typography> */}
                                </Box>
                            </Box>
                        )}
                    />
                </>
            )}
        </>
    );
};