import React from 'react';
import './Button.css';

interface ButtonType {
    icon: string;
    caption: string;
}

export function Button({ icon, caption }: ButtonType) {
    return (
        <div className="btn">
            <img className="btn__img" src={icon} alt="" />
            <span className="btn__desc">{caption}</span>
        </div>
    );
}
