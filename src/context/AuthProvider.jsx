import { useState, useEffect, createContext, useContext } from 'react'
import { jwtDecode } from 'jwt-decode';
import { KeyboardReturnOutlined } from '@mui/icons-material';
import { INTERNAL_ROLES } from '../common/rolesPermissions';
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const localUserPermissions = localStorage.getItem('smartmove-user-permissions');
    const options = (method = 'GET') => ({
        method,
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = async () => {

        setIsLoading(true);

        const userId = localStorage.getItem('smartmove-userid');

        if (!userId) {
            await authExternalUser()
            setIsLoading(false)
            return;
        }

        getUserProfile(userId)

        setIsLoading(false)
    }

    const getUserProfile = async (userId) => {
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${`/users/${userId}/profile`}`, options());

            if (!response.ok) throw new Error('Failed to authenticate');

            const userData = await response.json();

            setAuth({
                ...userData,
            });

        } catch (error) {
            console.error(error);
        }

    }


    const authExternalUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}${`/login/user-session`}`, options());

            if (!response.ok) throw new Error('Failed to authenticate');

            const data = await response.json();

            localStorage.setItem('smartmove-user-permissions', JSON.stringify(data.USER_PERMISSIONS));

            setAuth({ ...data.user, _id: data.user.userId });

            if ([INTERNAL_ROLES.ADMIN, INTERNAL_ROLES.SOPORTE].includes(data.user.accessRole)) {
                await getUserProfile(data.user.userId)
            }

        } catch (error) {
            setAuth({})
        }

    }

    const logoutUser = async () => {
        try {
            setAuth({})
            localStorage.removeItem('smartmove-userid')
            localStorage.removeItem('smartmove-user-permissions')
            fetch(`${import.meta.env.VITE_API_URL_BACKEND}${`/login/logout`}`, options('POST'));
        } catch (error) {
            console.error(error)
        }
    }

    const removeCredentials = () => {
        setAuth({})
        localStorage.removeItem('smartmove-userid')
        localStorage.removeItem('smartmove-user-permissions')
    }



    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoading,
                logoutUser,
                authenticateUser,
                removeCredentials,
                USER_PERMISSIONS: localUserPermissions ? JSON.parse(localUserPermissions) : {}

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
