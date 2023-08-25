export const PREFIX = 'FAVORITE_CITY_MANAGER/';

export const ADD_FAVORITE_CITY = `${PREFIX}ADD_FAVORITE_CITY`;
export const REMOVE_FAVORITE_CITY = `${PREFIX}REMOVE_FAVORITE_CITY`;
export const GET_FAVORITE_CITIES_WAETHER = `${PREFIX}GET_FAVORITE_CITIES_WAETHER`;
export const FAVORITE_CITIES_WAETHER_LOADING = `${PREFIX}FAVORITE_CITIES_WAETHER_LOADING`;
export const FAVORITE_CITIES_WAETHER_LOADED = `${PREFIX}FAVORITE_CITIES_WAETHER_LOADED`;
export const FAVORITE_CITIES_WAETHER_LOADING_FAILED = `${PREFIX}FAVORITE_CITIES_WAETHER_LOADING_FAILED`;

export const addFavoriteCity = (city) => ({
    type: ADD_FAVORITE_CITY,
    payload: city,
});
export const removeFavoriteCity = (id) => ({
    type: REMOVE_FAVORITE_CITY,
    payload: id,
});

export const favoriteCitiesWetherLoading = {
    type: FAVORITE_CITIES_WAETHER_LOADING,
};
export const favoriteCitiesWetherLoadied = (cities) => ({
    type: FAVORITE_CITIES_WAETHER_LOADED,
    payload: cities,
});
export const favoriteCitesWeatherLoadedFailed = (error) => ({
    type: FAVORITE_CITIES_WAETHER_LOADING_FAILED,
    payload: error,
});

export function getFavoriteCitiesWather(cities) {
    return async function (dispatch, _, DataService) {
        try {
            dispatch(favoriteCitiesWetherLoading);
            
            // const cc = currentWeather[0]
            // const five = fiveDay.DailyForecasts.map((day)=> {
            //     return {
            //       day: new Date(day.Date).toLocaleDateString('en-US', {
            //         weekday: 'short',
            //       }),
            //       minimumT: day.Temperature.Minimum.Value,
            //       maximumT: day.Temperature.Maximum.Value
            //     }
            // })

            // const currentCityData = {
            //   temperature: {
            //     celsius: {
            //       value: cc.Temperature.Metric.Value
            //     },
            //     fahrenheit :{
            //       value : cc.Temperature.Imperial.Value
            //     },
            //     weatherText: cc.WeatherText
            //   },
            //   forecast:[...five],
            //   cityName: city.cityName,
            //   cityCountry: city.cityCountry,
            //   id: city.id
            // }

            dispatch(favoriteCitiesWetherLoadied(cities));
        } catch (error) {
            console.log(error);
            dispatch(favoriteCitesWeatherLoadedFailed(error));
        }
    };
}
