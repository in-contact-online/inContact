import { useContext, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchContacts() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const fetchContacts = ({ queryKey }: any) => {
        return api?.contacts.readList({ page: queryKey[1].page, size: queryKey[1].size });
    };

    const { data, isFetching, isError }: UseQueryResult = useQuery(
        ['contacts', { page, size: pageSize }],
        fetchContacts,
        {
            keepPreviousData: true,
        }
    );

    return { data, isFetching, isError, page, setPage, pageSize, setPageSize };
}
