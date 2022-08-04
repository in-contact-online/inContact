import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Badge = styled('div')({
    background: '#FFF',
    position: 'relative',
    width: 130,
    height: 130,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #8D9193',
    boxSizing: 'border-box',
    '&::after': {
        content: `url("data:image/svg+xml,%3Csvg width='17' height='65' viewBox='0 0 17 65' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.21879 49.0001C3.80055 49.0202 0.235195 52.6182 0.255334 57.0365C0.275472 61.4547 3.87348 65.0201 8.29171 64.9999C12.7099 64.9798 16.2753 61.3818 16.2552 56.9635C16.235 52.5453 12.637 48.9799 8.21879 49.0001ZM6.50002 1.00684L6.75527 57.0068L9.75524 56.9932L9.49998 0.993163L6.50002 1.00684Z' fill='%238D9193'/%3E%3C/svg%3E%0A")`,
        display: 'block',
        position: 'absolute',
        left: 56,
        top: 128,
    },
});

const StyledImg = styled('img')({
    width: '60%',
});

export function BotBadge({}) {
    return (
        <Badge>
            <StyledImg src="/images/logo3.png" />
        </Badge>
    );
}

BotBadge.propTypes = {
    '': PropTypes.func,
};

BotBadge.defaultProps = {
    '': () => {},
};
