import { handleActions } from 'redux-actions';

let initialState = {
	//con
	education_id:'',
	subject_id:'',
	version_id:'',
	topic_type_id:'',
	level:'',
	grades:[],
	grade_ids:'',
	chapter_ids:[],
	knowledge_ids:[],
	select_data:[],
}
const znzj = handleActions({
	znzjChangeSingle: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value,
	}),

}, initialState);


export default znzj;
