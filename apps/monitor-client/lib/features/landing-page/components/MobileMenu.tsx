import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemText = styled(ListItemText)({
    ['.MuiTypography-root']: { fontSize: '2rem', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' },
    background: 'FFFFFA',
});

interface MobileMenuProps {
    items: { id: number; anchor: string; link: string }[];
}

export function MobileMenu({ items }: MobileMenuProps) {
    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {items.map((item: any, index: any) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon></ListItemIcon>
                            <StyledListItemText primary={item.anchor} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

MobileMenu.propTypes = {
    '': PropTypes.func,
};

MobileMenu.defaultProps = {
    '': () => {},
};
