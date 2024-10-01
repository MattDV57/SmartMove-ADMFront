import { useContext, useEffect } from "react"

import usePostLogin from "../../services"

const useLoginActions = ({
    setUserData,
    navigate
}) => {

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
            // TODO: Ver en conjunto con el back que data trae cuando se hace el login exitoso
            // const { jwt, ...userData } = data
            // localStorage.setItem('smartmove-token', jwt)   
            // setUserData(userData, jwt)
            navigate('/')
        }

    }, [isLoading, data])

    return{
        isLoadingLogin: isLoading,
        callApiLogin: callApi,
    }

}

export default useLoginActions