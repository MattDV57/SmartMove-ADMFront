import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { LinearProgress } from '@mui/material';

const AuthLayout = () => {

    const { auth, cargando } = useAuth();

    if (cargando) {
        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LinearProgress />
            </div>
        )
    }

    return (
        <>
            {
                !auth?.id ?
                    (
                        <Outlet />
                    ) : (
                        <Navigate to="/" />
                    )
            }
        </>

    )
}

export default AuthLayout