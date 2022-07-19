import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        ['.feature__ava']: {
            width: 120,
            height: 120,
        },
        ['p']: {
            fontSize: '1.5rem',
        },
        ['h3']: {
            fontSize: '2rem',
        },
    },
}));

interface FeatureType {
    description: string;
    url: string;
    done?: boolean;
}

export function Feature({ description, url, done }: FeatureType) {
    return (
        <StyledDiv className="feature">
            {done ? (
                <h3 style={{ color: '#02AC46' }}>Реализовано</h3>
            ) : (
                <h3 style={{ color: '#E11D10' }}>В разработке</h3>
            )}
            <div className="feature__ava">
                <img src={url} />
            </div>
            <p className="feature__description">{description}</p>
        </StyledDiv>
    );
}

Feature.propTypes = {
    '': PropTypes.func,
};

Feature.defaultProps = {
    '': () => {},
};
