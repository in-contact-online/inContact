import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from '../../../components';
import { useFetchContacts } from '../hooks';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'userId', headerName: 'User ID' },
    { field: 'sessionId', headerName: 'Session ID' },
    { field: 'trackedPhone', headerName: "Contact's Phone", width: 150 },
    { field: 'tracked', headerName: 'Is Tracked?' },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
];

export function ContactsTable() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: any = useFetchContacts();

    if (isError) return null;

    return (
        <StyledDataGrid
            rows={data ? data.data : []}
            rowCount={data ? data.total : 0}
            rowsPerPageOptions={[5, 10]}
            pagination={true}
            paginationMode="server"
            page={page}
            pageSize={pageSize}
            columns={columns}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowHeight={25}
            loading={isFetching}
        />
    );
}
