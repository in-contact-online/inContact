import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import './styles.css';

export function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="first-section dark-background">
                <div className="container">
                    <div className="header">
                        <div className="logo" />
                        <ul className="menu">
                            <li onClick={() => navigate('/admin')}>Админка</li>
                            <li>Возможноти</li>
                            <li>Тарифы</li>
                            <li>Кабинет</li>
                        </ul>
                        <div className="girl" />
                        <div className="messages-bg" />
                        <div className="light-blur-bg" />
                    </div>

                    <div className="offer">
                        <h1>Контроль статусов Telegram</h1>
                        <p>
                            С помощью нашего <strong>telegram-бота</strong> вы сможете отслеживать онлайн статус ваших
                            знакомых и понимать с кем они общаются
                        </p>
                        <span>@get_statuses_bot</span>
                    </div>
                </div>
            </div>

            <div className="second-section light-background">
                <div className="search">
                    <div className="input-group">
                        <input type="text" placeholder="Введите номер телефона" />
                        <div className="btn">Проверить</div>
                    </div>
                    <div className="bot" />
                </div>
                <div className="container">
                    <h1>Возможности бота</h1>
                </div>
            </div>
        </>
    );
}

LandingPage.propTypes = {
    '': PropTypes.func,
};

LandingPage.defaultProps = {
    '': () => {},
};

/* </html> */
