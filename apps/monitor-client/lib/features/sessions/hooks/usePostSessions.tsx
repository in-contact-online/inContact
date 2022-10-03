import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export interface ISessionsAdd {
    isAdding: boolean;
    isError: boolean;
    addSession: (file: FormData) => any;
}

export function usePostSession(): ISessionsAdd {
    const { api } = useContext<IAppContext>(AppContext);
    const queryClient: QueryClient = useQueryClient();

    async function postSession(formData: any) {
        const sessions = await api?.sessions.add(formData);
        await api?.sessions.syncWithPool();
        return sessions;
    }

    const { isLoading: isAdding, isError, mutate: addSession } = useMutation(postSession, {
        onSuccess: () => {
            queryClient.invalidateQueries(['sessions']);
        },
    });

    return { isAdding, isError, addSession };
}
