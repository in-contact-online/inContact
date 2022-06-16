import React, { useState } from 'react';
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

export function Layout({ renderHeader, renderSidebar, renderContent, renderFooter }: any) {
    const [open, setOpen] = useState(true);

    const drawerWidth: number = 240;
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {renderHeader({ drawerWidth, toggleDrawer, open })}
                {renderSidebar({ drawerWidth, toggleDrawer, open })}

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
                        <Grid container spacing={3}>
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
