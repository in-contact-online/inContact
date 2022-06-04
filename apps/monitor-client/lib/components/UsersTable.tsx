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

function Row({ row }: { row: any }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.secondName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell>{row.chatId}</TableCell>
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
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {'test1'}
                                        </TableCell>
                                        <TableCell>{'test2'}</TableCell>
                                        <TableCell align="right">{'test3'}</TableCell>
                                        <TableCell align="right">{'test4'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function UsersTable({ rows }: { rows: any }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>user id</TableCell>
                        <TableCell>username</TableCell>
                        <TableCell>first name</TableCell>
                        <TableCell>second name</TableCell>
                        <TableCell>phone</TableCell>
                        <TableCell>active</TableCell>
                        <TableCell>created at</TableCell>
                        <TableCell>updated at</TableCell>
                        <TableCell>chat id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? (
                        rows.map((row: any) => <Row key={row.id} row={row} />)
                    ) : (
                        <TableCell align="right">{'fetching data..'}</TableCell>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
