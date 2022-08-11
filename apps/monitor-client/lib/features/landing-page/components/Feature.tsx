import React from 'react';
import './Feature.css';
import classNames from 'classnames';

interface FeatureType {
    done: boolean;
    icon: string;
    desc: string;
}

export function Feature({ done, icon, desc }: FeatureType) {
    return (
        <div className="feature">
            <span className={classNames('feature__plans', { 'feature__plans-done': done })}>
                {done ? 'Рализовано' : 'В разработке'}
            </span>
            <img className="feature__icon" src={icon} alt="" />
            <p className="feature__desc">{desc}</p>
        </div>
    );
}
