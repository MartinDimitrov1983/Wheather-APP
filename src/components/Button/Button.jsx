import React from 'react';
import {Button }from  '@mui/material';
import {

  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

function FavoriteButton({ handleFavoriteToggle,isFavorite }) {
    return (
        <Button
            sx={{ marginTop: 2.5 }}
            variant="outlined"
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={handleFavoriteToggle}
            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
    );
}

export default FavoriteButton;
