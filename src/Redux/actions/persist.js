import { createActions } from 'redux-actions';
import { deleteCookie } from '@/service/cookie'
import { notification } from 'antd';

export const {
	changeUser,
	changeEducations,
	changeEducationsId,
	changeLogo,
	changeSearchType,
	changeExamClass,
	changeAllClassName,
	changeVips,
	changeUserName,
	changeDefaultKeys
} = createActions(
		'changeUser',
		'changeEducations',
		'changeEducationsId',
		'changeLogo',
		'changeSearchType',
		'changeExamClass',
		'changeAllClassName',
		'changeVips',
		'changeUserName',
		'changeDefaultKeys'
	)

export const getUser = () => (dispatch) =>{
	_axios.get(url.get_users)
		.then(data=>{
			if(data.user){
				dispatch(changeUser(data.user))
				dispatch(getVips(data.user))
				notification.success({
					message: '通知提醒',
					description: '恭喜登录成功！',
					duration:2
				});

			}
		})
}
export const getVips = (user) => (dispatch) =>{
	_axios.get(url.owner_users+user.id)
		.then((data)=>{
			dispatch(changeVips(data.user.vips))
		})
}
export const exitUser = (history) => (dispatch) =>{
	deleteCookie('tiba_key')
	dispatch(changeUser(''))
	history.push('/')
}

export const getEducations = () => (dispatch) =>{
	_axios.get(url.educations)
		.then(data=>{
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
			let exam_classes = data.exam_classes
			exam_classes.map(function(item){
				item.id = item.value
				item.name = item.label
			})
			dispatch(changeEducations({
				educations:data.educations,
				levels,
				test_point_counts,
				exam_classes,
			}))
			//选中第一项
			if(data && data.educations){
				let def_edu = data.educations.find(function(item){
					return item.name == '初中'
				})
				let def_subj = {}
				if(def_edu && def_edu.subjects){
					def_subj = def_edu.subjects.find(function(item){
						return item.name == '数学'
					})
				}
				dispatch(changeSubject(def_edu,def_subj) )
				dispatch(changeAllClassName('当前：'+def_edu.name+def_subj.name) )
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
		versions:sub.versions,
		topic_types:sub.topic_types,
		topic_classes:edu.topic_classes,
		grades:newG
	}))
	setTimeout(()=>{
		eventEmitter.emit('subjectChanged'); //持久化时间
	},400)
}

export const getLogo = () => (dispatch) =>{
	_axios.get(url.homelogo)
		.then(data=>{
			dispatch(changeLogo(data.web))
		})
}
