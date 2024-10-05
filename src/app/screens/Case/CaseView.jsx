/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useModal } from '../../../context/ModalProvider';
import { columnsCase } from '../../components/Case/ColumnsCase';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';
import { useGetCasesActions } from '../../../hooks/case/useGetCasesActions';
import { Box, LinearProgress, Tab, Tabs } from '@mui/material';
import { CASE_TABS_MAP, CASE_PATHS, CASE_PATH_ORDER } from '../../../common/types';
import { useLocation, useNavigate } from 'react-router-dom';

export const CaseView = ({ title, casePath, operatorName, caseType }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { openModal } = useModal();

    const navigate = useNavigate();
    const location = useLocation();

    const tabCases = CASE_TABS_MAP[caseType];

    const currentTabIndex = tabCases.findIndex(tab => tab.value === casePath);

    console.log('currentTabIndex', currentTabIndex);
    const [currentTab, setCurrentTab] = useState(currentTabIndex);


    const handleTabChange = () => {
        const newTab = tabCases.findIndex(tab => tab.value !== casePath);
        setCurrentTab(newTab);
        navigate(tabCases[newTab].value);

        // const selectedTab = CASE_PATH_ORDER[casePath][currentTab];
        // console.log('selectedTab', selectedTab);

    }

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
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="case tabs">
                    {CASE_TABS_MAP[caseType].map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            </Box>
            <GridCase title={title} columns={cols}
                operatorName={operatorName} caseType={caseType}
            //  pagination={pagination} data={data} 
            />
            <ModalManager />



        </Box>
    );
};