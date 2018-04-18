import { createActions } from 'redux-actions';
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
		page,
		per_page
	} = getState().zjzujuan
	const con = {
		education_id,
		subject_id,
		version_id,
		topic_type_id,
		level,
		topic_class_id,
		test_point_count,
		'grade_id[]':grade_id
	}
	const order = {
		created_at,
		mix_times
	}
	axios.get(url.topics,{
		params:{
			con,order,page,per_page
		}
	})
		.then(({data})=>{
			if(data.msg.status === 'success'){
				// let levels = data.levels
				// levels.map(function(item){
				// 	item.id = item.value
				// 	item.name = item.label
				// })
				// let test_point_counts = data.test_point_counts
				// test_point_counts.map(function(item){
				// 	item.id = item.value
				// 	item.name = item.label
				// })
				// dispatch(changeEducations({educations:data.educations,levels,test_point_counts}))

				// let edu = data.educations[0]
				// let sub = ''
				// if(edu) sub = edu.subjects[0];
				// if(sub){
				// 	dispatch(changeSubject(edu,sub))
				// }
			}
		})
}

export const initParamsAndSearch = () => (dispatch,getState) =>{
	let data = getState().persist
	let defaultGradesId = [] 
	data.grades.map(function(item){
		defaultGradesId.push(item.id)
	})
		//初始化试题搜索信息
	dispatch(zjzujuanChangeSubmitId({key:'education_id',value:data.education_id}))
	dispatch(zjzujuanChangeSubmitId({key:'subject_id',value:data.subject_id}))
	dispatch(zjzujuanChangeSubmitId({key:'grade_id',value:defaultGradesId}))

	dispatch(beginSearch())
}