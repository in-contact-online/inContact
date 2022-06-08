import React from 'react';

import { Login } from '../features/auth/Login';
import { HomePage } from '../features/HomePage';

export function AppContainer() {
    return <HomePage />;
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
