import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";



export const usePostUserActions = ( { adminId } ) => {
    const { callApi, isLoading, } = userService.usePostUser();
    const { showAlert } = useAlert();

    const postUser = async ( newUser ) => {
        console.log(newUser , 'newUser');
        const response = await callApi( {dataApi: newUser, addEndpoint: `?adminId=${adminId}`} );
        console.log("THIS IS REsponse", newUser)
        if(response.hasError){
            showAlert('Error al crear usuario', 'error');
            return;
        }

        showAlert('Usuario creado correctamente', 'success');

    }


    return {
        postUser,
        isLoading,
    }
}