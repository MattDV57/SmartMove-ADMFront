import UseApi from '../../hooks/useApi';

const usePostLogin = () => UseApi(
    `/user/login`,
    {
        method: 'POST',
    }
)

export default usePostLogin