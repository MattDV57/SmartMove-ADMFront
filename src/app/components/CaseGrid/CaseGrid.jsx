/* eslint-disable react/prop-types */

import { Box } from '@mui/material';
import React, { useState } from 'react'
import Header from '../Header';
import { DataGrid } from '@mui/x-data-grid';
import { data } from './MOCK_DATA';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';

const CaseGrid = ({ title, columns }) => {
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box margin={"10px 0 0 15px"}
            sx={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Header title={title} />
            <Box
                m="0 0 0 0"
                height="75vh"
                sx={{
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
                    rows={data}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    pagination
                    getRowId={(row) => row._id.$oid}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    density="standard"
                // checkboxSelection
                />
            </Box>
        </Box>
    )
}




export default CaseGrid;
