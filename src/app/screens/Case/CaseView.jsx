/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useModal } from '../../../context/ModalProvider';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import ModalManager from '../../components/ModalManager';
import GridCase from '../../components/Case/GridCase';
import { Box, Tab, Tabs } from '@mui/material';
import { CASE_PATHS, CASE_TABS_MAP } from '../../../common/types';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const CaseView = ({ casePath, caseType }) => {

    const { auth } = useAuth();

    const navigate = useNavigate();

    const tabCases = CASE_TABS_MAP[caseType];

    const currentTabIndex = tabCases.findIndex(tab => tab.value === casePath);

    const [currentTab, setCurrentTab] = useState(currentTabIndex);

    const needOperatorUsername = [CASE_PATHS.MY_CLAIMS, CASE_PATHS.MY_ARBITRATIONS].includes(casePath);




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
                    operatorUsername={needOperatorUsername ? auth.username : ""}
                    caseType={caseType}
                    casePath={casePath}
                />
            </>

            <ModalManager />

        </Box>
    );
};