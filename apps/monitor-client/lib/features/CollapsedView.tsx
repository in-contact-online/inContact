import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../context';
import TableCollapsible from '../components/UsersTable';

export function CollapsedView() {
    const { api } = useContext<IAppContext>(AppContext);
    const [users, setUsers] = useState<any | null>(null);
    const [sessions, setSessions] = useState<any | null>(null);

    useEffect(function () {
        async function getUsers(): Promise<void> {
            const contacts: any = await api?.contacts.readList({ page: 0, size: 10 });
            const users: any = await api?.users.readList({ page: 0, size: 10 });
            const sessions: any = await api?.sessions.readList({ page: 0, size: 10 });

            const usersExtanded = users.data.map((user: any) => {
                user.contacts = contacts.data.filter((contact: any) => contact.userId === user.id);
                return user;
            });

            const sessionsExtanded = sessions.data.map((session: any) => {
                session.contacts = contacts.data.filter((contact: any) => contact.sessionId === session.id);
                return session;
            });

            setUsers(usersExtanded);
            setSessions(sessionsExtanded);
        }

        getUsers();
    }, []);

    return (
        <>
            <h3>Users</h3>
            <TableCollapsible
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

            <h3>Sessions</h3>
            <TableCollapsible
                data={sessions}
                collapsibleField={'contacts'}
                fields={{
                    parent: [
                        { header: 'Session ID', field: 'id' },
                        { header: 'Valid', field: 'valid' },
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

CollapsedView.defaultProps = {};

CollapsedView.propTypes = {};
