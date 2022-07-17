import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import { MainListItems, SecondaryListItems } from './ListItems';
import { styled } from '@mui/material/styles';

interface SidebarProps {
    drawerWidth: number;
    isOpen: boolean;
    toggleDrawer: any;
}

export function Sidebar({ drawerWidth, isOpen, toggleDrawer }: SidebarProps) {
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }));

    return (
        <Drawer variant="permanent" open={isOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
            </List>
        </Drawer>
    );
}

Sidebar.propTypes = {
    drawerWidth: PropTypes.number,
    isOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};

Sidebar.defaultProps = {
    drawerWidth: 240,
    isOpen: true,
    toggleDrawer: () => {},
};
