// import { useInfiniteQuery } from '@tanstack/react-query';
// import { logsService } from "../../services/logs";
// import { useAlert } from "../../context/AlertProvider";

// export const useGetLogs = (logType, searchTerm, limit) => {
//   const { showAlert } = useAlert();
//   const { callApi } = logsService.useGetLogs();

//   const fetchLogs = async ({ pageParam = 1 }) => {
//     const response = await callApi({
//       addEndpoint: `?logType=${logType}&search=${searchTerm}&page=${pageParam}&limit=${limit}`,
//     });

//     if (response.hasError) {
//       showAlert("Error al buscar logs", "error");
//       throw new Error("Error fetching logs");
//     }

//     return {
//       logs: response.response,
//       nextPage: pageParam + 1,
//       totalPages: response.totalPages,
//     };
//   };

//   return useInfiniteQuery({
//     queryKey: ['logs', logType, searchTerm],
//     queryFn: fetchLogs,
//     getNextPageParam: (lastPage) => {
//       if (lastPage.nextPage <= lastPage.totalPages) {
//         return lastPage.nextPage;
//       }
//       return undefined;
//     },
//     keepPreviousData: true,
//     staleTime: 5000,
//     onError: () => {
//       showAlert("No se encontraron logs", "info");
//     },
//   });
// };
