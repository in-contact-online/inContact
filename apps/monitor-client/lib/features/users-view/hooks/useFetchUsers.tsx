import { useContext, useState } from 'react';
import { dateConvertor, getUserName } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchUsers() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const { data, isLoading, isError }: any = useQuery(
        ['users', page, pageSize],
        () => api?.users.readList({ page, size: pageSize }),
        {
            keepPreviousData: true,
            select: (data: any) => {
                return {
                    users: data.data.map((user: any) => {
                        return {
                            ...user,
                            username: getUserName(user),
                            createdAt: dateConvertor(user.createdAt),
                            updatedAt: dateConvertor(user.updatedAt),
                        };
                    }),
                    total: data.total,
                };
            },
        }
    );

    return {
        usersData: data,
        isUsersLoading: isLoading,
        isUsersError: isError,
        usersPage: page,
        setUsersPage: setPage,
        usersPageSize: pageSize,
        setUsersPageSize: setPageSize,
    };
}
