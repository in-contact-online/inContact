import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        transform: 'scale(0.8, 0.8)',
    },
    [theme.breakpoints.down('md')]: {
        transform: 'scale(1, 1)',
    },
}));

export function Offer({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const offerClasses = 'offer' + (matches ? '' : ' mobile');

    return (
        <StyledDiv className={offerClasses}>
            <h1>Контроль статусов Telegram</h1>
            <p>
                С помощью нашего <strong>telegram-бота</strong> вы сможете отслеживать онлайн статус ваших знакомых и
                понимать с кем они общаются
            </p>
            <span>@get_statuses_bot</span>
        </StyledDiv>
    );
}

Offer.propTypes = {
    '': PropTypes.func,
};

Offer.defaultProps = {
    '': () => {},
};
