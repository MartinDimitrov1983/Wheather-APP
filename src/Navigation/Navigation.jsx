import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentCityData } from '../ReduxStore/actions/currentCity';
import HomePage from '../pages/HomePage/HomePage';
import FavoritePage from '../pages/FavoritePage/FavoritePage';

function Navigation() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getCurrentCityData({
                cityCountry: 'GB',
                cityName: 'London',
                id: 328328,
            }),
        );
    }, [dispatch]);
    return (
        <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
    );
}

export default Navigation;
