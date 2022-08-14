import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faShoePrints, faMapLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon icon={faRobot} width={30} />
                <span className="burger-menu-text">Возможности</span>
            </a>
            <a id="about" className="menu-item" href="/about">
                <FontAwesomeIcon icon={faShoePrints} width={30} />
                <span className="burger-menu-text">Как работает?</span>
            </a>
            <a id="contact" className="menu-item" href="/contact">
                <FontAwesomeIcon icon={faMapLocationDot} width={30} />
                <span className="burger-menu-text">Road map</span>
            </a>
            <a className="menu-item--small" href="">
                <FontAwesomeIcon icon={faUser} width={30} />
                <span className="burger-menu-text">Кабинет</span>
            </a>
        </Menu>
    );
}
