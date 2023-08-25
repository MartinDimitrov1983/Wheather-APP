export const PREFIX = 'CURRENT_CITY_MANAGER/';

export const CURRENT_CITY_LOADING = `${PREFIX}CURRENT_CITY_LOADING`;
export const CURRENT_CITY_LOADED = `${PREFIX}CURRENT_CITY_LOADED`;
export const CURRENT_CITY_LOADING_FAILED = `${PREFIX}CURRENT_CITY_LOADING_FAILED`;
export const CURRENT_CITY_CLEAR_ERROR = `${PREFIX}CURRENT_CITY_CLEAR_ERROR`;

export const currentCityLoading = { type: CURRENT_CITY_LOADING };
export const currentCityClearError = { type: CURRENT_CITY_CLEAR_ERROR };
export const currentCityLoaded = (city) => ({
    type: CURRENT_CITY_LOADED,
    payload: city,
});
export const currentCityLoadingFailed = (error) => ({
    type: CURRENT_CITY_LOADING_FAILED,
    payload: error,
});

export function getCurrentCityData(city) {
    return async function (dispatch, _, DataService) {
        try {
            dispatch(currentCityLoading);
            const responseCurrentConditon =
                await DataService.getCurrentCondition(city.id);
            const dataCurrentCondition = await responseCurrentConditon.json();
            const responseFiveDay = await DataService.getFiveDay(city.id);
            const dataFiveDay = await responseFiveDay.json();
            const currentCondition = dataCurrentCondition[0];
            const forecast = dataFiveDay.DailyForecasts.map((day) => {
                return {
                    day: new Date(day.Date).toLocaleDateString('en-US', {
                        weekday: 'short',
                    }),
                    minimumT: day.Temperature.Minimum.Value,
                    maximumT: day.Temperature.Maximum.Value,
                };
            });

            const currentCityData = {
                temperature: {
                    celsius: {
                        value: currentCondition.Temperature.Metric.Value,
                    },
                    fahrenheit: {
                        value: currentCondition.Temperature.Imperial.Value,
                    },
                    weatherText: currentCondition.WeatherText,
                },
                forecast: [...forecast],
                cityName: city.cityName,
                cityCountry: city.cityCountry,
                id: city.id,
            };

            dispatch(currentCityLoaded(currentCityData));
        } catch (error) {
            console.log(error);
            dispatch(currentCityLoadingFailed(error));
        }
    };
}
