import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, AppBar, Toolbar, Box, Typography } from '@mui/material';
import {
    Home as HomeIcon,
    Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { toggleUnit } from '../../ReduxStore/actions/unit';
import useStyles from './classes';

const Header = ({ handleThemeToggle }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleToggleUnit = () => {
        dispatch(toggleUnit());
    };

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Box className={classes.toggleButtons}>
                    <Typography variant="h6">Wheather App</Typography>
                    <Button variant="outlined" onClick={handleThemeToggle}>
                        Set Theme
                    </Button>
                    <Button variant="outlined" onClick={handleToggleUnit}>
                        Toggle Unit
                    </Button>
                </Box>
                <Box className={classes.buttons}>
                    <Button variant="contained" component={Link} to="/">
                        <HomeIcon sx={{ marginRight: 1 }} />
                        Home
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/favorites"
                    >
                        <FavoriteIcon sx={{ marginRight: 1 }} />
                        Favorites
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
