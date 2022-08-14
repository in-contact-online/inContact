import React from 'react';
import './Arrows.css';

export function ArrowRight() {
    return (
        <svg
            className="arrow-right"
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="33.4166" cy="32.5" r="32.5" fill="#10C1FC" />
            <line
                y1="-1.5"
                x2="16.9539"
                y2="-1.5"
                transform="matrix(0.716995 0.697078 0.716995 -0.697078 29.8442 20)"
                stroke="white"
                stroke-width="3"
            />
            <line
                y1="-1.5"
                x2="16.9539"
                y2="-1.5"
                transform="matrix(-0.716995 0.697078 0.716995 0.697078 42 32.8031)"
                stroke="white"
                stroke-width="3"
            />
        </svg>
    );
}
