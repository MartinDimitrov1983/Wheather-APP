import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Menu,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
    addFavoriteCity,
    removeFavoriteCity,
} from '../../ReduxStore/actions/favorites';
import { getCurrentCityData } from '../../ReduxStore/actions/currentCity';
import { BASE_URL, API_KEY, AUTOCOMPLETE_URL } from '../../helpers/constants';
import { response } from './response';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import FavoriteButton from '../../components/Button/Button';
import Location from '../../components/Loacation/Location';
import ErrorDialog from '../../components/ErrorDialog/ErrorDialog';
import useStyles from './classes';

const HomePage = () => {
    const classes = useStyles();
    const favorites = useSelector((state) => state.favorites.favorites);
    const currentCityData = useSelector((state) => state.currentCity);
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [options, setOptions] = useState([
        { cityCountry: 'GB', cityName: 'London', id: 328328 },
    ]);
    const [open, setOpen] = useState(false);
    const [errOpen, setErrOpen] = useState('');


    console.log(currentCityData)
    const isFavorite = (id) => {
        return !!favorites.find((city) => city.id === id);
    };

    const handleFavoriteToggle = (city) => {
        isFavorite(city.id)
            ? dispatch(removeFavoriteCity(city.id))
            : dispatch(
                  addFavoriteCity({
                      id: city.id,
                      cityName: city.cityName,
                      cityCountry: city.cityCountry,
                  }),
              );
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${BASE_URL}${AUTOCOMPLETE_URL}?apikey=${API_KEY}&q=${cityName}`,
            );
            const data = await res.json();

            const newOptions =
                data.length > 0
                    ? data.map((city) => {
                          return {
                              id: city.Key,
                              cityName: city.LocalizedName,
                              cityCountry: city.Country.ID,
                          };
                      })
                    : [];

            setOptions(newOptions);
            setOpen(!!newOptions.length);
        } catch (error) {
            setErrOpen(error.massage);
        }
    };

    const handleOnBLur = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };

    const handleMenuItemClick = (city) => {
        dispatch(getCurrentCityData(city));
        setWeatherData(city);
        setCityName('');
        setOptions([]);
        setOpen(false);
    };

    const handleClose = () => {
        setCityName('');
        setOptions([]);
        setOpen(false);
    };

    const handleCloseError = () => {
        setErrOpen(false);
    };

    return (
        <>
            <Location />
            <Box className={classes.search}>
                <TextField
                    label="Search"
                    variant="outlined"
                    autoComplete="off"
                    value={cityName}
                    onChange={handleInputChange}
                    onBlur={handleOnBLur}
                />
                {options.length > 0 && (
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        {options.map((city) => (
                            <MenuItem
                                key={city.id}
                                onClick={() => handleMenuItemClick(city)}
                            >
                                {city.cityName} {city.cityCountry}
                            </MenuItem>
                        ))}
                    </Menu>
                )}
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>

            {currentCityData.city.id && (
                <Box className={classes.cityWrapper}>
                    {!currentCityData.isLoaded ? (
                        <CircularProgress />
                    ) : (
                        <Box className={classes.city}>
                            <WeatherCard
                                city={currentCityData.city}
                                onClick={() => {}}
                                cursor="auto"
                            />
                            <FavoriteButton
                                handleFavoriteToggle={(e) =>
                                    handleFavoriteToggle(currentCityData.city)
                                }
                                isFavorite={isFavorite(currentCityData.city.id)}
                            />
                        </Box>
                    )}
                </Box>
            )}
            <ErrorDialog
                open={false}
                content={'Error'}
                handleClose={handleCloseError}
            />
        </>
    );
};

export default HomePage;
