import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import WebhookIcon from '@mui/icons-material/Webhook';
import AssignmentIcon from '@mui/icons-material/Assignment';

export function MainListItems() {
    let navigate = useNavigate();

    return (
        <>
            <ListItemButton onClick={() => navigate('/server')}>
                <ListItemIcon>
                    <WebhookIcon />
                </ListItemIcon>
                <ListItemText primary="Server" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/sessions')}>
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Sessions" />
            </ListItemButton>
        </>
    );
}

MainListItems.propTypes = {};

MainListItems.defaultProps = {};

export function SecondaryListItems() {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </ListItemButton>
        </React.Fragment>
    );
}

SecondaryListItems.propTypes = {};

SecondaryListItems.defaultProps = {};
