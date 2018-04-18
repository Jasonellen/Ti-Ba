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
	created_at:'asc', // desc
	mix_times:'asc',

	//排序
	page:1,
	per_page:10,
}
const zjzujuan = handleActions({
	zjzujuanChangeSubmitId: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value,
	}),

}, initialState);


export default zjzujuan;
