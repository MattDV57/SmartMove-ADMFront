import UseApi from "../hooks/useApi";


export const caseService = {

    useGetAllCases: ( { caseType, page, limit } ) => UseApi(
    `/claims/${caseType}?page=${page}&limit=${limit}`,
    {
        method: 'GET',
        callOnLoad: true,
    }
    ),

    useGetMyCases: ( { caseType, employeeId, page, limit } ) => UseApi(
        `/claims/${caseType}/operators/${employeeId}?page=${page}&limit=${limit}`,
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



