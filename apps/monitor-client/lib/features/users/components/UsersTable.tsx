import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from '../../../components';
import { useFetchUsers } from '../hooks';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerAlign: 'center' },
    { field: 'username', headerName: 'Name', headerAlign: 'center', width: 100 },
    { field: 'active', headerName: 'Is Active?', headerAlign: 'center' },
    { field: 'createdAt', headerName: 'Created At', headerAlign: 'center', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', headerAlign: 'center', width: 150 },
];

export function UsersTable() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: any = useFetchUsers();

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
