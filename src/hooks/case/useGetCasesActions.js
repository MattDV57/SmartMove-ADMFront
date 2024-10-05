/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { caseService } from "../../services/case";
import { MAP_CASE_TYPE } from "../../common/types";
import { useAlert } from "../../context/AlertProvider";


export const useGetCasesActions = ( {caseType, employeeId = ""} ) => {
    const { showAlert } = useAlert();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalClaims, setTotalClaims] = useState(1);
    const [paginationModel, setPaginationModel] = useState({
        page: page - 1,
        pageSize: limit,
    });

    const [cases, setCases] = useState([]);

    const caseType_ES = MAP_CASE_TYPE[caseType];

    const { callApi, isLoading, data, isError } = employeeId 
            ? caseService.useGetMyCases( { employeeId } )
            : caseService.useGetAllCases();

    const handleGetCases = async () => {
        const response = await callApi({}, `?caseType=${caseType_ES}&page=${page}&limit=${limit}`);
        if(response.hasError){
            showAlert('Error al cargar los casos', 'error');
            return;
        }

        setTotalClaims(response.response.totalClaims);
        setCases(response.response.foundClaimsPaginated);
    };

    useEffect(() => {
        handleGetCases();
    }, [page, limit]);

    const paginationInfo = {
        page,
        limit,
        setPage,
        setLimit,
        paginationModel,
        setPaginationModel
    }


    return {
        isLoading,
        handleGetCases,
        totalClaims,
        paginationInfo,
        cases
    }
}