import { handleActions } from 'redux-actions';

let initialState = {
	user:{token:''}, //------data
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
	knowledges:[],
	web:{avatar_data:{}},
	searchType:'topic',
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
		exam_classes:action.payload.exam_classes,
		exam_types:action.payload.exam_types,
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
	changeKnowledges: (state, action) => ({
		...state,
		knowledges: action.payload,
	}),
	changeLogo: (state, action) => ({
		...state,
		web: action.payload,
	}),
	changeSearchType: (state, action) => ({
		...state,
		searchType: action.payload,
	}),

}, initialState);


export default persist;
