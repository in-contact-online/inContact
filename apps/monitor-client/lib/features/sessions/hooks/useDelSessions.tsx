import { useContext } from 'react';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export interface ISessionsDel {
    isRemoving: boolean;
    isError: boolean;
    delSession: (id: string) => any;
}

export function useDelSession(): ISessionsDel {
    const { api } = useContext<IAppContext>(AppContext);
    const queryClient: QueryClient = useQueryClient();
    async function removeSession(id: string) {
        return api?.sessions.del(id);
    }

    const { isLoading: isRemoving, isError, mutate: delSession } = useMutation(removeSession, {
        onSuccess: () => {
            queryClient.invalidateQueries(['sessions']);
        },
    });

    return { isRemoving, isError, delSession };
}
