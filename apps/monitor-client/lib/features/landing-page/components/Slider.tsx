import React from 'react';
import './Slider.css';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRight';

export function Slider() {
    return (
        <div className="slider">
            <ArrowLeft />
            <div className="slider__container">
                <h3 className="slider__header">Узнать когда пользователь бывает в сети в течении дня</h3>
                <div className="slider__desc">
                    <img className="slider__icon" src="/images/line-chart.png" alt="" />
                    <p>
                        Каждый день на почту вы будете получать отчет “Анализ активности” о том, когда и сколько времени
                        пользователь был в сети.
                    </p>
                </div>
            </div>
            <ArrowRight />
            <div className="slider__btn">Попробовать</div>
        </div>
    );
}
