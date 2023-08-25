import { TOGGLE_UNIT } from '../actions/unit';
import { CELSIUS, FAHRENHEIT } from '../../helpers/constants';

const initialState = {
    unit: CELSIUS,
};
const unit = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_UNIT: {
            return {
                ...state,
                unit: state.unit === CELSIUS ? FAHRENHEIT : CELSIUS,
            };
        }

        default: {
            return state;
        }
    }
};

export default unit;
