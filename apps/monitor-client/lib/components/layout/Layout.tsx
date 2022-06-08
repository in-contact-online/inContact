import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, Container } from '@mui/material';

import { Copyright } from './Copyright';

const mdTheme = createTheme({
    palette: {
        secondary: {
            main: '#E33E7F',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
    },
});

export function Layout({ renderHeader, renderSidebar, renderContent }: any) {
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
                        {renderContent()}
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
