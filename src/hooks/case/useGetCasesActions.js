/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useGetAllCases, useGetMyCases } from "../../services/case/useGetCases";



export const useGetCasesActions = ( {caseType, employeeId = "", page, limit} ) => {
    const [totalPages, setTotalPages] = useState(1);

    const { callApi, isLoading, data, isError } = employeeId 
            ? useGetMyCases({ caseType, employeeId, page, limit })
            : useGetAllCases({ caseType, page, limit });


    useEffect(() => {
        const fetchData = async () => {
            await callApi()
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