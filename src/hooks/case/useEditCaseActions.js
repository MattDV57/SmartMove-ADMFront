import { useEditCase } from "../../services/case/usePutCase";
import { useAlert } from "../../context/AlertProvider";


const useEditCaseActions = ({ claimId }) => {

    const { callApi, isLoading, data, isError } = useEditCase({ claimId });
    const { showAlert } = useAlert();


    const handleEditCase = async ({ newClaim, hasChanged }) => {

        if(!hasChanged){
            showAlert('No se han realizado cambios', 'info');
            return;
        }

        const response = await callApi( newClaim );
        
        if(response.hasError){
            showAlert('Error al editar caso', 'error');
            return;
        }

        showAlert('Caso editado correctamente', 'success');
    };


    return {
        isLoading,
        handleEditCase,
        isError,
    }
}




export default useEditCaseActions;