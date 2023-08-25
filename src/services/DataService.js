import {
    BASE_URL,
    FIVE_DAY_FORECAST,
    CURRENT_CONDITION_URL,
    API_KEY,
} from '../helpers/constants';

const DataService = () => ({
    getCurrentCondition: async (cityId) => {
        return fetch(
            `${BASE_URL}${CURRENT_CONDITION_URL}/${cityId}?apikey=${API_KEY}&details=false`,
        );
    },
    getFiveDay: async (cityId) => {
        return fetch(
            `${BASE_URL}${FIVE_DAY_FORECAST}/${cityId}?apikey=${API_KEY}&metric=true`,
        );
    },
});

export default DataService();
