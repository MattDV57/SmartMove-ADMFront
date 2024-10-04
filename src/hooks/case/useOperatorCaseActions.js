import { useAlert } from "../../context/AlertProvider";
import { caseService } from "../../services/case";


const useOperatorCaseActions = ({ claimId, employeeId }) => {

    const { callApi, isLoading } = caseService.usePutOperatorInCase({ claimId, employeeId });
    const { showAlert } = useAlert();


    const assignOperator = async () => {
        const response = await callApi();
        

        if(response.hasError){
            showAlert('Error al asignar operador', 'error');
            return;
        }

        showAlert('Operador asignado correctamente', 'success');
    };


    return {
        isLoading,
        assignOperator,
    };
    };

export default useOperatorCaseActions;
