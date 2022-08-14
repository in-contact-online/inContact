import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GridColDef } from '@mui/x-data-grid';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import { Grid } from '@mui/material';
import { StyledDataGrid } from '../../../components';
import { useFetchSessions, ISessionsFetch, usePostSession, ISessionsAdd, useDelSession, ISessionsDel } from '../hooks';

export function Sessions() {
    const { data, isFetching, isError, page, setPage, pageSize, setPageSize }: ISessionsFetch = useFetchSessions();
    const { addSession, isAdding }: ISessionsAdd = usePostSession();
    const { delSession, isRemoving }: ISessionsDel = useDelSession();
    const [selectedRow, setSelectedRows] = useState<string[]>([]);
    const disableUpload: boolean = isRemoving || isAdding;
    const disableRemove: boolean = isRemoving || isAdding || !selectedRow.length;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'dcId', headerName: 'DC Id', width: 130 },
        { field: 'serverAddress', headerName: 'Server', flex: 1 },
        { field: 'active', headerName: 'Status', width: 130 },
        { field: 'valid', headerName: 'Valid', width: 130 },
    ];

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
            <IconButton component="label" disabled={disableUpload}>
                <FileUploadIcon />
                <input hidden={true} type="file" multiple={true} accept=".session" onChange={onFileChange} />
            </IconButton>
            <IconButton
                disabled={disableRemove}
                onClick={() => {
                    selectedRow.forEach((id: string) => {
                        delSession(id);
                    });
                }}
            >
                <DeleteIcon />
            </IconButton>
            <div style={{ height: 400, width: '100%' }}>
                <StyledDataGrid
                    checkboxSelection={true}
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
                    onSelectionModelChange={(selectionModel: GridSelectionModel) => {
                        const rowIds: any = [...selectionModel];
                        setSelectedRows(rowIds);
                    }}
                    rowHeight={25}
                    loading={isFetching || isAdding || isRemoving}
                />
            </div>
        </Grid>
    );
}
