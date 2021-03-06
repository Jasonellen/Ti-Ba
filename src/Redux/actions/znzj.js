import { createActions } from 'redux-actions';

export const {
	znzjChangeSingle,
	changeChapters,
	changeKnowledges,
} = createActions(
		'znzjChangeSingle',
		'changeChapters',
		'changeKnowledges',
	)

export const beginSearch = () => (dispatch,getState) =>{

	const {
		level,
		grade,
		side,
		chapter_ids,
		knowledge_ids,
		topic_data,
		version_id
	} = getState().znzj
	const {
		education_id,
		subject_id,
	} = getState().persist
	let _ids = side == '/znzj/zj' ? chapter_ids : knowledge_ids
	let ids = _ids.join(',')
	let _grade = grade.join(',')
	let type = side == '/znzj/zj' ? 'chapters' : 'knowledges'
	_axios.get(url.group_exam_subjects,{
		type,ids,level,grade:_grade,
		education_id,
		subject_id,
		version_id
	})
		.then(data=>{
			topic_data.map(function(iitem,i){
				iitem.topics_count = 0
				data.data.map(function(item){
					item.show=true
					item.topics_count_show=0
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
	dispatch(znzjChangeSingle({key:'side',value:side}))
	dispatch(znzjChangeSingle({key:'topic_data',value:topic_data}))
	dispatch(getTrees())
}

//搜索条件改变
export const handleOptionChange = (key,value) => (dispatch) =>{
	dispatch(znzjChangeSingle({key,value}))
	dispatch(beginSearch())
}
//Menu改变
export const handleMenuChange = (side) => (dispatch) =>{
	dispatch(znzjChangeSingle({key:'side',value:side}))
	dispatch(getTrees())
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
			item.topics_count_show =num
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

//获取 trees 树状数据
export const getTrees = () => (dispatch,getState) =>{
	const { subject_id, version_id, side} = getState().znzj

	if(side == '/znzj/zj'){
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
