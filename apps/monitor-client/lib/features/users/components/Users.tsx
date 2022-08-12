import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { UsersTable } from './UsersTable';
import { ContactsTable } from './ContactsTable';

export function Users({}) {
    return (
        <>
            <Grid item={true} xs={12} lg={6}>
                <UsersTable />
            </Grid>
            <Grid item={true} xs={12} lg={6}>
                <ContactsTable />
            </Grid>
        </>
    );
}

Users.propTypes = {
    '': PropTypes.func,
};

Users.defaultProps = {
    '': () => {},
};
