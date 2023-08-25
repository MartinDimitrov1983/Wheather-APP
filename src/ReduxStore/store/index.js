import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import DataService from '../../services/DataService';


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(DataService)),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

store.subscribe(() => {
    const favoriteCities = store.getState().favorites.favorites;
    localStorage.setItem('favorites', JSON.stringify(favoriteCities));
});

export default store;
