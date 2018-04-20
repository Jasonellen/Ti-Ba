import { handleActions } from 'redux-actions';

let initialState = {
	carts:[],
	total_count:0
}
const cart = handleActions({
	changeCartInfo: (state, action) => ({
		...state,
		carts: action.payload.carts,
		total_count: action.payload.total_count,
	}),

}, initialState);


export default cart;
