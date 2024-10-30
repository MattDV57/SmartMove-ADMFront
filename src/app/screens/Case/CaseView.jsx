/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ModalManager from '../../components/ModalManager';
import { Box, Tab, Tabs } from '@mui/material';
import { CASE_PATHS, CASE_TABS_MAP } from '../../../common/types';
import { useNavigate } from 'react-router-dom';
import GridCase from './Grid/GridCase';
import { useAuth } from '../../../context/AuthProvider';
import { ACCESS_CONTROL } from '../../../common/rolesPermissions';

export const CaseView = ({ casePath, caseType }) => {

    const { auth } = useAuth();

    const [accessRole, setAccessRole] = useState(localStorage.getItem('userRole') || "Unauthorized")

    const navigate = useNavigate();

    const tabCases = (CASE_TABS_MAP[caseType]).filter(tab => ACCESS_CONTROL.roles[accessRole].views.has(tab.value));

    const currentTabIndex = tabCases.findIndex(tab => tab.value === casePath);

    const [currentTab, setCurrentTab] = useState(currentTabIndex);

    //TODO: Change logic for user claimer
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
                    {tabCases.map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            </Box>

            <>
                <GridCase
                    operatorUsername={needOperatorUsername ? auth.username : ""}
                    caseType={caseType}
                    casePath={casePath}
                    accessRole={accessRole}
                />
            </>

            <ModalManager />

        </Box>
    );
};