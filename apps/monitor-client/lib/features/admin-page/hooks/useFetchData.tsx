import { useContext } from 'react';
import { dateConvertor, getName } from '../utils';
import { useQuery } from 'react-query';
import { AppContext, IAppContext } from '../../../context';

const { api } = useContext<IAppContext>(AppContext);

export function useFetchUsers() {
    const fetchUsers = (params: any) => api?.users.readList(params);
    const { data: users, isLoading: isUsersLoading }: any = useQuery('users', () => fetchUsers({ page: 0, size: 5 }), {
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
    });

    return { users, isUsersLoading };
}

export function useFetchContacts() {
    const fetchContacts = (params: any) => api?.contacts.readList(params);
    const { data: contacts, isLoading: isContactsLoading }: any = useQuery(
        'contacts',
        () => fetchContacts({ page: 0, size: 5 }),
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
