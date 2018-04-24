import { createActions } from 'redux-actions';
import { Modal } from 'antd';

export const {
	znzjChangeSingle,
} = createActions(
		'znzjChangeSingle'
	)

export const beginSearch = () => (dispatch,getState) =>{

	// const {
	// 	education_id,
	// 	subject_id,
	// 	version_id,
	// 	topic_type_id,
	// 	level,
	// 	topic_class_id,
	// 	test_point_count,
	// 	grade_id,
	// 	created_at,
	// 	mix_times,
	// 	current_page:page,
	// 	per_page,
	// 	chapters,
	// 	knowledges
	// } = getState().zjzujuan

	// const order = {
	// 	created_at,
	// 	mix_times
	// }
	// _axios.post(url.topics,{
	// 	education_id,
	// 	subject_id,
	// 	version_id,
	// 	topic_type_id,
	// 	level,
	// 	topic_class_id,
	// 	test_point_count,
	// 	grade_id,
	// 	order,page,per_page,
	// 	chapters,
	// 	knowledges
	// })
	// 	.then(data=>{
	// 		data.data.map(function(item){
	// 			item.select = false
	// 		})
	// 		dispatch(znzjChangeSingle({key:'data',value:data.data}))
	// 	})
}

export const InitParams = () => (dispatch,getState) =>{
	let data = getState().persist
	let defaultGradesId = []
	let grades = JSON.parse(JSON.stringify(data.grades))
	grades.map(function(item){
		defaultGradesId.push(item.id)
	})
	//初始化试题搜索信息
	dispatch(znzjChangeSingle({key:'education_id',value:data.education_id}))
	dispatch(znzjChangeSingle({key:'subject_id',value:data.subject_id}))
	dispatch(znzjChangeSingle({key:'grade_id',value:defaultGradesId}))
	dispatch(znzjChangeSingle({key:'grades',value:grades}))

	// dispatch(beginSearch())
}

//搜索条件改变
export const handleOptionChange = (key,value) => (dispatch) =>{
	dispatch(znzjChangeSingle({key,value}))
	dispatch(beginSearch())
}
//年级点击
export const handleCheckGroup = (x) => (dispatch, getState) =>{
	let grades = getState().zjzujuan.grades
	grades.map(function(item){
		item.checked = false
		x.map(function(iitem){
			if(item.id == iitem){
				item.checked = true
			}
		})
	})
	dispatch(znzjChangeSingle({key:'grades',value:grades}))
	dispatch(znzjChangeSingle({key:'grade_id',value:x}))
	dispatch(beginSearch())
}

