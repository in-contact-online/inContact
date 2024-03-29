import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Navbar } from './Navbar';
import { Offer } from './Offer';
import { Slider } from './Slider';
import { Step } from './Step';
import { Feature } from './Feature';
import { FeatureArrow } from './FeatureArrow';
import { Button } from './Button';
import { BurgerMenu } from './BurgerMenu';
import { DynamicElement } from './DynamicElement';
import './LandingPage.css';
import './fonts.css';

export function LandingPage() {
    const headerRef = React.createRef<HTMLElement>();
    const featuresRef = React.createRef<HTMLElement>();
    const stepsRef = React.createRef<HTMLElement>();
    const roadMapRef = React.createRef<HTMLElement>();
    const contactsRef = React.createRef<HTMLElement>();

    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div id="burger-outer-container">
            {isMobile ? (
                <BurgerMenu
                    featuresRef={featuresRef}
                    stepsRef={stepsRef}
                    roadMapRef={roadMapRef}
                    contactsRef={contactsRef}
                />
            ) : (
                ''
            )}
            <div id="burger-page-wrap">
                <header className="section section-header" ref={headerRef}>
                    <div className="container container-header">
                        <Navbar
                            featuresRef={featuresRef}
                            stepsRef={stepsRef}
                            roadMapRef={roadMapRef}
                            contactsRef={contactsRef}
                        />
                        <Offer />
                        <div className="bg-girl" />
                        <div className="bg-clouds" />
                    </div>
                </header>

                <section className="section section-slider" ref={featuresRef}>
                    <div className="container">
                        <h2 className="heading">Что может бот?</h2>
                        <Slider />
                    </div>
                </section>

                <section className="section section-steps" ref={stepsRef}>
                    <div className="container">
                        <h2 className="heading heading-light">Как работает бот?</h2>
                        <div className="section-steps__wrapper">
                            <Step
                                badgeText="Шаг 1"
                                stepIntro="Добавьте номера телефона для отслеживания"
                                stepOutro="* Доступные страны: Россия, Украина, Казахстан, Беларусь. В произвольном формате."
                            />
                            <Step
                                dark={true}
                                badgeText="Шаг 2"
                                stepIntro="Подключите уведомления"
                                stepOutro="* Как только Ваши контакты будут онлайн, Вы получете разовое уведомление от бота. Для того чтобы снова получить уведомление, повторите команду /notify_online."
                            />
                            <Step
                                next={false}
                                badgeText="Шаг 3"
                                stepIntro="Получайте ежедневный отчет"
                                stepOutro="* Кроме уведомления от бота, каждый день Вы будете получать развернутый отчет об активности ваших контактов на почту."
                            />
                        </div>
                    </div>
                </section>

                <DynamicElement timeout={2000} sectionRef={roadMapRef}>
                    <section className="section section-features" ref={roadMapRef}>
                        <div className="container">
                            <h2 className="heading">Планы по развитию бота</h2>
                            <div className="section-features__wrapper">
                                <Feature
                                    done={true}
                                    icon="/images/bar-chart.png"
                                    desc="Полная, поминутная, статистика выхода в сеть отслеживаемых контактов"
                                />
                                <FeatureArrow className="section-features__arrow" />
                                <Feature
                                    done={true}
                                    icon="/images/notifications.png"
                                    desc="Оповещения при смене статуса контакта, например, при  появлении онлайн"
                                />
                                <FeatureArrow className="section-features__arrow" />
                                <Feature
                                    done={false}
                                    icon="/images/networking.png"
                                    desc="Аналитика взаимодействия контактов, на основе накопленных данных об их онлайн статусах"
                                />
                            </div>
                        </div>
                    </section>
                </DynamicElement>

                <footer className="section section-footer" ref={contactsRef}>
                    <div className="container">
                        <h2 className="heading heading-light">Помогите разработке!</h2>
                        <div className="section-footer__wrapper">
                            <p className="section-footer__desc">
                                Присоединяйтесь к нашему комьюнити, учавствуйте в обсуждении бота и предлагайте
                                расширение функционала. Активные участники комьюнити первыми получат доступ к
                                расширенной версии бота!
                            </p>
                            <Button icon="/images/tg_button.png" caption="Обсудить в группе" />
                            <p className="section-footer__copy">Designed by @whiteadam</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
