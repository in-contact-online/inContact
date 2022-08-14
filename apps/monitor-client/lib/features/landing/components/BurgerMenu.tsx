import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './BurgerMenu.css';

export function BurgerMenu() {
    return (
        <Menu
            customBurgerIcon={<img src="/images/hamburger-svgrepo-com.svg" />}
            className={'burger-menu'}
            right={true}
            pageWrapId={'burger-page-wrap'}
            outerContainerId={'burger-outer-container'}
        >
            <a id="home" className="menu-item" href="/">
                Home
            </a>
            <a id="about" className="menu-item" href="/about">
                About
            </a>
            <a id="contact" className="menu-item" href="/contact">
                Contact
            </a>
            <a className="menu-item--small" href="">
                Settings
            </a>
        </Menu>
    );
}
