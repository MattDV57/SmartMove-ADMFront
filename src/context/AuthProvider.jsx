import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const userData = {
        _id: "67042fc40576f2fa95f8f749",
        entryDate: "2015-03-01T00:00:00.000Z",
        fullName: "Pablo Rodríguez",
        birthDate: "1985-05-15T00:00:00.000Z",
        email: "admin@smartmove.com",
        phone: "1156781234",
        address: "Calle Principal 123",
        location: "Capital Federal",
        position: "Gerente de Proyectos",
        department: "Gestión de Proyectos",
        password: "admin",
        accessRole: "Admin",
        username: "pablitoMotos123", // original es "admin", lo cambio para que puedan probra mis reclamos y mediaciones
    };

    const [auth, setAuth] = useState({
        id: userData._id,
        ...userData,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        autenticarUsuario()
    }, [])

    const autenticarUsuario = async () => {

        const token = localStorage.getItem('smartmove-token')

        if (!token) {
            setIsLoading(false)
            return
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${'/user/profile'}` || '', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(async (resp) => {
                return await resp.json()
            }).catch((error) => {
                console.log({ error })
                return null
            });

            // setAuth(response)

        } catch (error) {

            // setAuth({})

        }

        setIsLoading(false)


    }

    const cerrarSesionAuth = () => {
        setAuth({
            id: '',
            ...userData
        })
        localStorage.setItem('smartmove-token', '')
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoading,
                cerrarSesionAuth,
                autenticarUsuario,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;