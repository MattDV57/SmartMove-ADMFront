/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useModal } from '../../../context/ModalProvider';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';
import { Box, Tab, Tabs } from '@mui/material';
import { CASE_TABS_MAP } from '../../../common/types';
import { useNavigate } from 'react-router-dom';

export const CaseView = ({ casePath, operatorName, caseType }) => {

    const navigate = useNavigate();

    const tabCases = CASE_TABS_MAP[caseType];

    const currentTabIndex = tabCases.findIndex(tab => tab.value === casePath);

    const [currentTab, setCurrentTab] = useState(currentTabIndex);




    const handleTabChange = () => {
        const newTab = tabCases.findIndex(tab => tab.value !== casePath);
        setCurrentTab(newTab);
        navigate(tabCases[newTab].value);
    }


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
                <GridCase
                    operatorName={operatorName}
                    caseType={caseType}
                    casePath={casePath}
                />
            </>

            <ModalManager />

        </Box>
    );
};