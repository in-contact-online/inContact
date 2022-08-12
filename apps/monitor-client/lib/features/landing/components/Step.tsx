import React from 'react';
import classNames from 'classnames';
import { NextArrow } from './NextArrow';
import './Step.css';

interface StepType {
    dark?: boolean;
    badgeText: string;
    stepIntro: string;
    stepOutro: string;
    next?: boolean;
}

export function Step({ dark, badgeText, stepIntro, stepOutro, next = true }: StepType) {
    return (
        <div className={classNames('step', { 'step-dark': dark })}>
            <div className="step__desc">
                <span className="step__badge">{badgeText}</span>
                <p className="step__intro">{stepIntro}</p>
                <hr />
                <p className="step__outro">{stepOutro}</p>
            </div>
            <div className="step__chat">
                <img className="step__image" src="/images/bot_chat.gif" alt="" />
            </div>
            {next ? <NextArrow /> : ''}
        </div>
    );
}
