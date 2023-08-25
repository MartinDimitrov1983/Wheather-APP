import {
    CURRENT_CITY_LOADED,
    CURRENT_CITY_LOADING,
    CURRENT_CITY_LOADING_FAILED,
    CURRENT_CITY_CLEAR_ERROR,
    CURRENT_CITY_SET_ERROR,
} from '../actions/currentCity';

const initialState = {
    city: {},
    isLoaded: false,
    error: null,
};

const currentCity = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_CITY_LOADING: {
            return {
                ...state,
                isLoaded: false,
            };
        }
        case CURRENT_CITY_LOADED: {
            return {
                ...state,
                isLoaded: true,
                city: action.payload,
            };
        }
        case CURRENT_CITY_LOADING_FAILED: {
            return {
                ...state,
                isLoaded: true,
                error: action.payload,
            };
        }
        case CURRENT_CITY_CLEAR_ERROR: {
            return {
                ...state,
                error: null,
            };
        }
        case CURRENT_CITY_SET_ERROR: {
            return { ...state, error: action.payload };
        }

        default: {
            return state;
        }
    }
};

export default currentCity;
