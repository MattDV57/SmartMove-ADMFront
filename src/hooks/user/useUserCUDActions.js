import { useDeleteUserActions } from "./useDeleteUserActions";
import { useGetUsersActions } from "./useGetUsersActions";
import { usePostUserActions } from "./usePostUserActions";
import { usePutUserActions } from "./usePutUserActions";


export const useUserCUDActions = (adminId) => {
  const { postUser, isLoading: isPostLoading } = usePostUserActions({ adminId });
  const { putUser, isLoading: isPutLoading } = usePutUserActions({ adminId });
  const { deleteUser, isLoading: isDeleteLoading } = useDeleteUserActions({ adminId });
 
  const isLoading_CUD = isPostLoading || isPutLoading || isDeleteLoading;

  return {
    postUser,
    putUser,
    deleteUser,
    isLoading_CUD,
  };
};

