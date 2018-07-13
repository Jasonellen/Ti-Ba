import { createActions } from 'redux-actions';
import { Modal } from 'antd';

export const {
	zjzujuanChangeSubmitId,
	changeChapters,
	changeKnowledges,
} = createActions(
		'zjzujuanChangeSubmitId',
		'changeChapters',
		'changeKnowledges',
	)

export const handlePage = (x)=>(dispatch)=>{
	dispatch(zjzujuanChangeSubmitId({key:'current_page',value:x}))
	dispatch(beginSearch())
}
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
		knowledges,
		order_option,
		chapter_ids,
		knowledge_ids,
		side,
	} = getState().zjzujuan

	const order = order_option == 'created_at' ? {created_at} : {mix_times}

	//递归去除全部id
	if(chapter_ids.length == 0){
		chapters.map((item)=>{
			chapter_ids.push(item.id)
			// Recursion(item, chapter_ids)
		})
	}
	if(knowledge_ids.length == 0){
		knowledges.map((item)=>{
			knowledge_ids.push(item.id)
			// Recursion(item, knowledge_ids)
		})
	}
	let options = {
		education_id,
		subject_id,
		version_id,
		topic_type_id,
		level,
		topic_class_id,
		test_point_count,
		grade_id,
		order,page,per_page,
	}
	if(side == '/xuanti/tb'){
		options = Object.assign({},options,{chapters:chapter_ids})
	}else{
		options = Object.assign({},options,{knowledges:knowledge_ids})
	}
	_axios.post(url.topics,	options)
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

export const initParamsAndSearch = (side) => (dispatch,getState) =>{
	let data = getState().persist
	let defaultGradesId = []
	let grades = JSON.parse(JSON.stringify(data.grades))
	grades.map(function(item){
		defaultGradesId.push(item.id)
	})
	//初始化试题搜索信息
	dispatch(zjzujuanChangeSubmitId({key:'side',value:side}))
	dispatch(zjzujuanChangeSubmitId({key:'education_id',value:data.education_id}))
	dispatch(zjzujuanChangeSubmitId({key:'subject_id',value:data.subject_id}))
	dispatch(zjzujuanChangeSubmitId({key:'grade_id',value:defaultGradesId}))
	dispatch(zjzujuanChangeSubmitId({key:'grades',value:grades}))
	dispatch(zjzujuanChangeSubmitId({key:'chapters',value:[]}))
	dispatch(zjzujuanChangeSubmitId({key:'knowledges',value:[]}))
	dispatch(getTrees())
}

//搜索条件改变
export const handleOptionChange = (key,value,option) => (dispatch) =>{
	dispatch(zjzujuanChangeSubmitId({key,value}))
	if(option)dispatch(zjzujuanChangeSubmitId({key:'order_option',value:option}))
	dispatch(zjzujuanChangeSubmitId({key:'current_page',value:1}))
	dispatch(beginSearch())
}
//Menu改变
export const handleMenuChange = (side) => (dispatch) =>{
	dispatch(zjzujuanChangeSubmitId({key:'side',value:side}))
	dispatch(getTrees())
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
//获取 trees 树状数据
export const getTrees = () => (dispatch,getState) =>{
	const { subject_id, version_id, side} = getState().zjzujuan
	if(side == '/xuanti/tb'){
		//根据subject_id获取章节树状数据
		_axios.get(url.chapters+'?subject_id='+subject_id+'&version_id='+version_id)
			.then(data=>{
				dispatch(changeChapters(data.chapter.children))
				dispatch(beginSearch())
			})
	}else{
		//根据subject_id获取知识点树状数据
		_axios.get(url.knowledges+'?subject_id='+subject_id)
			.then(data=>{
				dispatch(changeKnowledges(data.knowledge.children))
				dispatch(beginSearch())
			})
	}
}
//对象递归取id
// function Recursion(item = {}, arr = []){
// 	if(item.children && item.children.length>0){
// 		item.children.map(function(iitem){
// 			arr.push(iitem.id)
// 			Recursion(iitem,arr)
// 		})
// 	}
// }
