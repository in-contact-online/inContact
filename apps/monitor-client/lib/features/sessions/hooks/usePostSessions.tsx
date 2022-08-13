import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export interface ISessionsAdd {
    isLoading: boolean;
    isError: boolean;
    addSession: (file: FormData) => any;
}

export function usePostSession(): ISessionsAdd {
    const { api } = useContext<IAppContext>(AppContext);
    const queryClient: QueryClient = useQueryClient();
    async function postSession(formData: any) {
        return api?.sessions.add(formData);
    }

    const { isLoading, isError, mutate: addSession } = useMutation(postSession, {
        onSuccess: () => {
            queryClient.invalidateQueries(['sessions']);
        },
    });

    return { isLoading, isError, addSession };
}
