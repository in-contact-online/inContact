import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface StepCardType {
    primary: boolean;
    content: {
        title: string;
        desc: string;
        details: string;
    };
    children?: any;
}

export function StepCard({ primary, content, children }: StepCardType) {
    const StyledGrid = styled(Grid, { name: 'step-card' })(({ theme }) => ({
        minHeight: 420,
        background: primary
            ? 'linear-gradient(177deg, rgba(210,215,217,1) 0%, rgba(246,249,250,1) 100%)'
            : 'linear-gradient(177deg, rgba(16,193,252,1) 0%, rgba(151,229,255,1) 100%)',
        margin: '0px auto 130px',
        borderRadius: 20,
        border: '1px solid #8D9193',
        ['p']: { fontSize: '2rem', color: primary ? '#000' : '#FFF' },
        ['p.small']: { fontSize: '1.5rem', fontStyle: 'italic' },
    }));

    const Badge = styled('div')(({ theme }) => ({
        fontSize: '2.5rem',
        width: '100px',
        boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        padding: 5,
        textAlign: 'center',
        backgroundColor: primary ? '#8D9193' : '#FFF',
        color: primary ? '#FFF' : '#000',
        borderRadius: 10,
    }));

    const StyledImg = styled('img')(({ theme }) => ({
        width: '100%',
        borderRadius: 24,
        boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        border: '1px solid #8D9193',
    }));

    const StyledDiv = styled('div')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -75,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 150,
        zIndex: 1,
    }));

    const Desciption = styled('div')(({ theme }) => ({
        width: '75%',
        marginTop: 60,
    }));

    return (
        <Grid container>
            <StyledGrid container item xs={10} sx={{ position: 'relative', paddingBottom: 10 }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Desciption>
                        <Badge>{content.title}</Badge>
                        <p>{content.desc}</p>
                        <Divider sx={{ marginTop: 5, border: '0.5px solid ' + (primary ? '#000' : '#FFF') }} />
                        <p className="small">{'* ' + content.details}</p>
                    </Desciption>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Desciption>
                        <StyledImg src="/images/bot_chat.gif" />
                    </Desciption>
                </Grid>
                <StyledDiv>{children}</StyledDiv>
            </StyledGrid>
        </Grid>
    );
}

StepCard.propTypes = {
    '': PropTypes.func,
};

StepCard.defaultProps = {
    '': () => {},
};
