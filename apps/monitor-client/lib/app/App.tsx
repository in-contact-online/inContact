import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Login } from '../features/auth/Login';
import { LandingPage } from '../features/landing';
import { AdminPage } from '../components';
import { Servers } from '../features/servers';
import { Users } from '../features/users';
import { Sessions } from '../features/sessions';

export function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="home" element={<LandingPage />} />
                <Route path="admin" element={<AdminPage />}>
                    <Route path="server" element={<Servers />} />
                    <Route path="users" element={<Users />} />
                    <Route path="sessions" element={<Sessions />} />
                    <Route index={true} element={<Navigate to="users" />} />
                </Route>
                <Route path="*" element={<Navigate to="home" />} />
            </Routes>
        </>
    );
}
