import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

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
        localStorage.setItem('userRole', '')
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
