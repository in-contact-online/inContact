import React from 'react';
import PropTypes from 'prop-types';

import { Main, Steps, Features } from './components';

import './styles.css';

export function LandingPage() {
    return (
        <>
            <Main />
            <Steps />
        </>
    );
}

LandingPage.propTypes = {
    '': PropTypes.func,
};

LandingPage.defaultProps = {
    '': () => {},
};
