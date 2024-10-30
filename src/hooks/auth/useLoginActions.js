/* eslint-disable no-undef */
import { useEffect } from "react"
import usePostLogin from "../../services/auth/usePostLogin"
import { useAlert } from "../../context/AlertProvider"
import { useAuth } from "../../context/AuthProvider"
import CryptoJS from 'crypto-js';

const useLoginActions = () => {

    const { auth, setAuth } = useAuth()
    const { callApi, data, isError, isLoading } = usePostLogin()
    const { showAlert } = useAlert();

    useEffect(() => {
        if (isError) {
            showAlert('Ocurrió un error al inciar sesión. Verifique los datos e intente nuevamente.', 'error')
        }
    }, [isError])

    useEffect(()=>{
        if(isError) return
        if(!data) return

        if(!isLoading && data){
            localStorage.setItem('smartmove-token', data.accessToken)   
            localStorage.setItem('smartmove-userid', data._id)   
            localStorage.setItem('userRole', data.accessRole)
            // storeHashedRole(data.accessRole)
            
            setAuth({
                ...auth,
                id: data._id,
                ...data
            })
        }

    }, [isLoading, data])


    const storeHashedRole = (role) => {
        const saltedRole = role + process.env.VITE_SALTY_HASH;
        const hashedRole = CryptoJS.SHA256(saltedRole).toString(); 
        localStorage.setItem('userRole', hashedRole); 
    };

    return{
        isLoadingLogin: isLoading,
        callApiLogin: callApi,
    }

}

export default useLoginActions