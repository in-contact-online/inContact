import React from 'react';
import './Arrows.css';

export function ArrowRight() {
    return (
        <svg
            className="arrow"
            width="66"
            height="66"
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse cx="33" cy="33" rx="32.0833" ry="33" fill="#10C1FC" />
            <line
                y1="-1.5"
                x2="16.9706"
                y2="-1.5"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 29 21)"
                stroke="white"
                stroke-width="3"
            />
            <line
                y1="-1.5"
                x2="16.9706"
                y2="-1.5"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 41 34)"
                stroke="white"
                stroke-width="3"
            />
        </svg>
    );
}
