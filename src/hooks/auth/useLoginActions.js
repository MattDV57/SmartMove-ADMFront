import { useContext, useEffect } from "react"

import usePostLogin from "../../services/auth/usePostLogin"

import useAuth from '../useAuth'

const useLoginActions = () => {

    const { auth, setAuth } = useAuth()
    const { callApi, data, isError, isLoading } = usePostLogin()

    useEffect(() => {
        if (isError) {
            // TODO: mostrar un modal que diga que ocurrió un error
        }
    }, [isError])

    useEffect(()=>{
        if(isError) return
        if(!data) return

        if(!isLoading && data){
            localStorage.setItem('smartmove-token', data.accessToken)   
            setAuth({
                ...auth,
                id: data.accessToken,
                accessToken: data.accessToken
            })
        }

    }, [isLoading, data])

    return{
        isLoadingLogin: isLoading,
        callApiLogin: callApi,
    }

}

export default useLoginActions