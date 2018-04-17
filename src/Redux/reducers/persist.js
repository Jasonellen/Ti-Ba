import { handleActions } from 'redux-actions';

let initialState = {
	user:'',
	educations:'',
	education_id:'',
	subject_id:'',
	full_name:'全部课程',
	versions:[], //所属教材
}
const persist = handleActions({
	changeUser: (state, action) => ({
		...state,
		user: action.payload
	}),
	changeEducations: (state, action) => ({
		...state,
		educations: action.payload
	}),
	changeEducationsId: (state, action) => ({
		...state,
		education_id: action.payload.edu,
		subject_id:action.payload.sub,
		full_name:action.payload.full_name,
		versions:action.payload.versions,
		topic_types:action.payload.topic_types,
	}),

}, initialState);


export default persist;
