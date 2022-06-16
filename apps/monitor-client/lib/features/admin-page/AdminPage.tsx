import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Layout, Copyrights } from '../../components';

export function AdminPage() {
    const [appBarText, setAppBarText] = useState('Server');

    return (
        <Layout
            renderHeader={(props: any) => <Header {...props} text={appBarText} />}
            renderSidebar={(props: any) => <Sidebar {...props} />}
            renderContent={() => <Outlet />}
            renderFooter={() => <Copyrights text={'In Contact'} />}
        />
    );
}

AdminPage.propTypes = {};

AdminPage.defaultProps = {};
