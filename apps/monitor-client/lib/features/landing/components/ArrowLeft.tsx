import React from 'react';
import './Arrows.css';

export function ArrowLeft() {
    return (
        <svg
            className="arrow"
            width="65"
            height="66"
            viewBox="0 0 65 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M63.75 33C63.75 50.6999 49.8071 65 32.6666 65C15.5262 65 1.58331 50.6999 1.58331 33C1.58331 15.3001 15.5262 1 32.6666 1C49.8071 1 63.75 15.3001 63.75 33Z"
                fill="#10C1FC"
                stroke="#10C1FC"
                stroke-width="2"
            />
            <line x1="37.0607" y1="22.0607" x2="25.0607" y2="34.0607" stroke="white" stroke-width="3" />
            <line x1="25.0607" y1="32.9393" x2="37.0607" y2="44.9393" stroke="white" stroke-width="3" />
        </svg>
    );
}
