import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../../context';
import { GridRowsProp, GridColDef, DataGrid } from '@mui/x-data-grid';
import { dividerClasses, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFetchContacts, useFetchUsers } from './hooks';

const StyledDataGrid = styled(DataGrid)({
    fontFamily: 'monospace',
    fontSize: '12px',
    background: '#FFF',
    height: '400px',
});

export function UsersView() {
    const { users, isUsersLoading }: any = useFetchUsers();
    const { contacts, isContactsLoading }: any = useFetchContacts();

    const columnsUsers: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'center' },
        { field: 'username', headerName: 'Name', headerAlign: 'center', width: 100 },
        { field: 'active', headerName: 'Is Active?', headerAlign: 'center' },
        { field: 'createdAt', headerName: 'Created At', headerAlign: 'center', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', headerAlign: 'center', width: 150 },
    ];

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
                {isUsersLoading ? (
                    <div>Loading...</div>
                ) : (
                    <StyledDataGrid rows={users} columns={columnsUsers} rowHeight={25} />
                )}
            </Grid>
            <Grid item xs={12} lg={6}>
                {isContactsLoading ? (
                    <div>Loading...</div>
                ) : (
                    <StyledDataGrid rows={contacts} columns={columnsContacts} rowHeight={25} />
                )}
            </Grid>
        </>
    );
}

UsersView.defaultProps = {};

UsersView.propTypes = {};
