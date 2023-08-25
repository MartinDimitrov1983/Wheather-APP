import {
    ADD_FAVORITE_CITY,
    REMOVE_FAVORITE_CITY,
    FAVORITE_CITIES_WEATHER_LOADING,
    FAVORITE_CITIES_WEATHER_LOADED,
    FAVORITE_CITIES_WEATHER_LOADING_FAILED,
    FAVORITE_CITIES_CLEAR_ERROR,
} from '../actions/favorites';

const getFavorites = localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

const initialState = {
    favorites: [...getFavorites],
    error: null,
    isLoaded: false,
};

const favorites = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_CITY: {
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        }
        case REMOVE_FAVORITE_CITY: {
            return {
                ...state,
                favorites: state.favorites.filter(
                    (city) => city.id !== action.payload,
                ),
            };
        }
        case FAVORITE_CITIES_WEATHER_LOADING: {
            return {
                ...state,
                isLoaded: false,
            };
        }
        case FAVORITE_CITIES_WEATHER_LOADED: {
            return {
                ...state,
                isLoaded: true,
                favorites: action.payload,
            };
        }
        case FAVORITE_CITIES_WEATHER_LOADING_FAILED: {
            return {
                ...state,
                isLoaded: true,
                error: action.payload,
            };
        }
        case FAVORITE_CITIES_CLEAR_ERROR: {
            return { ...state, error: null };
        }

        default: {
            return state;
        }
    }
};

export default favorites;
