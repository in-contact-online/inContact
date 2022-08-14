import React from 'react';

import './Slider.css';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRight';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Slider() {
    return (
        <div className="slider">
            <ArrowLeft />
            <div className="slider__container">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.arrow-left',
                        nextEl: '.arrow-right',
                    }}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <h3 className="slider__header">Узнать когда пользователь бывает в сети в течении дня</h3>
                        <div className="slider__desc">
                            <img className="slider__icon" src="/images/line-chart.png" alt="" />
                            <p>
                                Каждый день на почту Вы будете получать отчет <a href="">График активности</a> о том,
                                когда и сколько времени пользователь был онлайн в <strong>Telegram.</strong>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <h3 className="slider__header">Уведомить Вас когда пользователь будет онлайн</h3>
                        <div className="slider__desc">
                            <img className="slider__icon" src="/images/notify.png" alt="" />
                            <p>
                                Как только пользователь выйдет в сеть <strong>Telegram</strong>, Вы получите уведомление
                                от бота.
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <h3 className="slider__header">Отслеживать статусы нескольких контактов</h3>
                        <div className="slider__desc">
                            <img className="slider__icon" src="/images/group.png" alt="" />
                            <p>
                                Отслеживая статусы нескольких контактов, Вы будете понимать общаются ли они между собой,
                                сопоставив их статусы онлайн в течении дня, недели, месяца.
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <ArrowRight />
            <div className="slider__btn">Попробовать</div>
        </div>
    );
}
