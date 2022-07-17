import React from 'react';
import PropTypes from 'prop-types';

import { FirstSection, SecondSection } from './components';

import './styles.css';

export function LandingPage() {
    return (
        <>
            <FirstSection />
            <SecondSection />
        </>
    );
}

LandingPage.propTypes = {
    '': PropTypes.func,
};

LandingPage.defaultProps = {
    '': () => {},
};

/* </html> */
