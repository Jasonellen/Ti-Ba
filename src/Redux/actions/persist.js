import { createActions } from 'redux-actions';
import { deleteCookie } from '@/service/cookie'
import { notification } from 'antd';

export const {
	changeUser,
	changeEducations,
	changeEducationsId,
	changeChapters,
	changeKnowledges,
	changeLogo,
	changeSearchType,
	changeExamClass,
	changeAllClassName,
	changeVips,
	changeUserName
} = createActions(
		'changeUser',
		'changeEducations',
		'changeEducationsId',
		'changeChapters',
		'changeKnowledges',
		'changeLogo',
		'changeSearchType',
		'changeExamClass',
		'changeAllClassName',
		'changeVips',
		'changeUserName',
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
			if(data.educations.length>0 && data.educations[0].subjects.length>0){
				dispatch(changeSubject(data.educations[0],data.educations[0].subjects[0]) )
				dispatch(changeAllClassName('当前：'+data.educations[0].name+data.educations[0].subjects[0].name) )
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

	//根据subject_id获取章节树状数据
	_axios.get(url.chapters+'?subject_id='+sub.id)
		.then(data=>{
			dispatch(changeChapters(data.chapter.children))
		})
	//根据subject_id获取知识点树状数据
	_axios.get(url.knowledges+'?subject_id='+sub.id)
		.then(data=>{
			dispatch(changeKnowledges(data.knowledge.children))
		})
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
