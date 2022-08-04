import React from 'react';
import { Outlet } from 'react-router-dom';
import WebhookIcon from '@mui/icons-material/Webhook';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import { Sidebar, SidebarItem } from './layout/sidebar';
import { Layout, Header } from './layout';
import { Copyrights } from './Copyrights';

export function AdminPage() {
    return (
        <Layout
            renderHeader={() => <Header />}
            renderSidebar={() => (
                <Sidebar>
                    <SidebarItem link="/admin/server" name="Server" icon={<WebhookIcon />} />
                    <SidebarItem link="/admin/users" name="Users" icon={<PeopleIcon />} />
                    <SidebarItem link="/admin/sessions" name="Sessions" icon={<ViewListIcon />} />
                </Sidebar>
            )}
            renderContent={() => <Outlet />}
            renderFooter={() => <Copyrights />}
        />
    );
}
