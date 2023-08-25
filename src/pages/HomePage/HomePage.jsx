import React, { useState } from 'react';
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
import {
    getCurrentCityData,
    currentCityClearError,
} from '../../ReduxStore/actions/currentCity';
import { BASE_URL, API_KEY, AUTOCOMPLETE_URL } from '../../helpers/constants';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [options, setOptions] = useState([
        { cityCountry: 'GB', cityName: 'London', id: 328328 },
    ]);
    const [open, setOpen] = useState(false);

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
        dispatch(currentCityClearError);
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
                open={!!currentCityData.error}
                content={currentCityData.error?.massage || "Something went wrong!"}
                handleClose={handleCloseError}
            />
        </>
    );
};

export default HomePage;
