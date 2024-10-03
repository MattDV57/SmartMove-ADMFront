import UseApi from "../../hooks/useApi";


export const useGetAllCases = ( { caseType, page, limit } ) => UseApi(
    `/claims/${caseType}?page=${page}&limit=${limit}`,
    {
        method: 'GET',
        callOnLoad: true,
    }
)



export const useGetMyCases = ( { caseType, employeeId, page, limit } ) => UseApi(
    `/claims/${caseType}/operators/${employeeId}?page=${page}&limit=${limit}`,
    {
        method: 'GET',
        callOnLoad: true,
    }
)