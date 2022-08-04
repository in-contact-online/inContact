import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { MobileMenu } from './MobileMenu';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const StyledUl = styled('ul')(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const menu = [
    { id: 1, anchor: 'Как пользоваться?', link: '/steps' },
    { id: 2, anchor: 'Возможности', link: '/features' },
    { id: 3, anchor: 'Контакты', link: '/contacts' },
    { id: 4, anchor: 'Кабинет', link: '/admin' },
];

export function Menu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    if (matches)
        return (
            <>
                <StyledUl className="menu">
                    {menu.map((item) => (
                        <li key={item.id} onClick={() => navigate(item.link)}>
                            {item.anchor}
                        </li>
                    ))}
                </StyledUl>
            </>
        );
    return (
        <>
            <MenuIcon sx={{ fontSize: '4rem' }} onClick={() => setOpen(!open)} />
            <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
                <MobileMenu items={menu} />
            </Drawer>
        </>
    );
}

Menu.propTypes = {
    '': PropTypes.func,
};

Menu.defaultProps = {
    '': () => {},
};
