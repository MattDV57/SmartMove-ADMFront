import { userService } from "../../services/user";



export const useGetUsersActions = (adminId) => {
    const { callApi, isLoading } = userService.useGetUsers({ adminId });

    return {
        getUsers: callApi,
        isLoading,
    }
}
