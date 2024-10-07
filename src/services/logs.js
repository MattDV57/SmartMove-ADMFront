import UseApi from "../hooks/useApi";




export const logsService = {
    // query params: performedBy, search, page, limit
    useGetLogs: () => UseApi (      
        `/logs`,
        {
            method: "GET",
        }
    ),

};