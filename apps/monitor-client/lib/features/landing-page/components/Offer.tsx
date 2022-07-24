import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function Offer({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const offerClasses = 'offer' + (matches ? '' : ' mobile');

    return (
        <div className={offerClasses}>
            <h1>Контроль статусов Telegram</h1>
            <p>
                С помощью нашего <strong>telegram-бота</strong> вы сможете отслеживать онлайн статус ваших знакомых и
                понимать с кем они общаются
            </p>
            <span>
                <a href="https://t.me/get_statuses_bot">@get_statuses_bot</a>
            </span>
        </div>
    );
}

Offer.propTypes = {
    '': PropTypes.func,
};

Offer.defaultProps = {
    '': () => {},
};
