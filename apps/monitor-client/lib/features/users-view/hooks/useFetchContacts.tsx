import { useContext, useState } from 'react';
import { dateConvertor } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchContacts() {
    const { api } = useContext<IAppContext>(AppContext);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const { data: contacts, isLoading: isContactsLoading, isError: isContactsError }: any = useQuery(
        'contacts',
        () => api?.contacts.readList({ page, size }),
        {
            keepPreviousData: true,
            select: (contacts: any) => {
                return contacts.data.map((contact: any) => {
                    return {
                        ...contact,
                        createdAt: dateConvertor(contact.createdAt),
                        updatedAt: dateConvertor(contact.updatedAt),
                    };
                });
            },
        }
    );

    return { contacts, isContactsLoading, isContactsError };
}
