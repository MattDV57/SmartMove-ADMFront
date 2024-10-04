import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";


export const useDeleteUserActions = ( { adminId } ) => {
    const { callApi, isLoading, } = userService.useDeleteUser();
    const { showAlert } = useAlert();

    const deleteUser = async ( {userId} ) => {

        const response = await callApi( {addEndpoint: `/${userId}?adminId=${adminId}`} );

        if(response.hasError){
            showAlert('Error al eliminar usuario', 'error');
            return;
        }

        showAlert('Usuario eliminado correctamente', 'success');

        return response.hasError;
    }
    return {
        deleteUser,
        isLoading,
    }
}
