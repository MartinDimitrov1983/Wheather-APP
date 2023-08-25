export const PREFIX = 'FAVORITE_CITY_MANAGER/';

export const ADD_FAVORITE_CITY = `${PREFIX}ADD_FAVORITE_CITY`;
export const REMOVE_FAVORITE_CITY = `${PREFIX}REMOVE_FAVORITE_CITY`;
export const GET_FAVORITE_CITIES_WEATHER = `${PREFIX}GET_FAVORITE_CITIES_WEATHER`;
export const FAVORITE_CITIES_WEATHER_LOADING = `${PREFIX}FAVORITE_CITIES_WEATHER_LOADING`;
export const FAVORITE_CITIES_WEATHER_LOADED = `${PREFIX}FAVORITE_CITIES_WEATHER_LOADED`;
export const FAVORITE_CITIES_WEATHER_LOADING_FAILED = `${PREFIX}FAVORITE_CITIES_WEATHER_LOADING_FAILED`;
export const FAVORITE_CITIES_CLEAR_ERROR = `${PREFIX}FAVORITE_CITIES_CLEAR_ERROR`;

export const addFavoriteCity = (city) => ({
    type: ADD_FAVORITE_CITY,
    payload: city,
});
export const removeFavoriteCity = (id) => ({
    type: REMOVE_FAVORITE_CITY,
    payload: id,
});

export const favoriteCitiesWeatherLoading = {
    type: FAVORITE_CITIES_WEATHER_LOADING,
};
export const favoriteCitiesClearError = { type: FAVORITE_CITIES_CLEAR_ERROR };
export const favoriteCitiesWeatherLoadied = (cities) => ({
    type: FAVORITE_CITIES_WEATHER_LOADED,
    payload: cities,
});
export const favoriteCitesWeatherLoadedFailed = (error) => ({
    type: FAVORITE_CITIES_WEATHER_LOADING_FAILED,
    payload: error,
});

export function getFavoriteCitiesWeather(cities) {
    return async function (dispatch, _, DataService) {
        dispatch(favoriteCitiesWeatherLoading);
        const citiesWithTemp = [];
        try {
            for (const city of cities) {
                const response = await DataService.getCurrentCondition(city.id);
                const data = await response.json();

                const favCityWithTemp = {
                    ...city,
                    temperature: {
                        celsius: {
                            value: data[0].Temperature.Metric.Value,
                        },
                    },
                };
                citiesWithTemp.push(favCityWithTemp);
            }
            dispatch(favoriteCitiesWeatherLoadied(citiesWithTemp));
        } catch (error) {
            console.log(error);
            dispatch(favoriteCitesWeatherLoadedFailed(error));
        }
    };
}
