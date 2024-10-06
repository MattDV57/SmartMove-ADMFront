/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useModal } from '../../../context/ModalProvider';
import { columnsCase } from '../../components/Case/ColumnsCase';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';
import { Box, Tab, Tabs } from '@mui/material';
import { CASE_TABS_MAP } from '../../../common/types';
import { useNavigate } from 'react-router-dom';

export const CaseView = ({ title, casePath, operatorName, caseType }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { openModal } = useModal();

    const navigate = useNavigate();

    const tabCases = CASE_TABS_MAP[caseType];

    const currentTabIndex = tabCases.findIndex(tab => tab.value === casePath);

    const [currentTab, setCurrentTab] = useState(currentTabIndex);




    const handleTabChange = () => {
        const newTab = tabCases.findIndex(tab => tab.value !== casePath);
        setCurrentTab(newTab);
        navigate(tabCases[newTab].value);
    }


    const cols = columnsCase(openModal, colors.priority, casePath);


    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="case tabs">
                    {CASE_TABS_MAP[caseType].map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            </Box>

            <>
                <GridCase title={title} columns={cols}
                    operatorName={operatorName} caseType={caseType}


                />
            </>

            <ModalManager />

        </Box>
    );
};