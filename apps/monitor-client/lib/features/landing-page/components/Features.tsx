import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from './Menu';
import { useMediaQuery } from '@mui/material';
import { Offer } from './Offer';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const Logo = styled('img')(({ theme }) => ({}));

export function Features({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className="light-background">
            <div className="container">
                <h2>Планы по развитию бота</h2>
            </div>
        </div>
    );
}

Features.propTypes = {
    '': PropTypes.func,
};

Features.defaultProps = {
    '': () => {},
};
