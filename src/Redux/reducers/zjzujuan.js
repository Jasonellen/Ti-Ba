import { handleActions } from 'redux-actions';

let initialState = {
	//con
	education_id:'',
	subject_id:'',
	version_id:'',
	topic_type_id:'',
	level:'',
	topic_class_id:'',
	test_point_count:'',
	grade_id:'',

	//order
	created_at:'desc', // desc
	mix_times:'asc',
	per_page:10,

	data:[], //列表数据
	grades:[],
	current_page:1,
	total_pages:0,
	total_count:0,
	chapters:[],
	knowledges:[],

	chapter_ids:[],
	knowledge_ids:[],

	order_option:'created_at'
}
const zjzujuan = handleActions({
	zjzujuanChangeSubmitId: (state, action) => ({
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


export default zjzujuan;
