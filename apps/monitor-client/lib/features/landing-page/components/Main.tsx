import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from './Menu';
import { useMediaQuery } from '@mui/material';
import { Offer } from './Offer';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const Logo = styled('img')(({ theme }) => ({
    width: 380,
    [theme.breakpoints.down('lg')]: {
        width: 220,
    },
}));

export function Main({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className="first-section dark-background">
            <div className="container">
                <div className="header">
                    <Logo src="/images/in-contact-logo.webp" />
                    <Menu />
                    {matches && (
                        <>
                            <div className="girl" />
                            <div className="messages-bg" />
                            <div className="light-blur-bg" />
                        </>
                    )}
                </div>
                <Offer />
            </div>
        </div>
    );
}

Main.propTypes = {
    '': PropTypes.func,
};

Main.defaultProps = {
    '': () => {},
};
