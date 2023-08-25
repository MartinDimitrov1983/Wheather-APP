import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './ReduxStore/store';
import Navigation from './Navigation/Navigation';
import PageLayout from './PageLayout/PageLayout';
import { DARK_THEME, LIGHT_THEME } from './helpers/constants';

function App() {
    const [mode, setMode] = useState(LIGHT_THEME);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
                );
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    type: mode,
                },
            }),
        [mode],
    );
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <PageLayout toggleTheme={colorMode.toggleColorMode}>
                        <Navigation />
                    </PageLayout>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
