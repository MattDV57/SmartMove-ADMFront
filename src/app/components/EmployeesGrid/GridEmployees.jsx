import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { columnsEmployees } from './columnsEmployees';
import { data } from './EMPLOYEES_DATA';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import { Box } from '@mui/material';

export const GridEmployees = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    const cols = columnsEmployees();

    return (
        <div>

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
                        backgroundColor: `${theme.palette.primary.secondary} !important`,
                        color: '#fafafa',
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
                        backgroundColor: `${theme.palette.primary.secondary} !important`,
                    },
                    "& .MuiTablePagination-root": {
                        color: '#fafafa',
                    },

                }}

            >
                <DataGrid
                    columns={cols}
                    rows={data}
                    getRowId={(row) => row.id}

                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    slots={{ toolbar: GridToolbar }}

                // So how do i make the fields for them to expand when clicked?

                />
            </Box>

        </div>
    )
}
