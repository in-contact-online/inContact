import React from 'react';
import { Route, Routes } from 'react-router';

import { Login } from '../features/auth/Login';
import { AdminPage, ServerView, UsersView, SessionsView } from '../features/admin-page';
import { LandingPage } from '../features/landing-page';

export function AppContainer() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminPage />}>
                <Route index element={<ServerView />} />
                <Route path="users" element={<UsersView />} />
                <Route path="sessions" element={<SessionsView />} />
            </Route>
        </Routes>
    );
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {};
