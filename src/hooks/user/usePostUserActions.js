import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";



export const usePostUserActions = ( { adminId } ) => {

    const { callApi, isLoading, } = userService.usePostUser();
    const { showAlert } = useAlert();

    const handlePostUser = async ( newUser ) => {

        const response = await callApi( newUser, `?adminId=${adminId}` );

        if(response.hasError){
            showAlert('Error al crear usuario', 'error');
        } else {
            showAlert('Usuario creado correctamente', 'success');
        }

        

        return response.hasError;
    }


    return {
        handlePostUser,
        isLoading,
    }
}