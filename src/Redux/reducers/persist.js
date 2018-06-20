import { handleActions } from 'redux-actions';

let initialState = {
	user:{token:''}, //------data
	educations:'',
	education_id:'',
	subject_id:'',
	versions:[], //所属教材
	topic_types:[],
	topic_classes:[], //题类筛选
	levels:[], //难易程度
	test_point_counts:[], //知识点
	grades:[], //适用年级
	chapter:[], //章节树形数据 ------data
	knowledges:[],
	web:{avatar_data:{}},
	searchType:'topic',
	exam_classes:[], //试卷大类
	exam_class:'', //试卷大类id
	allClassName:'全部课程',
	vips:[],
}
const persist = handleActions({
	changeUser: (state, action) => ({
		...state,
		user: action.payload
	}),
	changeUserName: (state, action) => {
		state.user.name = action.payload
		return {
			...state
		}
	},
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
		versions:action.payload.versions,
		topic_classes:action.payload.topic_classes,
		grades:action.payload.grades,
		topic_types:action.payload.topic_types,
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
	changeExamClass: (state, action) => ({
		...state,
		exam_class: action.payload,
	}),
	changeAllClassName: (state, action) => ({
		...state,
		allClassName: action.payload,
	}),
	changeVips: (state, action) => ({
		...state,
		vips: action.payload,
	}),
}, initialState);


export default persist;
