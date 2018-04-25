import { createActions } from 'redux-actions';
import { Modal } from 'antd';

export const {
	znzjChangeSingle,
} = createActions(
		'znzjChangeSingle'
	)

export const beginSearch = () => (dispatch,getState) =>{

	const {
		level,
		grade,
		side,
		chapter_ids,
		knowledge_ids,
		topic_data
	} = getState().znzj

	let _ids = side == '/znzj/zj' ? chapter_ids : knowledge_ids
	let ids = _ids.join(',')
	let _grade = grade.join(',')
	let type = side == '/znzj/zj' ? 'chapters' : 'knowledges'
	_axios.get(url.group_exam_subjects,{
		type,ids,level,grade:_grade
	})
		.then(data=>{
			topic_data.map(function(iitem,i){
				iitem.show=false
				iitem.topics_count = 0
				data.data.map(function(item){
					item.show = true
					if(item.topic_type_id == iitem.topic_type_id){
						topic_data.splice(i,1,item)
					}
				})
			})
			dispatch(znzjChangeSingle({key:'topic_data',value:topic_data}))
		})
}

export const InitParams = (side) => (dispatch,getState) =>{
	let data = getState().persist
	//年级
	let defaultGradesId = []
	let grades = JSON.parse(JSON.stringify(data.grades))
	grades.map(function(item){
		defaultGradesId.push(item.id)
	})
	//题型
	let topic_data = []
	data.topic_types.map(function(item){
		topic_data.push({
			topic_type_id:item.id,
			topic_type_name:item.title,
			topics_count:0,
			show:false,
		})
	})
	//初始化试题搜索信息
	dispatch(znzjChangeSingle({key:'education_id',value:data.education_id}))
	dispatch(znzjChangeSingle({key:'subject_id',value:data.subject_id}))
	dispatch(znzjChangeSingle({key:'grade',value:defaultGradesId}))
	dispatch(znzjChangeSingle({key:'grades',value:grades}))
	dispatch(znzjChangeSingle({key:'chapters',value:[]}))
	dispatch(znzjChangeSingle({key:'knowledges',value:[]}))
	dispatch(znzjChangeSingle({key:'side',value:side}))
	dispatch(znzjChangeSingle({key:'topic_data',value:topic_data}))
	dispatch(beginSearch())
}

//搜索条件改变
export const handleOptionChange = (key,value) => (dispatch) =>{
	dispatch(znzjChangeSingle({key,value}))
	dispatch(beginSearch())
}
//年级点击
export const handleCheckGroup = (x) => (dispatch, getState) =>{
	let grades = getState().znzj.grades
	grades.map(function(item){
		item.checked = false
		x.map(function(iitem){
			if(item.id == iitem){
				item.checked = true
			}
		})
	})
	dispatch(znzjChangeSingle({key:'grades',value:grades}))
	dispatch(znzjChangeSingle({key:'grade',value:x}))
	dispatch(beginSearch())
}

//输入框值改变
export const hanldeInputChange = (num, id) => (dispatch, getState) =>{
	let topic_data = getState().znzj.topic_data
	topic_data.map(function(item){
		if(item.topic_type_id == id){
			item.topics_count =num
		}
	})
	//dispatch(znzjChangeSingle({key:'topic_data',value:topic_data})) //这里不做渲染，就不会改变 最大值，实际值是变的
}
//删除试题左边列表
export const handleTopicDataDel = (id) => (dispatch, getState) =>{
	let topic_data = [...getState().znzj.topic_data]
	topic_data.map(function(item){
		if(item.topic_type_id == id){
			item.show = false
		}
	})
	dispatch(znzjChangeSingle({key:'topic_data',value:topic_data}))
}
//添加试题左边列表
export const handleTopicDataAdd = (id) => (dispatch, getState) =>{
	let topic_data = [...getState().znzj.topic_data]
	topic_data.map(function(item){
		if(item.topic_type_id == id){
			item.show = true
		}
	})
	dispatch(znzjChangeSingle({key:'topic_data',value:topic_data}))
}
