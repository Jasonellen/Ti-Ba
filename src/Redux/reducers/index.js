import {combineReducers} from 'redux';

import nav from './nav';
import persist from './persist';
import other from './other';
import zjzujuan from './zjzujuan';


const reducersApp = combineReducers({
	nav, persist, other, zjzujuan
});

export default reducersApp;
