import UseApi from "../hooks/useApi";


export const caseService = {

    useGetAllCases: ( ) => UseApi(
    `/claim`,
    {
        method: 'GET',
        // callOnLoad: true,
    }
    ),

    useGetMyCases: ( { employeeId } ) => UseApi(
        `/claim/operators/${employeeId}`,
        {
            method: 'GET',
            // callOnLoad: true,
        }
    ),

    useEditCase: ( {claimId} ) => UseApi(
        `/claim/${claimId}`,
        {
            method: 'PUT',
        }
    ),
    
    
    usePutOperatorInCase: ( {claimId, employeeId} ) => UseApi(
        `/claim/${claimId}/operators/${employeeId}`,
        {
            method: 'PUT',
        }

    ),

    useGetDashboard: () => UseApi(
        `/claim/dashboard`,
        {
            method: 'GET',
        }
    ),

}


{/*

const endpoints = { 
    getAllCases:`/claims/${caseType}?page=${page}&limit=${limit}`, order: fechaDesc
    getMyCases: `/claims/${caseType}/operators/${userId}?page=${page}&limit=${limit}`, order: fechaDesc
    editCase: `/claims/${claimId}`,
    putOperatorInCase: `/claims/${claimId}/operators/${userId}` 
    getLogs: `/logs?logsType=${logType}&page=${page}&limit=${limit}` order: fechaDesc
}

*/}