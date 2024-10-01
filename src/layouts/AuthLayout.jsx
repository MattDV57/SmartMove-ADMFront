import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const AuthLayout = () => {

    const { auth, cargando } = useAuth();

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