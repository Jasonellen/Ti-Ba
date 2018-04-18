import { handleActions } from 'redux-actions';

let initialState = {
	user:'', //------data
	educations:'',
	education_id:'',
	subject_id:'',
	full_name:'全部课程',
	versions:[], //所属教材
	topic_classes:[], //题类筛选
	levels:[], //难易程度
	test_point_counts:[], //知识点
	grades:[], //适用年级
	chapter:[], //章节树形数据 ------data
}
const persist = handleActions({
	changeUser: (state, action) => ({
		...state,
		user: action.payload
	}),
	changeEducations: (state, action) => ({
		...state,
		educations: action.payload.educations,
		levels:action.payload.levels,
		test_point_counts:action.payload.test_point_counts,
	}),
	changeEducationsId: (state, action) => ({
		...state,
		education_id: action.payload.education_id,
		subject_id:action.payload.subject_id,
		full_name:action.payload.full_name,
		versions:action.payload.versions,
		topic_types:action.payload.topic_types,
		topic_classes:action.payload.topic_classes,
		grades:action.payload.grades,
	}),
	changeChapters: (state, action) => ({
		...state,
		chapter: action.payload,
	}),

}, initialState);


export default persist;
