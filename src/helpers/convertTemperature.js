import { CELSIUS } from './constants';

const convertTemperature = (unit, value) => {
    const fahrenheit = ((value * 9) / 5 + 32).toFixed(1);
    return unit === CELSIUS ? value : fahrenheit;
};

export default convertTemperature;
