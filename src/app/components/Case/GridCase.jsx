/* eslint-disable react/prop-types */

import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { useGetCasesActions } from '../../../hooks/case/useGetCasesActions';
import { CustomToolBar } from '../CustomToolBar';
import { useGlobal } from '../../../context/global/globalContext';

const GridCase = ({ columns, caseType, operatorName }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { isLoading, totalClaims, cases, paginationModel, setPaginationModel, } = useGetCasesActions({
        caseType,
        employeeId: operatorName,
    });


    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Box margin={"15px 0 0 15px"}
        >
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
                    onPaginationModelChange={(newModel) => {
                        setPaginationModel(newModel);
                    }}
                    slots={{ toolbar: CustomToolBar }}
                    hideFooterSelectedRowCount
                    loading={isLoading}
                />
            </GridContainer>
        </Box>
    );
};

export default GridCase;
