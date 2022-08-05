import { useContext, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export interface ISessionsFetch {
    data: any;
    isFetching: boolean;
    isError: boolean;
    page: number;
    setPage: (val: number) => void;
    pageSize: number;
    setPageSize: (val: number) => void;
}

export function useFetchSessions(): ISessionsFetch {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const fetchSessions = ({ queryKey }: any) => {
        return api?.sessions.readList({ page: queryKey[1].page, size: queryKey[1].size });
    };

    const { data, isFetching, isError }: UseQueryResult = useQuery(
        ['sessions', { page, size: pageSize }],
        fetchSessions,
        {
            keepPreviousData: true,
        }
    );

    return { data, isFetching, isError, page, setPage, pageSize, setPageSize };
}
