import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Feature } from './Feature';

export function Features() {
    return (
        <Grid container={true} sx={{ backgroundColor: '#e5f9ff' }}>
            <h2>Планы по развитию бота</h2>
            <Grid container={true} item={true} xs={10} sx={{ margin: 'auto' }}>
                <Grid item={true} xs={12} sm={4}>
                    <Feature
                        done={true}
                        description="Полная, поминутная, статистика выхода в сеть отслеживаемых контактов"
                        url="/images/bar-chart.png"
                        timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
                    />
                </Grid>
                <Grid item={true} xs={12} sm={4}>
                    <Feature
                        done={true}
                        description="Оповещения при смене статуса контакта, например, при  появлении онлайн"
                        url="/images/notifications.png"
                        timeout={{ appear: 2000, enter: 2000, exit: 2000 }}
                    />
                </Grid>
                <Grid item={true} xs={12} sm={4}>
                    <Feature
                        description="Аналитика взаимодействия контактов, на основе накопленных данных об их онлайн статусах"
                        url="/images/networking.png"
                        timeout={{ appear: 3000, enter: 3000, exit: 3000 }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

Features.propTypes = {
    '': PropTypes.func,
};

Features.defaultProps = {
    '': () => {},
};
