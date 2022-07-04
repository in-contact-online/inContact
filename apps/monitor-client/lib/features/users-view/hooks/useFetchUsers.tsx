import { useContext, useState } from 'react';
import { dateConvertor, getUserName } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchUsers() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const { data: users, isLoading: isUsersLoading, isError: isUsersError }: any = useQuery(
        'users',
        () => api?.users.readList({ page, size }),
        {
            keepPreviousData: true,
            select: (users: any) => {
                return users.data.map((user: any) => {
                    return {
                        ...user,
                        username: getUserName(user),
                        createdAt: dateConvertor(user.createdAt),
                        updatedAt: dateConvertor(user.updatedAt),
                    };
                });
            },
        }
    );

    return { users, isUsersLoading, isUsersError };
}
