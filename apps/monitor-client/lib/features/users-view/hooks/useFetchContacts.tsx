import { useContext, useState } from 'react';
import { dateConvertor } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchContacts() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const fetchContacts = ({ queryKey }: any) => {
        return api?.contacts.readList({ page: queryKey[1].page, size: queryKey[1].size });
    };

    const { data, isFetching, isError }: any = useQuery(['contacts', { page, size: pageSize }], fetchContacts, {
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
    });

    return { data, isFetching, isError, page, setPage, pageSize, setPageSize };
}
