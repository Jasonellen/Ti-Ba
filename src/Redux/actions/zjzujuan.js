import { createActions } from 'redux-actions';
import { Modal } from 'antd';

export const {
	zjzujuanChangeSubmitId,
} = createActions(
		'zjzujuanChangeSubmitId'
	)

export const beginSearch = () => (dispatch,getState) =>{

	const {
		education_id,
		subject_id,
		version_id,
		topic_type_id,
		level,
		topic_class_id,
		test_point_count,
		grade_id,
		created_at,
		mix_times,
		current_page:page,
		per_page,
		chapters,
		knowledges
	} = getState().zjzujuan

	const order = {
		created_at,
		mix_times
	}
	_axios.post(url.topics,{
		education_id,
		subject_id,
		version_id,
		topic_type_id,
		level,
		topic_class_id,
		test_point_count,
		grade_id,
		order,page,per_page,
		chapters,
		knowledges
	})
		.then(data=>{
			data.data.map(function(item){
				item.select = false
			})
			dispatch(zjzujuanChangeSubmitId({key:'data',value:data.data}))
			dispatch(zjzujuanChangeSubmitId({key:'current_page',value:data.meta.current_page}))
			dispatch(zjzujuanChangeSubmitId({key:'total_pages',value:data.meta.total_pages}))
			dispatch(zjzujuanChangeSubmitId({key:'total_count',value:data.meta.total_count}))
		})
}

export const initParamsAndSearch = () => (dispatch,getState) =>{
	let data = getState().persist
	let defaultGradesId = []
	let grades = JSON.parse(JSON.stringify(data.grades))
	grades.map(function(item){
		defaultGradesId.push(item.id)
	})
	//初始化试题搜索信息
	dispatch(zjzujuanChangeSubmitId({key:'education_id',value:data.education_id}))
	dispatch(zjzujuanChangeSubmitId({key:'subject_id',value:data.subject_id}))
	dispatch(zjzujuanChangeSubmitId({key:'grade_id',value:defaultGradesId}))
	dispatch(zjzujuanChangeSubmitId({key:'grades',value:grades}))

	dispatch(beginSearch())
}

//搜索条件改变
export const handleOptionChange = (key,value) => (dispatch) =>{
	dispatch(zjzujuanChangeSubmitId({key,value}))
	dispatch(zjzujuanChangeSubmitId({key:'current_page',value:1}))
	dispatch(beginSearch())
}
//年级点击
export const handleCheckGroup = (x) => (dispatch, getState) =>{
	let grades = getState().zjzujuan.grades
	grades.map(function(item){
		item.checked = false
		x.map(function(iitem){
			if(item.id === iitem){
				item.checked = true
			}
		})
	})
	dispatch(zjzujuanChangeSubmitId({key:'grades',value:grades}))
	dispatch(zjzujuanChangeSubmitId({key:'grade_id',value:x}))
	dispatch(zjzujuanChangeSubmitId({key:'current_page',value:1}))
	dispatch(beginSearch())
}

//搜索条件改变
export const handleCollect = (id,star) => (dispatch) =>{
	let method = star ? 'delete' : 'post'
	let _url = star ? url.action_stores+'/'+id : url.action_stores
	let msg = star ? '取消收藏成功！' : '收藏成功！'
	_axios[method](_url,{
		action_type:'star',
		target_type:'topic',
		id,
	})
		.then(()=>{
			dispatch(beginSearch())
			Modal.success({
			 	title: '消息提醒',
    		content: msg,
			});
		})
}
