import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface ISideBarItem {
    name: string;
    link: string;
    icon: JSX.Element;
}

export function SidebarItem(props: ISideBarItem) {
    const { name, link, icon } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const selected = location.pathname === link;

    return (
        <ListItemButton alignItems="flex-start" onClick={() => navigate(link)} selected={selected}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    );
}
