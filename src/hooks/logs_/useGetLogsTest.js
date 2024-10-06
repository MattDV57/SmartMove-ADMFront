import { useInfiniteQuery } from "@tanstack/react-query";
import { useAlert } from "../../context/AlertProvider";

export const useGetLogsTest = (logType, searchTerm, limit, simulate = true) => {
    const { showAlert } = useAlert();
  
    const mockLogs = {
      users: [
        { id: 1, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 2, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 3, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 4, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id:5, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 6, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 7, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 8, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 9, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 10, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 11, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 12, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 13, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 22, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 32, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 1223, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 2232, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 3223, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
      
        { id: 1123, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 4123, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 512313, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 612321, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 2412, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 36454, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
        { id: 112312, action: "Alta", user: "Juan Pérez", details: "Nuevo usuario creado", timestamp: "2023-06-15 10:30:00" },
        { id: 27676, action: "Modificación", user: "María García", details: "Cambio de rol a administrador", timestamp: "2023-06-15 11:45:00" },
        { id: 35656, action: "Baja", user: "Carlos Rodríguez", details: "Usuario desactivado", timestamp: "2023-06-15 14:20:00" },
      ],
      claims: [
        { id: 1, claim: "REC-001", user: "Ana Martínez", details: "Reclamo cerrado - Solución proporcionada", timestamp: "2023-06-15 09:15:00" },
        { id: 2, claim: "REC-002", user: "Luis Sánchez", details: "Reclamo cerrado - No procede", timestamp: "2023-06-15 13:30:00" },
        { id: 3, claim: "REC-003", user: "Elena Torres", details: "Reclamo cerrado - Escalado a nivel superior", timestamp: "2023-06-15 16:45:00" },
      ],
    };
  
    const fetchLogs = async ({ pageParam = 1 }) => {

      const data = logType === "users" ? mockLogs.users : mockLogs.claims;

      const totalPages = 1;
      return {
        data,
        nextPage: pageParam + 1,
        totalPages,
      };
    };
  
    return useInfiniteQuery({
      queryKey: ['logs', logType, searchTerm],
      queryFn: fetchLogs,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        }
        return undefined;
      },
      keepPreviousData: true,
      staleTime: 5000,
      onError: () => {
        showAlert("No se encontraron logs", "info");
      },
    });
  };
  