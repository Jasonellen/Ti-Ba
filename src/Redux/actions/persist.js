import { createActions } from 'redux-actions';
import { setCookie, deleteCookie } from '@/service/cookie'
import { notification } from 'antd';
export const {
	changeUser,
	changeEducations,
	changeEducationsId,
} = createActions(
		'changeUser',
		'changeEducations',
		'changeEducationsId',
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
				dispatch(changeEducations(data.educations))
				let edu = data.educations[0]
				let sub = ''
				if(edu) sub = edu.subjects[0];
				if( edu && sub){
					dispatch(changeSubject(edu,sub))
				}
			}
		})
}
export const changeSubject = (edu,sub) => (dispatch) =>{
	dispatch(changeEducationsId({
		edu:edu.id,
		sub:sub.id,
		full_name:'当前：'+edu.name+sub.name,
		versions:sub.versions,
		topic_types:sub.topic_types
	}))
}

