import React from 'react';
import PropTypes from 'prop-types';

import { Main } from './Main';
import { Steps } from './Steps';
import { Features } from './Features';

import '../styles.css';

export function LandingPage() {
    return (
        <>
            <Main />
            <Steps />
            <Features />
        </>
    );
}

LandingPage.propTypes = {
    '': PropTypes.func,
};

LandingPage.defaultProps = {
    '': () => {},
};
