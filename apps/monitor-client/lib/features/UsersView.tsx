import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../context';
import { GridRowsProp, GridColDef, DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { dateConvertor } from '../utils/dateConvertor';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)({
    fontFamily: 'monospace',
    fontSize: '12px',
    background: '#FFF',
    height: '400px',
});

export function UsersView() {
    const { api } = useContext<IAppContext>(AppContext);
    const [users, setUsers] = useState<any>([]);
    const [sessions, setSessions] = useState<any>([]);
    const [contacts, setContacts] = useState<any>([]);

    useEffect(function () {
        async function getUsers(): Promise<void> {
            const contacts: any = await api?.contacts.readList({ page: 0, size: 10 });
            const users: any = await api?.users.readList({ page: 0, size: 10 });
            const sessions: any = await api?.sessions.readList({ page: 0, size: 10 });

            const preparedUsers = users.data.map((user: any) => {
                const { userName, firstName, secondName }: any = user;
                user.name = [userName, firstName, secondName].reduce((memo, item) => {
                    if (item) memo += ' ' + item;
                    return memo;
                }, '');

                user.createdAt = dateConvertor(user.createdAt);
                user.updatedAt = dateConvertor(user.updatedAt);
                return user;
            });

            const preparedContacts = contacts.data.map((contact: any) => {
                contact.createdAt = dateConvertor(contact.createdAt);
                contact.updatedAt = dateConvertor(contact.updatedAt);
                return contact;
            });

            setUsers(preparedUsers);
            setContacts(preparedContacts);
            setSessions(sessions);
        }

        getUsers();
    }, []);

    const rowsUsers: GridRowsProp = users;
    const columnsUsers: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', headerAlign: 'center', width: 100 },
        { field: 'active', headerName: 'Is Active?', headerAlign: 'center' },
        { field: 'createdAt', headerName: 'Created At', headerAlign: 'center', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', headerAlign: 'center', width: 150 },
    ];

    const rowsContacts: GridRowsProp = contacts;
    const columnsContacts: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'userId', headerName: 'User ID' },
        { field: 'sessionId', headerName: 'Session ID' },
        { field: 'trackedPhone', headerName: "Contact's Phone", width: 150 },
        { field: 'tracked', headerName: 'Is Tracked?' },
        { field: 'createdAt', headerName: 'Created At', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', width: 150 },
    ];

    return (
        <>
            <Grid item xs={12} lg={6}>
                <StyledDataGrid rows={rowsUsers} columns={columnsUsers} loading={!rowsUsers.length} rowHeight={25} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <StyledDataGrid
                    rows={rowsContacts}
                    columns={columnsContacts}
                    loading={!rowsContacts.length}
                    rowHeight={25}
                />
            </Grid>
        </>
    );
}

UsersView.defaultProps = {};

UsersView.propTypes = {};
