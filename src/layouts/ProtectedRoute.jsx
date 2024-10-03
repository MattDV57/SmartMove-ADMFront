import React, { useState } from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import SideBar from '../app/components/global/SideBar'

import { Box, LinearProgress, useMediaQuery } from '@mui/material'

import TopBar from '../app/components/global/TopBar'

import useAuth from '../hooks/useAuth'

import { useMode } from '../styles/theme'

const ProtectedRoute = ({ allowedRoles = [] }) => {

    const { auth, isLoading } = useAuth();

    const [theme] = useMode()

    const [isCollapsed, setIsCollapsed] = useState(false)

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sidebarWidth = isMobile ? (isCollapsed ? 0 : 249) : (isCollapsed ? 80 : 249);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }


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
                            <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
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