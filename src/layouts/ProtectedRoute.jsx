import React, { useState } from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import SideBar from '../app/components/SideBar'

import { Box,useMediaQuery } from '@mui/material'

import TopBar from '../app/components/TopBar'

import useAuth from '../hooks/useAuth'

import { useMode } from '../styles/theme'

const ProtectedRoute = () => {

    const { auth, cargando } = useAuth();
    
    const [theme] = useMode()

    const [isCollapsed, setIsCollapsed] = useState(false)
    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const sidebarWidth = isMobile ? (isCollapsed ? 0 : 249) : (isCollapsed ? 80 : 249);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }


    if (cargando) {
        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <>
            {
                auth?.id ?
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
                    ) : (
                        <Navigate to={'/auth'} />
                    )
            }
        </>
    )
}

export default ProtectedRoute