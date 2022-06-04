import React, { useContext, useState, useEffect } from 'react';
import { AppContext, IAppContext } from '../context';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function RowCollapsible({ data, fields, collapsibleField }: any) {
    const [open, setOpen] = React.useState(false);

    const collapsibleData = data[collapsibleField];
    const { contacts, ...parentData } = data;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {fields.parent.map((item: any) => (
                    <TableCell>{parentData[item.field]}</TableCell>
                ))}
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 1 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography variant="h6" gutterBottom component="div">
                            Contacts
                        </Typography>
                        <Table size="small">
                            <TableHead style={{ backgroundColor: 'black' }}>
                                <TableRow>
                                    {fields.collapsible.map((item: any) => (
                                        <TableCell style={{ color: 'white' }}>{item.header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {collapsibleData.map((row: any) => (
                                    <Row data={row} fields={fields.collapsible} />
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Row({ data, fields }: any) {
    return (
        <TableRow>
            {fields.map((item: any) => (
                <TableCell>{data[item.field]}</TableCell>
            ))}
        </TableRow>
    );
}

export default function UserTable({ fields, data, collapsibleField }: any) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead style={{ backgroundColor: 'black' }}>
                    <TableRow>
                        <TableCell />
                        {fields.parent.map((field: any) => (
                            <TableCell style={{ color: 'white' }}>{field.header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data ? (
                        data.map((row: any) => (
                            <RowCollapsible data={row} fields={fields} collapsibleField={collapsibleField} />
                        ))
                    ) : (
                        <TableCell>{'Fetching Data...'}</TableCell>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
