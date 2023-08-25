import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    ButtonBase,
    CircularProgress,
    Box,
} from '@mui/material';
import convertTemperature from '../../helpers/convertTemperature';
import {
    CELSIUS,
    CELSIUS_SYMBOL,
    FAHRENHEIT_SYMBOL,
} from '../../helpers/constants';

const WeatherCard = ({ city, onClick, cursor, ...props }) => {
    const unit = useSelector((state) => state.unit.unit);
    const forecast = city?.forecast?.length > 0;
    const text = city?.temperature?.weatherText;

    return (
        <ButtonBase
            onClick={onClick}
            disableRipple={true}
            sx={{ cursor: cursor }}
        >
            <Card {...props} sx={{ border: '1px solid black', width: '320px' }}>
                <CardContent>
                    <Typography variant="h6">{`${city.cityName} ${city.cityCountry}`}</Typography>
                    {text && (
                        <Typography variant="body2">
                            {city.temperature.weatherText}
                        </Typography>
                    )}
                    <Typography variant="h2">
                        {convertTemperature(
                            unit,
                            city?.temperature?.celsius?.value,
                        )}
                        &deg;
                        {unit === CELSIUS ? CELSIUS_SYMBOL : FAHRENHEIT_SYMBOL}
                    </Typography>
                </CardContent>
                {forecast && (
                    <CardContent>
                        <Typography variant="h6">5-Day Forecast</Typography>
                        <Grid container spacing={2}>
                            {city.forecast.map((day) => (
                                <Grid item key={day.day}>
                                    <Typography variant="body2">
                                        {day.day}
                                    </Typography>
                                    <Typography variant="body2">
                                        {convertTemperature(unit, day.maximumT)}
                                        &deg;
                                        {unit === CELSIUS
                                            ? CELSIUS_SYMBOL
                                            : FAHRENHEIT_SYMBOL}
                                    </Typography>
                                    <Typography variant="body2">
                                        {convertTemperature(unit, day.minimumT)}
                                        &deg;
                                        {unit === CELSIUS
                                            ? CELSIUS_SYMBOL
                                            : FAHRENHEIT_SYMBOL}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                )}
            </Card>
        </ButtonBase>
    );
};

export default WeatherCard;
