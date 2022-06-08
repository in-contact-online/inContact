import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Layout } from '../components/layout/Layout';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Content } from '../components/layout/Content';

import { ServerView } from './ServerView';
import { UsersView } from './UsersView';
import { SessionsView } from './SessionsView';

export function HomePage({}) {
    const [appBarText, setAppBarText] = useState('Server');

    return (
        <Layout
            renderHeader={(props: any) => <Header {...props} text={appBarText} />}
            renderSidebar={(props: any) => <Sidebar {...props} />}
            renderContent={() => (
                <Content>
                    <Routes>
                        <Route path="/server" element={<ServerView />} />
                        <Route path="/users" element={<UsersView />} />
                        <Route path="/sessions" element={<SessionsView />} />
                    </Routes>
                </Content>
            )}
        />
    );
}

HomePage.propTypes = {
    '': PropTypes.func,
};

HomePage.defaultProps = {
    '': () => {},
};
