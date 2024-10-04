import UseApi from "../hooks/useApi";




export const userService = {

    useGetUsers: ( { page, limit } ) => UseApi (
        `/users`,
        {
            method: "GET",
            callOnLoad: true
        }
    ),

    usePostUser: () => UseApi (
        `users`,
        {
            method: "POST"
        }
    ),

    useDeleteUser: ( { adminId, userId } ) => UseApi (
        `/users/${userId}?adminId=${adminId}`,
        {
            method: 'DELETE',
        }
    ),

    usePutUser: ( { adminId, userId } ) => UseApi (
        `/users/${userId}?adminId=${adminId}`,
        {
            method: 'PUT'
        }
    )


}
