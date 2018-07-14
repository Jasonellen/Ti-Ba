import axios from 'axios'
import { notification } from 'antd';
import { getCookie } from '@/service/cookie'

export default {
	get: async (url1='', params = {})=>{
		let token = getCookie('tiba_key')
		try {
			const response = await axios.get(url1,{
				params:Object.assign({},params,{token}),
			})
				.then(({data})=>{
					if(data.status === 'fail'){
						// notification.error({
						// 	message: '通知提醒',
						// 	description: data.msg,
						// 	duration:3
						// });
						throw new Error(data.msg)
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
		let token = getCookie('tiba_key')
		try {
			const response = await axios.post(url1,Object.assign({},params,{token}))
				.then(({data})=>{
					if(data.status === 'fail'){
						if(data.code == 100004){  //有提交操作时判断没有有登录
							eventEmitter.emit('notLogin');
						}else{
							// notification.error({
							// 	message: '通知提醒',
							// 	description: data.msg,
							// 	duration:3
							// });
							throw new Error(data.msg)
						}
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
		let token = getCookie('tiba_key')
		try {
			const response = await axios.delete( url1,{data:Object.assign({},params,{token})} )
				.then(({data})=>{
					if(data.status === 'fail'){
						// notification.error({
						// 	message: '通知提醒',
						// 	description: data.msg,
						// 	duration:3
						// });
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
	put:async (url1='', params = {})=>{  //put参数需要用data包裹
		let token = getCookie('tiba_key')
		try {
			const response = await axios.put( url1,{data:Object.assign({},params,{token})} )
				.then(({data})=>{
					if(data.status === 'fail'){
						// notification.error({
						// 	message: '通知提醒',
						// 	description: data.msg,
						// 	duration:3
						// });
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
	patch:async (url1='', params = {})=>{  //put参数需要用data包裹
		let token = getCookie('tiba_key')
		try {
			const response = await axios.put( url1,Object.assign({},params,{token}) )
				.then(({data})=>{
					if(data.status === 'fail'){
						// notification.error({
						// 	message: '通知提醒',
						// 	description: data.msg,
						// 	duration:3
						// });
					}else if(data.status === 'success'){
						return data
					}
				})
			return response
		} catch (error) {
			throw new Error(error)
		}
	},
	formData:async (url1='', params = {})=>{
		let token = getCookie('tiba_key')
		var fd=new FormData();
		for (var key in params){
			fd.append(key,params[key]);
		}
		try {
			const response = await axios.post( url1+'?token='+token,fd)
				.then(({data})=>{
					if(data.status === 'fail'){
						// notification.error({
						// 	message: '通知提醒',
						// 	description: data.msg,
						// 	duration:3
						// });
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
