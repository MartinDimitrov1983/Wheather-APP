import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentCityData } from '../../ReduxStore/actions/currentCity';
import WeatherCard from '../WeatherCard/WeatherCard';

const FavoriteList = ({ favorites }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (city) => {
        dispatch(getCurrentCityData(city));
        navigate('/');
    };
    return (
        <>
            {favorites.map((favorite) => (
                <WeatherCard
                    city={favorite}
                    onClick={() => handleClick(favorite)}
                    cursor="pointer"
                    key={favorite.id}
                />
            ))}
        </>
    );
};

export default FavoriteList;
