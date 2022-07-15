import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';

const menu = [
    { id: 1, anchore: 'Шаги', link: '/steps' },
    { id: 2, anchore: 'Возможности', link: '/features' },
    { id: 3, anchore: 'Контакты', link: '/contacts' },
    { id: 4, anchore: 'Кабинет', link: '/admin' },
];

export function LandingMenu({}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const matches = useMediaQuery('(min-width:800px)');

    console.log(open);
    if (matches)
        return (
            <ul className="menu">
                {menu.map((item) => (
                    <li key={item.id} onClick={() => navigate(item.link)}>
                        {item.anchore}
                    </li>
                ))}
            </ul>
        );
    return (
        <>
            <button
                onClick={() => {
                    console.log('clicked!');
                }}
            >
                <MenuIcon sx={{ fontSize: '4rem' }} />
            </button>
            <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
                {'list(anchor)'}
            </Drawer>
        </>
    );
}

LandingMenu.propTypes = {
    '': PropTypes.func,
};

LandingMenu.defaultProps = {
    '': () => {},
};
