import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from './StyledDataGrid';
import { useFetchContacts } from '../hooks';

export function ContactsTable() {
    const { data, isLoading, isError, page, setPage, pageSize, setPageSize }: any = useFetchContacts();

    const columns: GridColDef[] = [
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
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <StyledDataGrid
                    rows={data.contacts}
                    rowCount={data.total}
                    rowsPerPageOptions={[5, 10]}
                    pagination
                    paginationMode="server"
                    page={page}
                    pageSize={pageSize}
                    columns={columns}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowHeight={25}
                />
            )}
        </>
    );
}

ContactsTable.defaultProps = {};

ContactsTable.propTypes = {};
