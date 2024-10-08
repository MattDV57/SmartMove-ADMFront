import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    // const userData = {
    //     // _id: "67042fc40576f2fa95f8f749",

    // fullName: "Pablo Rodríguez",
    // birthDate: "1985-05-15T00:00:00.000Z",
    // email: "admin@smartmove.com",
    // phone: "1156781234",
    // address: "Calle Principal 123",
    // location: "Capital Federal",
    // position: "Gerente de Proyectos",
    // department: "Gestión de Proyectos",
    // password: "admin",
    // accessRole: "Admin",
    // };

    const [auth, setAuth] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = async () => {

        const token = localStorage.getItem('smartmove-token')
        const userid = localStorage.getItem('smartmove-userid')

        if (!token) {
            setIsLoading(false)
            return
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${`/users/${userid}/profile`}` || '', {
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


            setAuth({
                id: response._id,
                ...response
            })



        } catch (error) {

            setAuth({})

        }

        setIsLoading(false)


    }

    const logoutUser = () => {
        setAuth({})
        localStorage.setItem('smartmove-token', '')
        localStorage.setItem('smartmove-userid', '')
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoading,
                logoutUser,
                authenticateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
