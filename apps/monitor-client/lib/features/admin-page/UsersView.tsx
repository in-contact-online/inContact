import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../../context';
import { GridRowsProp, GridColDef, DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { dateConvertor } from '../../utils/';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';

const StyledDataGrid = styled(DataGrid)({
    fontFamily: 'monospace',
    fontSize: '12px',
    background: '#FFF',
    height: '400px',
});

export function UsersView() {
    const { api } = useContext<IAppContext>(AppContext);

    const [users, setUsers] = useState<any>([]);
    const [contacts, setContacts] = useState<any>([]);
    const [usersPageParams, setUsersPageParams] = useState({ page: 1, size: 5 });
    const [contactsPageParams, setContactsPageParams] = useState({ page: 1, size: 5 });

    const fetchContacts = ({ page, size }: any) => api?.contacts.readList({ page, size });
    const fetchUsers = ({ page, size }: any) => api?.users.readList({ page, size });
    const usersQueryResult = useQuery('users', () => fetchUsers(usersPageParams), { keepPreviousData: true });
    const contactsQueryResult = useQuery('contacts', () => fetchContacts(contactsPageParams), {
        keepPreviousData: true,
    });

    useEffect(() => {
        console.log(usersQueryResult);
        setUsers(usersQueryResult.data);
        setContacts(contactsQueryResult.data);
    }, []);

    const rowsUsers: GridRowsProp = users;
    const columnsUsers: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'center' },
        { field: 'userName', headerName: 'Name', headerAlign: 'center', width: 100 },
        { field: 'firstName', headerName: 'Name', headerAlign: 'center', width: 100 },
        { field: 'secondName', headerName: 'Name', headerAlign: 'center', width: 100 },
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
                <StyledDataGrid
                    rows={rowsUsers}
                    columns={columnsUsers}
                    loading={usersQueryResult.isLoading}
                    rowHeight={25}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <StyledDataGrid
                    rows={rowsContacts}
                    columns={columnsContacts}
                    loading={contactsQueryResult.isLoading}
                    rowHeight={25}
                />
            </Grid>
        </>
    );
}

UsersView.defaultProps = {};

UsersView.propTypes = {};
