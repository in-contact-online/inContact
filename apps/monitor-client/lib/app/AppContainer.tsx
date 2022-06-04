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

            console.log(contacts);

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
                data={users}
                collapsibleField={'contacts'}
                fields={{
                    parent: [
                        { header: 'User ID', field: 'id' },
                        { header: 'Username', field: 'userName' },
                        { header: 'First Name', field: 'firstName' },
                        { header: 'Second Name', field: 'secondName' },
                        { header: 'Phone', field: 'phone' },
                        { header: 'Active', field: 'active' },
                        { header: 'Created At', field: 'createdAt' },
                        { header: 'Updated At', field: 'updatedAt' },
                        { header: 'Chat ID', field: 'charId' },
                    ],
                    collapsible: [
                        { header: 'Contact ID', field: 'id' },
                        { header: 'Tracked Phone', field: 'trackedPhone' },
                        { header: 'Tracked', field: 'tracked' },
                        { header: 'Created At', field: 'createdAt' },
                        { header: 'Updated At', field: 'updatedAt' },
                        { header: 'Session ID', field: 'sessionId' },
                    ],
                }}
            />
        </>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
