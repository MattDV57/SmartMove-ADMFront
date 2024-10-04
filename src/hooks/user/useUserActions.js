import { useDeleteUserActions } from "./useDeleteUserActions";
import { useGetUsersActions } from "./useGetUsersActions";
import { usePostUserActions } from "./usePostUserActions";
import { usePutUserActions } from "./usePutUserActions";


const useUserActions = (adminId) => {
  const { postUser, isLoading: isPostLoading } = usePostUserActions({ adminId });
  const { putUser, isLoading: isPutLoading } = usePutUserActions({ adminId });
  const { getUsers, isLoading: isGetLoading } = useGetUsersActions({ adminId });
  const { deleteUser, isLoading: isDeleteLoading } = useDeleteUserActions({ adminId });

  const isLoading = isPostLoading || isPutLoading || isGetLoading || isDeleteLoading;

  return {
    postUser,
    putUser,
    getUsers,
    deleteUser,
    isLoading,
  };
};

export default useUserActions;