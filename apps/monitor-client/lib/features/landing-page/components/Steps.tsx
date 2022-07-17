import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StepCard } from './StepCard';
import { BotBadge } from './BotBadge';

export function Steps({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className="light-background2">
            <h2>Как пользоваться ботом?</h2>
            <StepCard
                primary={true}
                content={{
                    title: 'ШАГ 1',
                    desc: 'Добавьте номера телефона для отслеживания',
                    details: 'Доступные страны: Россия, Украина, Казахстан, Беларусь. В произвольном формате.',
                }}
            >
                {matches && <BotBadge />}
            </StepCard>

            <StepCard
                primary={false}
                content={{
                    title: 'ШАГ 2',
                    desc: 'Подключите уведомления',
                    details:
                        'Как только Ваши контакты будут онлайн, Вы получете разовое уведомление от бота. Для того чтобы снова получить уведомление, повторите команду /notify_online.',
                }}
            >
                {matches && <BotBadge />}
            </StepCard>

            <StepCard
                primary={true}
                content={{
                    title: 'ШАГ 3',
                    desc: 'Получайте ежедневный отчет',
                    details:
                        'Кроме уведомления от бота, каждый день Вы будете получать развернутый отчет об активности ваших контактов на почту.',
                }}
            />
        </div>
    );
}

Steps.propTypes = {
    '': PropTypes.func,
};

Steps.defaultProps = {
    '': () => {},
};
