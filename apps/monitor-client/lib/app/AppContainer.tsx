import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../features/auth/Login';
import { HomePage } from '../features/HomePage';
import Dashboard from '../features/dashboard/Dashboard';

export function AppContainer() {
    return (
        /*       <Routes>
            <Route path="/login" render={() => <Login />} />
            <Route path="/" render={() => <HomePage />} />
        </Routes> */
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
