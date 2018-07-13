import { handleActions } from 'redux-actions';
// import cities from '@/lib/cities'
let initialState = {
	registerModal:false,
	loginModal:false,
	forgetModal:false,
}
const nav = handleActions({
	changeRegisterModalShow: (state, action) => ({
		...state,
		registerModal: action.payload
	}),
	changeLoginModalShow: (state, action) => ({
		...state,
		loginModal: action.payload
	}),
	changeForgetModalShow: (state, action) => ({
		...state,
		forgetModal: action.payload
	}),

}, initialState);


export default nav;
