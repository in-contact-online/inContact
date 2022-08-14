import React from 'react';
import './Offer.css';

export const Offer = () => {
    return (
        <div className="offer">
            <h1 className="offer__header">Контроль статусов Telegram</h1>
            <p className="offer__desc">
                С помощью нашего <strong>telegram-бота</strong> вы сможете отслеживать онлайн статус ваших знакомых и
                понимать с кем они общаются.
            </p>
            <p className="offer__address">@get_statuses_bot</p>
        </div>
    );
};
