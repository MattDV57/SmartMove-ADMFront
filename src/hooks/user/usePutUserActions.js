import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";

export const usePutUserActions = ( { adminId } ) => {
    const { callApi, isLoading } = userService.usePutUser();
    const { showAlert } = useAlert();

    const putUser = async ( newUser ) => {
            
            const response = await callApi( { dataApi: newUser, addEndpoint: `adminId=${adminId}`} );
    
            if(response.hasError){
                showAlert('Error al actualizar usuario', 'error');
                
            } else {
                showAlert('Usuario actualizado correctamente', 'success');
            }
            
            return response.hasError;
        }



    return {
        putUser,
        isLoading,
    }
}