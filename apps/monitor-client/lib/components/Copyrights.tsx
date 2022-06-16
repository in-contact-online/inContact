import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

interface copyType {
    text: string;
}

export function Copyrights({ text }: copyType) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
            {`Copyright © ${text}  ${new Date().getFullYear()}`}
        </Typography>
    );
}

Copyrights.propTypes = {
    text: PropTypes.string,
};

Copyrights.defaultProps = {
    text: '',
};
