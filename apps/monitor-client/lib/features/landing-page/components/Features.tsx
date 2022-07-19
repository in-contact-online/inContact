import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from './Menu';
import { useMediaQuery } from '@mui/material';
import { Offer } from './Offer';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Feature } from './Feature';
import { Grid } from '@mui/material';

const Logo = styled('img')(({ theme }) => ({}));

export function Features({}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Grid container sx={{ backgroundColor: '#e5f9ff' }}>
            <h2>Планы по развитию бота</h2>
            <Grid container item xs={10} sx={{ margin: 'auto' }}>
                <Grid item xs={12} sm={4}>
                    <Feature
                        done
                        description="Полная, поминутная, статистика выхода в сеть отслеживаемых контактов"
                        url="/images/bar-chart.png"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Feature
                        done
                        description="Оповещения при смене статуса контакта, например, при  появлении онлайн"
                        url="/images/notifications.png"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Feature
                        description="Аналитика взаимодействия контактов, на основе накопленных данных об их онлайн статусах"
                        url="/images/networking.png"
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
