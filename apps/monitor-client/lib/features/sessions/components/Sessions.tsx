import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { StyledDataGrid } from '../../../components';
import { useFetchSessions, ISessionsFetch } from '../hooks';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 20 },
    { field: 'authKey', headerName: 'Auth Key', flex: 1 },
    { field: 'dcId', headerName: 'DC Id', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'serverAddress', headerName: 'Server', width: 130 },
    { field: 'active', headerName: 'Status', width: 130 },
    { field: 'valid', headerName: 'Valid', width: 130 },
];

export function Sessions() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: ISessionsFetch = useFetchSessions();

    if (isError) return null;

    return (
        <div style={{ height: 400, width: '100%' }}>
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
        </div>
    );
}
