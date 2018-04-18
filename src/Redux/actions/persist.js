import { createActions } from 'redux-actions';
import { setCookie, deleteCookie } from '@/service/cookie'
import { notification } from 'antd';

export const {
	changeUser,
	changeEducations,
	changeEducationsId,
	changeChapters,
	
} = createActions(
		'changeUser',
		'changeEducations',
		'changeEducationsId',
		'changeChapters',
		'changeSubmitId',
	)

export const getUser = (token) => (dispatch) =>{
	axios.get(url.get_users+'?token='+token)
		.then(data=>{
			if(data.data.user){
				dispatch(changeUser(data.data.user))
				setCookie('tiba_key',token)
				notification.success({
					message: '通知提醒',
					description: '恭喜登录成功！',
					duration:2
				});
			}
		})
}
export const exitUser = (history) => (dispatch) =>{
	deleteCookie('tiba_key')
	dispatch(changeUser(''))
	history.push('/')
}

export const getEducations = () => (dispatch) =>{
	axios.get(url.educations)
		.then(({data})=>{
			if(data.msg.status === 'success'){
				let levels = data.levels
				levels.map(function(item){
					item.id = item.value
					item.name = item.label
				})
				let test_point_counts = data.test_point_counts
				test_point_counts.map(function(item){
					item.id = item.value
					item.name = item.label
				})
				dispatch(changeEducations({educations:data.educations,levels,test_point_counts}))

				let edu = data.educations[0]
				let sub = ''
				if(edu) sub = edu.subjects[0];
				if(sub){
					dispatch(changeSubject(edu,sub))
				}
			}
		})
}
export const changeSubject = (edu,sub) => (dispatch) =>{
	let newG = edu.grades
	newG.map(function(item){
		item.value = item.id
		item.label = item.name
		item.checked = true
	})
	dispatch(changeEducationsId({
		education_id:edu.id,
		subject_id:sub.id,
		full_name:'当前：'+edu.name+sub.name,
		versions:sub.versions,
		topic_types:sub.topic_types,
		topic_classes:edu.topic_classes,
		grades:newG
	}))

	//根据subject_id获取章节树状数据
	axios.get(url.chapters+'?subject_id='+sub.id)
		.then(({data})=>{
			if(data.msg.status == 'success'){
				dispatch(changeChapters(data.chapter.children))
			}
		})
	eventEmitter.emit('subjectChanged');
}

