import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material';
import { useAuth } from '../context/AuthProvider';

const AuthLayout = () => {

    const { auth, isLoading } = useAuth();

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
                !auth?._id ?
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