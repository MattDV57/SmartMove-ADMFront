import UseApi from "../hooks/useApi";


export const caseService = {

    useGetAllCases: ( { caseType } ) => UseApi(
    `/claims/${caseType}`,
    {
        method: 'GET',
        callOnLoad: true,
    }
    ),

    useGetMyCases: ( { caseType, employeeId } ) => UseApi(
        `/claims/${caseType}/operators/${employeeId}`,
        {
            method: 'GET',
            callOnLoad: true,
        }
    ),

    useEditCase: ( {claimId} ) => UseApi(
        `/claims/${claimId}`,
        {
            method: 'PUT',
        }
    ),
    
    
    usePutOperatorInCase: ( {claimId, employeeId} ) => UseApi(
        `/claims/${claimId}/operators/${employeeId}`,
        {
            method: 'PUT',
        }

    )

}


{/*

const endpoints = { 
    getAllCases:`/claims/${caseType}?page=${page}&limit=${limit}`,
    getMyCases: `/claims/${caseType}/operators/${userId}?page=${page}&limit=${limit}`,
    editCase: `/claims/${claimId}`,
    putOperatorInCase: `/claims/${claimId}/operators/${userId}`
}

*/}