import {combineReducers} from 'redux';

import nav from './nav';
import persist from './persist';
import other from './other';
import zjzujuan from './zjzujuan';
import cart from './cart';

const reducersApp = combineReducers({
	nav, persist, other, zjzujuan, cart
});

export default reducersApp;
