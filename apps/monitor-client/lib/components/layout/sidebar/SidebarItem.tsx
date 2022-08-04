import React from 'react';
import { useNavigate } from 'react-router-dom';
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

    return (
        <ListItemButton alignItems="flex-start" onClick={() => navigate(link)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    );
}
