/* eslint-disable react/prop-types */

import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import { GridContainer } from '../GridContainer';
import { useGetCasesActions } from '../../../hooks/case/useGetCasesActions';
import { CustomToolBar } from '../CustomToolBar';
import { columnsCase } from './ColumnsCase';
import { useModal } from '../../../context/ModalProvider';

const GridCase = ({ caseType, operatorUsername, casePath }) => {
    const { openModal } = useModal();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { isLoading, totalClaims, cases, paginationModel, setPaginationModel, setCases } = useGetCasesActions({
        caseType,
        operatorUsername,
    });


    const handleEditSaved = (newClaim) => {
        const newCases = cases.map((claim) => {
            if (claim._id === newClaim._id) {
                return newClaim;
            }
            return claim;
        });
        setCases(newCases);

    }

    const cols = columnsCase(openModal, colors.priority, casePath, handleEditSaved);

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
                    columns={cols}
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
