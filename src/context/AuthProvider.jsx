import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const userData = {
        id: '1234',
        nombreCompleto: "Pablo Rodríguez",
        idEmpleado: "EMP-001",
        fechaNacimiento: "1985-05-15",
        email: "pablo@empresa.com",
        telefono: "+5491156781234",
        direccion: "Calle Principal 123",
        localidad: "Capital Federal",
        puesto: "Gerente de Proyectos",
        departamento: "Gestión de Proyectos",
        fechaIngreso: "2015-03-01",
        rolAcceso: "Gerente"
    };

    const [auth, setAuth] = useState({
        id: '',
        ...userData,
    })
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        autenticarUsuario()
    }, [])

    const autenticarUsuario = async () => {

        const token = localStorage.getItem('smartmove-token')

        if (!token) {
            setCargando(false)
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

        setCargando(false)


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
                cargando,
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