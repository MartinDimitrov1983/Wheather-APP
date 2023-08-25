import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import FavoriteList from '../../components/FavoriteList/FavoriteList';
import useStyles from './classes';

const FavoritePage = () => {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favorites.favorites);

    return (
        <>
            {favorites.length > 0 ? (
                false ? (
                    <Box className={classes.loading}>
                        <CircularProgress />{' '}
                    </Box>
                ) : (
                    <Box className={classes.cityWrapper}>
                        <FavoriteList favorites={favorites} />
                    </Box>
                )
            ) : (
                <Typography variant="h5">Favorites not found.</Typography>
            )}
        </>
    );
};

export default FavoritePage;
