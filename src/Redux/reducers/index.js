import {combineReducers} from 'redux';

import nav from './nav';
import persist from './persist';
import other from './other';
import zjzujuan from './zjzujuan';
import znzj from './znzj';

const reducersApp = combineReducers({
	nav, persist, other, zjzujuan, znzj
});

export default reducersApp;
