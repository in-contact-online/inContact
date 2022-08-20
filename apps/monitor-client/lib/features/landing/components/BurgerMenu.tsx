import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faShoePrints, faMapLocationDot, faUser, faContactBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { appPersistentStorage } from '../../../../utils/AppPersistentStorage';
import './BurgerMenu.css';

interface MenuRefType {
    headerRef: React.RefObject<HTMLElement>;
    featuresRef: React.RefObject<HTMLElement>;
    stepsRef: React.RefObject<HTMLElement>;
    roadMapRef: React.RefObject<HTMLElement>;
    contactsRef: React.RefObject<HTMLElement>;
}

export function BurgerMenu({ headerRef, featuresRef, stepsRef, roadMapRef, contactsRef }: MenuRefType) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, ref: React.RefObject<HTMLElement>) => {
        event.preventDefault();
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const navigate = useNavigate();

    const adminFlag = appPersistentStorage.adminFlag;

    return (
        <Menu
            customBurgerIcon={<img src="/images/robot-icon.svg" />}
            className={'burger-menu'}
            right={true}
            pageWrapId={'burger-page-wrap'}
            outerContainerId={'burger-outer-container'}
        >
            <a id="home" className="menu-item" href="" onClick={(event) => handleClick(event, featuresRef)}>
                <FontAwesomeIcon icon={faRobot} width={30} />
                <span className="burger-menu-text">Что может бот?</span>
            </a>
            <a id="about" className="menu-item" href="" onClick={(event) => handleClick(event, stepsRef)}>
                <FontAwesomeIcon icon={faShoePrints} width={30} />
                <span className="burger-menu-text">Как работает?</span>
            </a>
            <a id="contact" className="menu-item" href="" onClick={(event) => handleClick(event, roadMapRef)}>
                <FontAwesomeIcon icon={faMapLocationDot} width={30} />
                <span className="burger-menu-text">Road map</span>
            </a>
            <a id="contact" className="menu-item" href="" onClick={(event) => handleClick(event, contactsRef)}>
                <FontAwesomeIcon icon={faContactBook} width={30} />
                <span className="burger-menu-text">Контакты</span>
            </a>
            {adminFlag ? (
                <a
                    className="menu-item--small"
                    href=""
                    onClick={(event) => {
                        event.preventDefault();
                        navigate('/admin');
                    }}
                >
                    <FontAwesomeIcon icon={faUser} width={30} />
                    <span className="burger-menu-text">Кабинет</span>
                </a>
            ) : (
                ''
            )}
        </Menu>
    );
}
