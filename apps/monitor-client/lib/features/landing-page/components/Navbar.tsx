import React from 'react';
import './Navbar.css';

export function Navbar() {
    return (
        <div className="nav">
            <img className="logo" src="/images/in-contact-logo.webp" />
            <ol className="menu">
                <li className="menu__item">Возможности</li>
                <li className="menu__item">Как работает?</li>
                <li className="menu__item-active">Road Map</li>
                <li className="menu__item">Кабинет</li>
            </ol>
        </div>
    );
}
