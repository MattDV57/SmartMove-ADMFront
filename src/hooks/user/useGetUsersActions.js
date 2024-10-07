import { useEffect, useReducer } from "react";
import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";
import { data } from "../../app/components/EmployeesGrid/EMPLOYEES_DATA";


export const useGetUsersActions = (adminId, state, dispatch) => {
    const { showAlert } = useAlert();
    const { callApi, isLoading } = userService.useGetUsers({ adminId });

    const handleGetUsers = async () => {
        const {response, hasError} = await callApi({}, `?adminId=${"67042fc40576f2fa95f8f749"}&page=${state.paginationModel.page}&limit=${state.paginationModel.pageSize}`);
        if(hasError){
            showAlert('Error al cargar los empleados', 'error');
            return;
        }
         dispatch({ type: 'SET_ROWS', payload: { foundUsersPaginated: response.foundUsersPaginated, totalUsers: response.totalUsers } });
        
    }


    useEffect(() => {
        handleGetUsers();
    }, [state.paginationModel.page, state.paginationModel.pageSize]);

    return {
        isLoading,
    }
}
