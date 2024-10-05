import UseApi from "../hooks/useApi";




export const logsService = {
    // query params: search, page, limit
    useGetLogs: () => UseApi (      
        `/logs`,
        {
            method: "GET",
            callOnLoad: true
        }
    ),

};