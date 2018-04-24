import { handleActions } from 'redux-actions';

let initialState = {
	education_id:'',
	subject_id:'',
	level:'',
	grades:[],
	grade:[],
	chapter_ids:[],
	knowledge_ids:[],
	group_method:'relevance',
	topic_data:[],
}
const znzj = handleActions({
	znzjChangeSingle: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value,
	}),

}, initialState);


export default znzj;
