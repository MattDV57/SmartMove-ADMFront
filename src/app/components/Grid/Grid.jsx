/* eslint-disable react/prop-types */

import { Box } from '@mui/material';
import React from 'react'
import Header from './Header';
import { DataGrid } from '@mui/x-data-grid';
import { data } from './MOCK_DATA';

const Grid = ({ title, columns }) => {
    return (
        <Box margin={"15px"} sx={{}}>
            <Header title={title} />
            <Box sx={{}} >
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row._id.$oid}

                />
            </Box>
        </Box>
    )
}




export default Grid;
