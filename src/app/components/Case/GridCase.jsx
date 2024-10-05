/* eslint-disable react/prop-types */

import { Box, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { useGetCasesActions } from '../../../hooks/case/useGetCasesActions';


const GridCase = ({ columns, caseType, operatorName }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);




    const { isLoading, totalClaims, paginationInfo, cases } = useGetCasesActions({
        caseType,
        employeeId: operatorName,
    });

    const { page, limit, setPage, setLimit, paginationModel, setPaginationModel } = paginationInfo;


    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Box margin={"15px 0 0 15px"}>
            <GridContainer>
                <DataGrid

                    rows={cases}
                    rowCount={totalClaims}
                    columns={columns}
                    getRowId={(row) => row._id}

                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    pagination

                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={(model) => {
                        setPaginationModel(model);
                        setPage(model.page + 1);
                        setLimit(model.pageSize);
                    }}

                    slots={{ toolbar: GridToolbar }}
                    hideFooterSelectedRowCount
                    loading={isLoading}
                />
            </GridContainer>
        </Box>
    );
};

export default GridCase;
