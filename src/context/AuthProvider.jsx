import { useState, useEffect, createContext, useContext } from 'react'
import { jwtDecode } from 'jwt-decode';
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

        setIsLoading(true);

        const userId = localStorage.getItem('smartmove-userid');

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${`/users/${userId}/profile`}` || '', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to authenticate');

            const userData = await response.json();


            setAuth({
                ...userData,
                _id: userData._id,
            });

        } catch (error) {

            setAuth({})

        }

        setIsLoading(false)


    }

    const logoutUser = () => {
        setAuth({})
        localStorage.removeItem('smartmove-userid', '')
        localStorage.removeItem('smartmove-user-permissions')
    }

    const localUserPermissions = localStorage.getItem('smartmove-user-permissions');

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoading,
                logoutUser,
                authenticateUser,
                USER_PERMISSIONS: localUserPermissions ? JSON.parse(localUserPermissions) : {}

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
