import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../context';
import { Login } from '../features/auth/Login';
import UsersTable from '../components/UsersTable';
import { array } from 'prop-types';

export function AppContainer() {
    const { api } = useContext<IAppContext>(AppContext);
    const [users, setUsers] = useState<any | null>(null);
    const [contacts, setContacts] = useState<any | null>(null);
    const [sessions, setSessons] = useState<any | null>(null);
    const [statuses, setStatuses] = useState<any | null>(null);
    const [systemHealth, setSystemHealth] = useState<any | null>(null);

    useEffect(function () {
        api?.users.readList({ page: 0, size: 5 }).then((result: any) => {
            const users = result.data;
            users.contacts = [];

            users.forEach((user: any) => {
                api.contacts2.readByUser({ userId: user.id }).then((result) => {
                    users.contacts.push(result.data);
                });
            });

            setUsers(users);
        });
        api?.contacts.readList({ page: 0, size: 5 }).then((result) => {
            setContacts(result);
        });
        api?.sessions.readList({ page: 0, size: 5 }).then((result) => {
            setSessons(result);
        });
        api?.statuses.readList({ page: 0, size: 5 }).then((result) => {
            setStatuses(result);
        });
        api?.systemHealth.read().then((result) => {
            setSystemHealth(result);
        });
    }, []);

    return (
        <>
            <UsersTable rows={users} />
        </>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
