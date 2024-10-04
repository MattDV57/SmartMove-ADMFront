/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { caseService } from "../../services/case";



export const useGetCasesActions = ( {caseType, employeeId = "", page, limit} ) => {
    const [totalPages, setTotalPages] = useState(1);

    const { callApi, isLoading, data, isError } = employeeId 
            ? caseService.useGetMyCases({ caseType, employeeId, page, limit })
            : caseService.useGetAllCases({ caseType, page, limit });


    useEffect(() => {
        const fetchData = async () => {
            await callApi({ addEndpoint: `?page=${page}&limit=${limit}` });
        }

        fetchData();
    }, [page, limit, callApi]); 

    useEffect(() => {
        if(isError) return;
    }, [isError])


    useEffect(()=>{
        if(isError) return
        if(!data) return

        if(!isLoading && data){
            setTotalPages(data.totalPages)
        }




    

    }, [isLoading, data, isError])


    return {
        isLoading,
        isError,
        data,
        totalPages,
    }
}