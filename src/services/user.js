import UseApi from "../hooks/useApi";


export const userService = {

    useGetUsers: () => UseApi (
        `/users`,
        {
            method: "GET",
        }
    ),

    usePostUser: () => UseApi (
        `/users`,
        {
            method: "POST"
        }
    ),

    useDeleteUser: () => UseApi (
        `/users`,
        {
            method: 'DELETE',
        }
    ),

    usePutUser: () => UseApi (
        `/users`,
        {
            method: 'PUT'
        }
    )


}
