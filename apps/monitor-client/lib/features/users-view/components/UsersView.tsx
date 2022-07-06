import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { UsersTable } from './UsersTable';
import { ContactsTable } from './ContactsTable';

export function UsersView({}) {
    return (
        <>
            <Grid item xs={12} lg={6}>
                <UsersTable />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ContactsTable />
            </Grid>
        </>
    );
}

UsersView.propTypes = {
    '': PropTypes.func,
};

UsersView.defaultProps = {
    '': () => {},
};
