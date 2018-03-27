import {combineReducers} from 'redux';

import nav from './nav';
import persist from './persist';


const reducersApp = combineReducers({
	nav, persist
});

export default reducersApp;
