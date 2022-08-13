import React from 'react';
import Button from '@mui/material/Button';
import { GridColDef } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { StyledDataGrid } from '../../../components';
import { useFetchSessions, ISessionsFetch, usePostSession, ISessionsAdd } from '../hooks';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'dcId', headerName: 'DC Id', width: 130 },
    { field: 'serverAddress', headerName: 'Server', flex: 1 },
    { field: 'active', headerName: 'Status', width: 130 },
    { field: 'valid', headerName: 'Valid', width: 130 },
];

export function Sessions() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: ISessionsFetch = useFetchSessions();
    const { addSession }: ISessionsAdd = usePostSession();

    const onFileChange: any = async (event: any) => {
        const files = Object.values(event.target.files);
        files.forEach((file: any) => {
            const formData = new FormData();
            formData.append('file', file);
            addSession(formData);
        });
    };

    if (isError) return null;

    return (
        <Grid item={true} xs={12} lg={12}>
            <Button variant="contained" component="label">
                Upload
                <input hidden={true} type="file" multiple={true} accept=".session" onChange={onFileChange} />
            </Button>
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
        </Grid>
    );
}
