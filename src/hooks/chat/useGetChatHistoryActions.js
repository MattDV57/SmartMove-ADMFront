import { useEffect } from "react";
import { caseService } from "../../services/case";
import { useAlert } from "../../context/AlertProvider";

export const useGetChatHistoryActions = ( claimId ) => {
    const { callApi, isLoading, data, isError } = caseService.useGetChatHistory({claimId});
    const { showAlert } = useAlert();

    const handleGetChat = async () => {
        const response = await callApi();
        if(response.hasError){
            showAlert('Error al descargar el chat', 'error');
            return;
        }
        return response.response;
    }


    return {
        isLoading,
        handleGetChat
    }
}