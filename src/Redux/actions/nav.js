import { createActions } from 'redux-actions';

export const {
	changeRegisterModalShow,
	changeLoginModalShow,
	changeForgetModalShow,
} = createActions(
		'changeRegisterModalShow',
		'changeLoginModalShow',
		'changeForgetModalShow',
	)
