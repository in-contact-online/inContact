import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Layout, Sidebar, Header } from '../components/layout';

import { ServerView } from './ServerView';
import { UsersView } from './UsersView';
import { SessionsView } from './SessionsView';
import { Copyrights } from '../components/Copyrights';

export function HomePage() {
    const [appBarText, setAppBarText] = useState('Server');

    return (
        <Layout
            renderHeader={(props: any) => <Header {...props} text={appBarText} />}
            renderSidebar={(props: any) => <Sidebar {...props} />}
            renderContent={() => (
                <Routes>
                    <Route path="/server" element={<ServerView />} />
                    <Route path="/users" element={<UsersView />} />
                    <Route path="/sessions" element={<SessionsView />} />
                </Routes>
            )}
            renderFooter={() => <Copyrights text={'In Contact'} />}
        />
    );
}

HomePage.propTypes = {};

HomePage.defaultProps = {};
