/* eslint-disable react/prop-types */
import React from 'react';
import { useModal } from '../../../context/ModalProvider';
import { columnsCase } from '../../components/Case/ColumnsCase';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';
import { useGetCasesActions } from '../../../hooks/case/useGetCasesActions';
import { LinearProgress } from '@mui/material';

export const CaseView = ({ title, casePath, operatorName, caseType }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { openModal } = useModal();

    // const [page, setPage] = React.useState(1);
    // const [limit, setLimit] = React.useState(25);

    // const { data, isLoading, isError, totalPages } = useGetCasesActions(
    //     {
    //         caseType,
    //         employeeId: operatorName,
    //         page,
    //         limit
    //     });

    // const pagination = {
    //     page,
    //     setPage,
    //     limit,
    //     setLimit,
    //     totalPages,
    // };

    const cols = columnsCase(openModal, colors.priority, casePath);

    //TODO: Diseñar el chat (Modal(?))
    //TODO: FIX Api Call

    return (
        <div>


            <>
                <GridCase title={title} columns={cols}
                    operatorName={operatorName} caseType={caseType}
                //  pagination={pagination} data={data} 
                />
                <ModalManager />
            </>


        </div>
    );
};