import { useContext, useState } from 'react';
import { dateConvertor, getName } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

export function useFetchUsers() {
    const { api } = useContext<IAppContext>(AppContext);

    const [paginationCnfg, setPaginationCnfg] = useState({ page: 0, size: 5 });

    const { data: users, isLoading: isUsersLoading }: any = useQuery(
        ['users', paginationCnfg],
        () => api?.users.readList(paginationCnfg),
        {
            keepPreviousData: true,
            select: (users: any) => {
                return users.data.map((user: any) => {
                    return {
                        ...user,
                        username: getName(user.userName, user.firstName, user.secondName),
                        createdAt: dateConvertor(user.createdAt),
                        updatedAt: dateConvertor(user.updatedAt),
                    };
                });
            },
        }
    );

    return { users, isUsersLoading };
}

export function useFetchContacts() {
    const { api } = useContext<IAppContext>(AppContext);

    const [paginationCnfg, setPaginationCnfg] = useState({ page: 0, size: 5 });

    const { data: contacts, isLoading: isContactsLoading }: any = useQuery(
        ['contacts', paginationCnfg],
        () => api?.contacts.readList(paginationCnfg),
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

    return { contacts, isContactsLoading };
}
