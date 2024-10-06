import { useEffect, useReducer } from "react";
import { useAlert } from "../../context/AlertProvider";
import { userService } from "../../services/user";
import { data } from "../../app/components/EmployeesGrid/EMPLOYEES_DATA";


export const useGetUsersActions = (adminId, state, dispatch) => {
    const { showAlert } = useAlert();
    const { callApi, isLoading } = userService.useGetUsers({ adminId });

    // const handleGetUsers = async () => {
    //     const {response, hasError} = await callApi({}, `?adminId=${adminId}&page=${state.paginationModel.page}&limit=${state.paginationModel.pageSize}`);
    //     if(hasError){
    //         showAlert('Error al cargar los empleados', 'error');
    //         return;
    //     }
    //      dispatch({ type: 'SET_ROWS', payload: { rows: response.foundEmployeesPaginated, totalEmployees: response.totalEmployees } });
        
    // }

    const handleGetUsersLocal = async () => {
        const response = data;
        if(response.hasError){
            showAlert('Error al cargar los empleados', 'error');
            return [];
        }
        
        dispatch({ type: 'SET_ROWS', payload: { rows: data, totalEmployees: data.length } });
    }

    useEffect(() => {
        // handleGetUsers();
        handleGetUsersLocal();
    }, [state.paginationModel.page, state.paginationModel.pageSize]);

    return {
        isLoading,
    }
}
