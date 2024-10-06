import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const userData = {
        id: '1234',
        fullName: "Pablo Rodríguez",
        employeeId: "EMP-001",
        birthDate: "1985-05-15",
        email: "pablo@empresa.com",
        phone: "1156781234",
        address: "Calle Principal 123",
        location: "Capital Federal",
        position: "Gerente de Proyectos",
        department: "Gestión de Proyectos",
        entryDate: "2015-03-01",
        accessRole: "Admin"
    };

    const [auth, setAuth] = useState({
        id: '',
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

            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${'/user/perfil'}` || '', {
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

            setAuth(response)

        } catch (error) {

            setAuth({})

        }

        setIsLoading(false)


    }

    const cerrarSesionAuth = () => {
        setAuth({})
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