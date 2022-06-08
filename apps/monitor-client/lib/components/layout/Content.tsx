import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

export function Content({ children }: any) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                {children}
            </Grid>
        </Grid>
    );
}

Content.propTypes = {
    '': PropTypes.func,
};

Content.defaultProps = {
    '': () => {},
};
