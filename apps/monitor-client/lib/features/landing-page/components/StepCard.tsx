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
    const StyledGrid = styled(Grid)(({ theme }) => ({
        height: 460,
        background: primary
            ? 'linear-gradient(177deg, rgba(210,215,217,1) 0%, rgba(246,249,250,1) 100%)'
            : 'linear-gradient(177deg, rgba(16,193,252,1) 0%, rgba(151,229,255,1) 100%)',
        margin: '0px auto 130px',
        borderRadius: 20,
        border: '1px solid #8D9193',
        ['p']: { fontSize: '2rem', marginLeft: 60, marginTop: 40, color: primary ? '#000' : '#FFF' },
        ['p.small']: { fontSize: '1.5rem', marginLeft: 60, marginTop: 20, fontStyle: 'italic' },
        ['.MuiDivider-root']: { marginLeft: 60 },
    }));

    const Badge = styled('div')(({ theme }) => ({
        fontSize: '2.5rem',
        width: '100px',
        boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        padding: 5,
        marginTop: 80,
        marginLeft: 60,
        textAlign: 'center',
        backgroundColor: primary ? '#8D9193' : '#FFF',
        color: primary ? '#FFF' : '#000',
        borderRadius: 10,
    }));

    const StyledImg = styled('img')(({ theme }) => ({
        width: 400,
        marginTop: 80,
        marginLeft: 80,
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

    return (
        <Grid container>
            <StyledGrid container item xs={10} sx={{ position: 'relative' }}>
                <Grid item xs={6}>
                    <Badge>{content.title}</Badge>
                    <p>{content.desc}</p>
                    <Divider sx={{ marginTop: 5, border: '0.5px solid ' + (primary ? '#000' : '#FFF') }} />
                    <p className="small">{'* ' + content.details}</p>
                </Grid>
                <Grid item xs={6}>
                    <StyledImg src="/images/bot_chat.gif" />
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
