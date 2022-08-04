import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, Container, Grid } from '@mui/material';

const mdTheme = createTheme({
    palette: {
        secondary: {
            main: '#E33E7F',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        fontSize: 22,
    },
});

interface ILayout {
    renderHeader: () => ReactElement;
    renderSidebar: () => ReactElement;
    renderContent: () => ReactElement;
    renderFooter: () => ReactElement;
}

export function Layout(props: ILayout) {
    const { renderHeader, renderSidebar, renderContent, renderFooter } = props;

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {renderHeader()}
                {renderSidebar()}

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container={true} spacing={3}>
                            {renderContent()}
                        </Grid>
                        {renderFooter()}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

Layout.propTypes = {
    renderHeader: PropTypes.func,
    renderSidebar: PropTypes.func,
    renderContent: PropTypes.func,
    renderFooter: PropTypes.func,
};

Layout.defaultProps = {
    renderHeader: () => {},
    renderSidebar: () => {},
    renderContent: () => {},
    renderFooter: () => {},
};
