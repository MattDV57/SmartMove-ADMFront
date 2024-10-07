import { useContext, useEffect } from "react"

import usePostLogin from "../../services/auth/usePostLogin"

import useAuth from '../useAuth'

import { useAlert } from "../../context/AlertProvider"

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
            setAuth({
                ...auth,
                id: data._id,
                ...data
            })
        }

    }, [isLoading, data])

    return{
        isLoadingLogin: isLoading,
        callApiLogin: callApi,
    }

}

export default useLoginActions