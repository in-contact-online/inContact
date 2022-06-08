import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Link } from '@mui/material';

export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
            {`Copyright © `}
            <Link color="inherit" href={'http://'}>
                {'text'}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

Copyright.propTypes = {
    '': PropTypes.func,
};

Copyright.defaultProps = {
    '': () => {},
};
