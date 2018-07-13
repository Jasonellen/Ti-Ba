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

	chapters:[],
	knowledges:[],
	side:'',
	version_id:''
}
const znzj = handleActions({
	znzjChangeSingle: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value,
	}),
	changeChapters: (state, action) => ({
		...state,
		chapters: action.payload,
	}),
	changeKnowledges: (state, action) => ({
		...state,
		knowledges: action.payload,
	}),

}, initialState);


export default znzj;
