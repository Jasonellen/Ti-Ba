import {combineReducers} from 'redux';

import nav from './nav';
import persist from './persist';
import other from './other';


const reducersApp = combineReducers({
	nav, persist, other
});

export default reducersApp;
