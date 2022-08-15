import React from 'react';
import './Navbar.css';

interface MenuRefType {
    headerRef: React.RefObject<HTMLElement>;
    featuresRef: React.RefObject<HTMLElement>;
    stepsRef: React.RefObject<HTMLElement>;
    roadMapRef: React.RefObject<HTMLElement>;
    contactsRef: React.RefObject<HTMLElement>;
}

export function Navbar({ headerRef, featuresRef, stepsRef, roadMapRef, contactsRef }: MenuRefType) {
    function scrollToElement(el: HTMLElement | null) {
        el?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="nav">
            <img className="logo" src="/images/in-contact-logo.webp" />
            <ol className="menu">
                <li className="menu__item" onClick={() => scrollToElement(featuresRef.current)}>
                    Что может бот?
                </li>
                <li className="menu__item" onClick={() => scrollToElement(stepsRef.current)}>
                    Как работает бот?
                </li>
                <li className="menu__item" onClick={() => scrollToElement(roadMapRef.current)}>
                    Road Map
                </li>
                <li className="menu__item" onClick={() => scrollToElement(contactsRef.current)}>
                    Контакты
                </li>
                <li className="menu__item menu__item-admin">Server</li>
            </ol>
        </div>
    );
}
