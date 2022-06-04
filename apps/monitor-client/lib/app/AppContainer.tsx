import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../context';
import { Login } from '../features/auth/Login';
import UsersTable from '../components/UsersTable';
import { array } from 'prop-types';

export function AppContainer() {
    const { api } = useContext<IAppContext>(AppContext);
    const [users, setUsers] = useState<any | null>(null);

    useEffect(function () {
        async function getUsers(): Promise<void> {
            const contacts: any = await api?.contacts.readList({ page: 0, size: 10 });
            const users: any = await api?.users.readList({ page: 0, size: 10 });

            const usersExtanded = users.data.map((user: any) => {
                user.contacts = contacts.data.filter((contact: any) => contact.userId === user.id);
                return user;
            });

            setUsers(usersExtanded);
        }

        getUsers();
    }, []);

    return (
        <>
            <UsersTable
                rows={users}
                collapsibleField={'contacts'}
                headers={{
                    parent: [
                        'id',
                        'username',
                        'first_name',
                        'second_name',
                        'phone',
                        'active',
                        'created_at',
                        'updated_at',
                        'chat_id',
                    ],
                    collapsible: ['tracked_phone', 'tracked', 'created_at', 'updated_at', 'id', 'session_id'],
                }}
            />
        </>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
