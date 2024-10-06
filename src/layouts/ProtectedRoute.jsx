import React, { useState } from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import SideBar from '../app/components/global/SideBar'

import { Box, LinearProgress, useMediaQuery } from '@mui/material'

import TopBar from '../app/components/global/TopBar'

import useAuth from '../hooks/useAuth'

import { useMode } from '../styles/theme'
import { useGlobal } from '../context/global/globalContext'
import { ACCESS_CONTROL_ALLOWED_ROLES_VIEW, SIDEBAR_SIZE } from '../common/types'

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { globalState, toggleSidebar } = useGlobal();
    const { auth, isLoading } = useAuth();

    const [theme] = useMode()


    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sidebarWidth = isMobile ? (globalState.sidebarOpen
        ? SIDEBAR_SIZE.CLOSE_MOBILE : SIDEBAR_SIZE.OPEN - 1) : (globalState.sidebarOpen ? SIDEBAR_SIZE.CLOSE : SIDEBAR_SIZE.OPEN - 1);

    const isAllowedToAccessControl = ACCESS_CONTROL_ALLOWED_ROLES_VIEW.includes(auth?.accessRole);



    if (isLoading) {
        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LinearProgress />
            </div>
        )
    }

    return (
        <>
            {
                auth?.id && allowedRoles.length === 0
                    ?
                    (

                        <Box width="100%" height="100%" display='flex' position='relative'>
                            <SideBar isAllowedToAccessControl={isAllowedToAccessControl} />
                            <Box width="100%" height="100%"
                                sx={{
                                    paddingLeft: `${sidebarWidth}px`,
                                    width: '100%',
                                    minHeight: '100vh',
                                    transition: 'padding-left 0.3s ease',
                                }}
                            >
                                <TopBar toggleSidebar={toggleSidebar} />
                                <Outlet />
                            </Box>
                        </Box>
                    ) :

                    allowedRoles.length > 0 && allowedRoles.includes(auth?.accessRole)
                        ?
                        (
                            <Outlet />
                        )
                        :
                        (
                            <Navigate to={'/auth'} />
                        )
            }
        </>
    )
}

export default ProtectedRoute