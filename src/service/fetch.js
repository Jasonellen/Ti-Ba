import axios from 'axios'
import { notification } from 'antd';

let token = JSON.parse(sessionStorage['reduxPersist:persist']).user.token
export default {
	get: async (url1='', params = {})=>{
		try {
			const response = await axios.get(url1,{
				params:Object.assign({},params,{token}),
			})
				.then(({data})=>{
					if(data.status === 'fail'){
						notification.error({
							message: '通知提醒',
							description: data.msg,
							duration:2
						});
						throw new Error('没有返回正确的数据')
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
	post:async (url1='', params = {})=>{
		try {
			const response = await axios.post(url1,Object.assign({},params,{token}))
				.then(({data})=>{
					if(data.status === 'fail'){
						notification.error({
							message: '通知提醒',
							description: data.msg,
							duration:2
						});
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
	delete:async (url1='', params = {})=>{  //del参数需要用data包裹
		try {
			const response = await axios.delete( url1,{data:Object.assign({},params,{token})} )
				.then(({data})=>{
					if(data.status === 'fail'){
						notification.error({
							message: '通知提醒',
							description: data.msg,
							duration:2
						});
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
}

