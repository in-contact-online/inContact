import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grow } from '@mui/material';
import { useIntersection } from '../hooks';

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
    timeout: { appear?: number; enter?: number; exit?: number };
}

export function Feature({ description, url, done, timeout }: FeatureType) {
    const featureRef = useRef(null);
    const visible = useIntersection(featureRef, '0px');

    return (
        <Grow in={visible} timeout={timeout}>
            <StyledDiv className="feature" ref={featureRef}>
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
        </Grow>
    );
}

Feature.propTypes = {
    '': PropTypes.func,
};

Feature.defaultProps = {
    '': () => {},
};
