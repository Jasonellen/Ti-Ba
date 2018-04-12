import { handleActions } from 'redux-actions';

let initialState = {
	user:'',
}
const persist = handleActions({
	changeUser: (state, action) => ({
		...state,
		user: action.payload
	})

}, initialState);


export default persist;
