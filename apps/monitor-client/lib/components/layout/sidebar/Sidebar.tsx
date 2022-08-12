import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

interface ISidebarProps {
    children: JSX.Element[];
}

export function Sidebar(props: ISidebarProps) {
    const { children } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleDrawer = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            top: 64,
            overflowX: 'hidden',
            width: open ? 240 : theme.spacing(7),
            height: 'calc(100% - 64px)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
        },
    }));

    return (
        <Drawer variant="permanent" open={isSidebarOpen}>
            <List component="nav">{children}</List>
            <Divider />
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarOpen ? 'flex-end' : 'flex-start',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Toolbar>
        </Drawer>
    );
}
