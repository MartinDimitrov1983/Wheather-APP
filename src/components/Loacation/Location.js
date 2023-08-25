import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import ErrorDialog from '../ErrorDialog/ErrorDialog';

const Location = () => {
    const [closestCity, setClosestCity] = useState(null);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                        );
                        const data = await response.json();
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village;

                        setClosestCity(city);
                    } catch (error) {
                        setError('Error fetching city:');
                        setOpen(true);
                    }
                },
                (error) => {
                    setError('Error getting user location:');
                    setOpen(true);
                },
            );
        } else {
            setError('Geolocation is not supported in this browser.');
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ marginBottom: 3 }}>
                {closestCity ? (
                    <Typography variant="h6" sx={{height: "47px"}}>
                        Your Location: {closestCity}
                    </Typography>
                ) : (
                    <CircularProgress />
                )}
            </Box>
            <ErrorDialog
                open={open}
                content={error}
                handleClose={handleClose}
            />
        </>
    );
};

export default Location;
