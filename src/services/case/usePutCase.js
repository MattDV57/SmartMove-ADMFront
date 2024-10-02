import UseApi from "../../hooks/useApi";



// No existe el endpoint, pero no tiene sentido que haya varios put endpoints para una row.
export const usePutCase = ( {claimId} ) => UseApi(
    `/claims/${claimId}`,
    {
        method: 'PUT',
    }
)


export const usePutOperatorInCase = ( {claimId, employeeId} ) => UseApi(
    `/claims/${claimId}/operators/${employeeId}`,
    {
        method: 'PUT',
    }
)



