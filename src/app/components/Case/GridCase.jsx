/* eslint-disable react/prop-types */

import { Box } from '@mui/material';
import React, { useState } from 'react'
import Header from '../Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { data } from './MOCK_DATA';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';

const GridCase = ({ title, columns, operatorName = "", caseType, pagination, data: cases }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // const { page, setPage, limit, setLimit, totalPages } = pagination;
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


    const filterRowsByOperator = (rows, caseType, operatorName) => {
        if (caseType === 'arbitrations') {
            return rows.filter((row) => row.category === "Mediaciones" && (operatorName ? row.assignedOperator === operatorName : true));
        } else {
            return rows.filter((row) => row.category !== "Mediaciones" && (operatorName ? row.assignedOperator === operatorName : true));
        }

    };

    const filteredData = filterRowsByOperator(data, caseType, operatorName);

    return (
        <Box margin={"15px 0 0 15px"}
        >
            <Header title={title} />
            <Box
                m="0 0 0 0"
                height="75vh"
                sx={{
                    // width: { xs: "270%", sm: "100%" },
                    overflowX: "auto",
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.blueAccent[400],
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: `${colors.blueAccent[900]} !important`,
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontSize: ".7rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        // backgroundColor: colors.primary[300],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[900],
                    },

                }}
            >
                <DataGrid

                    rows={filteredData}
                    columns={columns}
                    getRowId={(row) => row._id.$oid}

                    pageSizeOptions={[5, 10, 20, 25]}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}

                    // paginationMode='server'
                    // page={page - 1}
                    // rowCount={totalPages * limit}
                    // pageSize={limit}
                    // onPageChange={(newPage) => setPage(newPage + 1)}
                    // onPageSizeChange={(newPageSize) => setLimit(newPageSize)}

                    slots={{ toolbar: GridToolbar }}

                // filterModel={filterModel}
                // onFilterModelChange={(model) => setFilterModel(model)}

                // checkboxSelection
                />
            </Box>
        </Box>
    )
}




export default GridCase;
