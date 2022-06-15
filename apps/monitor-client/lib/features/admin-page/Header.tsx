import React from 'react';
import PropTypes from 'prop-types';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface HeaderProps {
    drawerWidth: number;
    open: boolean;
    toggleDrawer: any;
    text: string;
}

export function Header({ drawerWidth, open, toggleDrawer, text }: HeaderProps) {
    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <AppBar position="absolute" open={open} style={{ backgroundColor: '#10C1FC' }}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <img src="/images/logo.png" style={{ height: '40px' }} />
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}></Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    drawerWidth: PropTypes.number,
    open: PropTypes.bool,
    toggleDrawer: PropTypes.func,
    text: PropTypes.string,
};

Header.defaultProps = {
    drawerWidth: 240,
    open: true,
    toggleDrawer: () => {},
    text: '',
};
