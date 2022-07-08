import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from './StyledDataGrid';
import { useFetchUsers } from '../hooks';

export function UsersTable() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: any = useFetchUsers();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', headerAlign: 'center' },
        { field: 'username', headerName: 'Name', headerAlign: 'center', width: 100 },
        { field: 'active', headerName: 'Is Active?', headerAlign: 'center' },
        { field: 'createdAt', headerName: 'Created At', headerAlign: 'center', width: 150 },
        { field: 'updatedAt', headerName: 'Updated At', headerAlign: 'center', width: 150 },
    ];

    return (
        <>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <StyledDataGrid
                    loading={isFetching}
                    rows={data.users}
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

UsersTable.defaultProps = {};

UsersTable.propTypes = {};
