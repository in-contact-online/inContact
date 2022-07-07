import { useContext, useState } from 'react';
import { dateConvertor } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchContacts() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const { data, isLoading, isError }: any = useQuery(
        ['contacts', page, pageSize],
        () => api?.contacts.readList({ page, size: pageSize }),
        {
            keepPreviousData: true,
            select: (data: any) => {
                return {
                    contacts: data.data.map((contact: any) => {
                        return {
                            ...contact,
                            createdAt: dateConvertor(contact.createdAt),
                            updatedAt: dateConvertor(contact.updatedAt),
                        };
                    }),
                    total: data.total,
                };
            },
        }
    );

    return { data, isLoading, isError, page, setPage, pageSize, setPageSize };
}
