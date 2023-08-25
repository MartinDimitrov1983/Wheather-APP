import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteCitiesWeather } from '../../ReduxStore/actions/favorites';
import FavoriteList from '../../components/FavoriteList/FavoriteList';
import useStyles from './classes';

const FavoritePage = () => {
    const classes = useStyles();
    const favCites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavoriteCitiesWeather(favCites.favorites));
    }, [dispatch]);

    return (
        <>
            {favCites.favorites.length > 0 ? (
                !favCites.isLoaded ? (
                    <Box className={classes.loading}>
                        <CircularProgress />{' '}
                    </Box>
                ) : (
                    <Box className={classes.cityWrapper}>
                        <FavoriteList favorites={favCites.favorites} />
                    </Box>
                )
            ) : (
                <Typography variant="h5">Favorites not found.</Typography>
            )}
        </>
    );
};

export default FavoritePage;
