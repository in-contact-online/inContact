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

function RowCollapsible({ data, collapsibleHeaders, collapsibleField }: any) {
    const [open, setOpen] = React.useState(false);

    /* 
    
    rows = [
    {
        id: 2112,
        username: "dddddd",
        first_name: "ccccc",
        contacts: [
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
        ]
    },
    {
        id: 2112,
        username: "dddddd",
        first_name: "ccccc",
        contacts: [
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
            {tracked_phone: "+38050991231154", tracked: false, session_id: "79020536324"},
        ]
    },


    ]
    
    */

    const collapsibleData = data[collapsibleField];
    const { contacts, ...parentData } = data;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {Object.values(parentData).map((value: any) => (
                    <TableCell>{value}</TableCell>
                ))}
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Contacts
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {collapsibleHeaders.map((header: any) => (
                                            <TableCell>{header}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {collapsibleData.map((value: any) => (
                                        <Row data={value} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Row({ data }: any) {
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {Object.values(data).map((value: any) => (
                <TableCell>{value}</TableCell>
            ))}
        </TableRow>
    );
}

export default function UserTable({ headers, rows, collapsibleField }: any) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {headers.parent.map((header: any) => (
                            <TableCell>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? (
                        rows.map((row: any) => (
                            <RowCollapsible
                                data={row}
                                collapsibleHeaders={headers.collapsible}
                                collapsibleField={collapsibleField}
                            />
                        ))
                    ) : (
                        <TableCell>{'Fetching Data...'}</TableCell>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
