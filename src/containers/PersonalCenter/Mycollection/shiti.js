import React,{ Component } from 'react'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
import SmallNavBar from '@/Components/SmallNavBar'
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import { bindActionCreators } from 'redux'
import { Modal, Pagination } from 'antd';

@connect(
	state => state.persist,
	dispatch => bindActionCreators(navAction, dispatch),
)
export default class Pshiti extends Component{
	state={
		educations:[],
		educations_id:'',
		subjects:[],
		subjects_id:'',
		page:1,
		per_page:10,
		data:[],
		total_pages:0,
		cart_data:[],
	}
	componentDidMount(){
		const { educations } = this.props
		let subjects = []
		let educations_id = ''
		let subjects_id = ''
		if(educations.length>0){
			subjects = educations[0].subjects
			educations_id = educations[0].id
			subjects_id = subjects[0].id
		}
		this.setState({
			educations,
			subjects,
			educations_id,
			subjects_id
		},()=>{
			this.getList()
		})
	}
	handleE = (x)=>{
		const { educations } = this.props
		let subjects = educations.find(function(item){
			return item.id == x
		}).subjects
		let subjects_id = ''
		if(subjects.length> 0 ){
			subjects_id = subjects[0].id
		}
		this.setState({
			educations_id:x,
			subjects,
			subjects_id,
			page:1
		},()=>{
			this.getList()
		})
	}
	handleS = (subjects_id)=>{
		this.setState({subjects_id,page:1},()=>{
			this.getList()
		})
	}
	getList = ()=>{
		const { subjects_id:subject_id, page, per_page } = this.state
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
		const { subjects_id:subject_id } = this.state
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
	handleDelShiTiLan = (topic_ids)=>{
		const { cart_id } = this.state.cart_data[0]
		_axios.delete(url.owner_carts+'/'+cart_id,{
			topic_ids,
		})
			.then(()=>{
				this.getList() //重新获取购物车列表
			})
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
		const { educations, subjects, data, total_pages, page, cart_data } = this.state

		return (
			<div className="download">
      	<h1>试题收藏</h1>
				<SmallNavBar
					noall
					title='学段'
					data={educations}
					onChange={this.handleE}
				/>
				<SmallNavBar
					noall
					title='学科'
					data={subjects}
					onChange={this.handleS}
				/><br/>
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
