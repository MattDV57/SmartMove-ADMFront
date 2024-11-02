import React, { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import SideBar from '../app/components/global/SideBar'
import { Box, LinearProgress, useMediaQuery } from '@mui/material'
import TopBar from '../app/components/global/TopBar'
import { useMode } from '../styles/theme'
import { useGlobal } from '../context/global/globalContext'
import { ACCESS_CONTROL_ALLOWED_ROLES_VIEW, SIDEBAR_SIZE } from '../common/types'
import { ACCESS_CONTROL } from '../common/rolesPermissions'
import { useAuth } from '../context/AuthProvider'
import { Forbidden } from '../app/screens/Error/Forbidden'

const ProtectedRoute = () => {
    const { globalState, toggleSidebar } = useGlobal();
    const { auth, isLoading } = useAuth();

    const accessRole = auth.accessRole !== undefined ? auth.accessRole : "Undefined";


    const location = useLocation();
    let isAllowedToVIEW = false;

    const [theme] = useMode()


    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sidebarWidth = isMobile ? (globalState.sidebarOpen
        ? SIDEBAR_SIZE.CLOSE_MOBILE : SIDEBAR_SIZE.OPEN - 1) : (globalState.sidebarOpen ? SIDEBAR_SIZE.CLOSE : SIDEBAR_SIZE.OPEN - 1);

    isAllowedToVIEW = ACCESS_CONTROL.roles[accessRole].views.has(location.pathname)


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
                auth?._id
                    ?
                    (

                        <Box width="100%" height="100%" display='flex' position='relative'>
                            <SideBar accessRole={accessRole} />
                            <Box width="100%" height="100%"
                                sx={{
                                    paddingLeft: `${sidebarWidth}px`,
                                    width: '100%',
                                    minHeight: '100vh',
                                    transition: 'padding-left 0.3s ease',
                                }}
                            >
                                <TopBar toggleSidebar={toggleSidebar} accessRole={accessRole} />
                                {
                                    isAllowedToVIEW
                                        ? <Outlet />
                                        : <Forbidden />
                                }
                            </Box>
                        </Box>
                    ) :
                    (
                        <Navigate to={'/auth'} />
                    )
            }
        </>
    )
}

export default ProtectedRoute