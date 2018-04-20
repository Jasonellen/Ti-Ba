import { createActions } from 'redux-actions';
import { Modal} from 'antd';
import { zjzujuanChangeSubmitId } from './zjzujuan'
const confirm = Modal.confirm;

export const {
	changeCartInfo,
} = createActions(
		'changeCartInfo',
	)
//选题
export const addToCart = (name,id) => (dispatch, getState) =>{
	let carts = [...getState().cart.carts]
	let total_count = getState().cart.total_count
	let list = [...getState().zjzujuan.data]
	if(carts.length==0){
		carts.push({name,topic_ids:[id],count:1})
	}else{
		let has = false
		carts.map(function(item){
			if(item.name == name){
				item.topic_ids.push(id)
				has = true
			}
		})
		if(!has){
			carts.push({name,topic_ids:[id],count:1})
		}
	}
	list.map(function(item){
		if(item.id == id){
			item.select = true
		}
	})
	//更新试题是否选中
	dispatch(zjzujuanChangeSubmitId({key:'data',value:list}))
	//修改购物车信息
	dispatch(changeCartInfo({carts,total_count:total_count + 1}))

}
//取消选题
export const cancelToCart = (name,id) => (dispatch, getState) =>{
	let carts = [...getState().cart.carts]
	let total_count = getState().cart.total_count
	let list = [...getState().zjzujuan.data]
	console.log(carts,1)
	carts.map(function(item){
		if(item.name == name){
			item.topic_ids.map(function(iitem,i){
				if(iitem == id){
					item.topic_ids.splice(i,1)
				}
			})
		}
	})
	list.map(function(item){
		if(item.id == id){
			item.select = false
		}
	})
	//更新试题是否选中
	dispatch(zjzujuanChangeSubmitId({key:'data',value:list}))
	//修改购物车信息
	dispatch(changeCartInfo({carts,total_count:total_count - 1}))

}
//删除购物车 item
export const delCartItem = (data) => (dispatch, getState) =>{
	confirm({
		title: `确定要删除 ${data.name} 么`,
		okText: '确定',
		okType: 'danger',
		cancelText: '取消',
		onOk() {
			let carts = [...getState().cart.carts]
			let total_count = getState().cart.total_count
			
			carts.map(function(item,i){
				if(item.name == data.name){
					carts.splice(i,1)
				}
			})
			dispatch(changeCartInfo({carts,total_count:total_count - data.topic_ids.length}))
			//更新试题选中状态
			let list = [...getState().zjzujuan.data]
			let delTopics = data.topic_ids
			list.map(function(item){
				delTopics.map(function(iitem){
					if(item.id == iitem){
						item.select = false
					}
				})
			})
			dispatch(zjzujuanChangeSubmitId({key:'data',value:list}))
		}
	});
	
}

export const initialCart = () => (dispatch, getState) =>{
	dispatch(changeCartInfo({carts:[],total_count:0}))
	//更新试题选中状态
	let list = [].concat(getState().zjzujuan.data)
	list.map(function(item){
		item.select = false
	})
	dispatch(zjzujuanChangeSubmitId({key:'data',value:list}))
}
