import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";

export const usePutUserActions = ( { adminId, userId } ) => {

    const { callApi, isLoading } = userService.usePutUser( { userId } );
    const { showAlert } = useAlert();

    const handlePutUser = async ( newUser ) => {
            
            const response = await callApi( newUser, `?adminId=${adminId}` );
    
            if(response.hasError){
                showAlert('Error al actualizar usuario', 'error');
                
            } else {
                showAlert('Usuario actualizado correctamente', 'success');
            }
            
            return response.hasError;
        }



    return {
        handlePutUser,
        isLoading,
    }
}