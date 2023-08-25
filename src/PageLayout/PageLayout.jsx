import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import useStyles from './classes';

function PageLayout({ toggleTheme, children }) {
    const classes = useStyles();

    return (
        <Box className={classes.layout}>
            <Header handleThemeToggle={toggleTheme} />
            <Box className={classes.main}>{children}</Box>
        </Box>
    );
}

export default PageLayout;
