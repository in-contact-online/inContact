import { useContext, useState } from 'react';
import { dateConvertor, getUserName } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchUsers() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const fetchUsers = ({ queryKey }: any) => {
        return api?.users.readList({ page: queryKey[1].page, size: queryKey[1].size });
    };

    const { data, isFetching, isError }: any = useQuery(['users', { page, size: pageSize }], fetchUsers, {
        keepPreviousData: true,
        select: (_data: any) => {
            return {
                users: _data.data.map((user: any) => {
                    return {
                        ...user,
                        username: getUserName(user),
                        createdAt: dateConvertor(user.createdAt),
                        updatedAt: dateConvertor(user.updatedAt),
                    };
                }),
                total: _data.total,
            };
        },
    });

    return { data, isFetching, isError, page, setPage, pageSize, setPageSize };
}
