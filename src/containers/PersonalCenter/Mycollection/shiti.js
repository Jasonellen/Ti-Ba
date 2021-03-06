import React,{ Component } from 'react'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
import {connect} from 'react-redux';
import { Modal, Pagination } from 'antd';
const confirm = Modal.confirm;

@connect(
	state => state.persist,
	null
)
export default class Pshiti extends Component{
	state={
		page:1,
		per_page:10,
		data:[],
		total_pages:0,
		cart_data:[],
	}
	componentDidMount(){
		this.getList()
		this.getCarts()
		eventEmitter.on('subjectChanged',()=>{
			this.getList()
			this.getCarts()
		});
	}
	getList = ()=>{
		const { subject_id } = this.props
		const { page, per_page } = this.state
		_axios.get(url.owner_star_topics,{
			subject_id,page, per_page
		})
			.then(data=>{
				data.topics.map(function(item){
					item.star = true
				})
				this.setState({
					data:data.topics,
					total_pages:data.meta.total_pages,
				},this.getCarts)
			})
	}
	handleCollect = (id)=>{
		_axios.delete(url.action_stores+'/'+id,{
			action_type:'star',
			target_type:'topic',
		})
			.then(()=>{
				this.getList()
				Modal.success({
				 	title: '消息提醒',
	    		content: '取消收藏成功！',
				});
			})
	}
	handlePage = (page)=>{
		this.setState({page},this.getList)
	}
	//获取购物车信息
	getCarts = ()=>{

		const { subject_id } = this.props
		_axios.get(url.owner_carts,{
			subject_id
		})
			.then(data=>{
				this.setState({
					cart_data:data.data
				})
			})
	}
	//选题点击
	handleSelect = (topic_id,subject_id,in_cart)=>{
		if(!in_cart){
			//添加购物车
			_axios.post(url.owner_carts,{
				topic_id,
				subject_id
			})
				.then(()=>{
					this.getList() //重新获取购物车列表
				})
		}else{
			const { cart_id } = this.state.cart_data[0]
			//删除购物车试题
			_axios.delete(url.owner_carts+'/'+cart_id,{
				topic_ids:[topic_id],
			})
				.then(()=>{
					this.getList() //重新获取购物车列表
				})
		}

	}
	//删除购物车行
	handleDelShiTiLan = (topic_ids,title)=>{
		var _this = this
		confirm({
			title: <div>确定要删除 <span style={{color:'#ff9600'}}>{title}</span> 么</div>,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				const { cart_id } = _this.state.cart_data[0]
				_axios.delete(url.owner_carts+'/'+cart_id,{
					topic_ids,
				})
					.then(()=>{
						_this.getList() //重新获取购物车列表
					})
			}
		});
	}
	//生成组卷
	handleSubmit = ()=>{
		const { cart_data } = this.state
		if(!cart_data[0]){
			Modal.error({
				title:'请先选择试题'
			})
			return;
		}else{
			const { cart_id } = cart_data[0]
			_axios.post(url.group_exam_hand_exams,{
				cart_id
			})
				.then(data=>{
					_history.push('/DownloadPage/'+data.exam_record_id)
				})
		}
	}
	render(){
		const { data, total_pages, page, cart_data } = this.state

		return (
			<div className="download">
      	<h1>试题收藏</h1>
				<ul style={{marginBottom:30}}>
					{
						data.length>0 && data.map((item)=>{
							return (
								<li key={item.id}>
									<ShiTiItem
										data={item}
										onCollect = {this.handleCollect}
										onSelect={this.handleSelect}
									/>
								</li>
							)
						})
					}
				</ul>
				{!!total_pages && <Pagination current={page} total={total_pages*10} onChange={this.handlePage}/> }
				<ShiTiLan
					data = {cart_data}
					onDel = {this.handleDelShiTiLan}
					onSubmit = {this.handleSubmit}
				/>
			</div>
		)
	}
}
