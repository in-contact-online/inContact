import React from 'react';
import { Route, Routes } from 'react-router';

import { Login } from '../features/auth/Login';
import { HomePage } from '../features/HomePage';

export function AppContainer() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
