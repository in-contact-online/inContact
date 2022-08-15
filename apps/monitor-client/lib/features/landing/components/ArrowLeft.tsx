import React from 'react';
import './Arrows.css';

export function ArrowLeft() {
    return (
        <svg
            className="arrow-left"
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="33.0833" cy="32.5" r="31.5" fill="#10C1FC" stroke="#10C1FC" strokeWidth="2" />
            <line
                y1="-1.5"
                x2="16.9539"
                y2="-1.5"
                transform="matrix(-0.716995 0.697078 -0.716995 -0.697078 36.1558 20)"
                stroke="white"
                strokeWidth="3"
            />
            <line
                y1="-1.5"
                x2="16.9539"
                y2="-1.5"
                transform="matrix(0.716995 0.697078 -0.716995 0.697078 24 32.8031)"
                stroke="white"
                strokeWidth="3"
            />
        </svg>
    );
}
