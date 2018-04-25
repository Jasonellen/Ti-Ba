
import React, { Component }from 'react';
import {Icon, Button, Modal } from 'antd';
import './index.scss'
import ShiTiLan from '@/Components/ShiTiLan'
import ShiTiItem from '@/Components/ShiTiItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const confirm = Modal.confirm;

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class ShiJuanDetail extends Component{
	state = {
		data:{
			title:'',
			relation_exams:[],
			topics:[],
			star:''
		},
		cart_data:[]
	};
	componentDidMount(){
		this.getData()
	}
	getData = ()=>{
		let id = this.props.match.params.id
		_axios.get(url.owner_exam_records+'/'+id)
			.then(data=>{
				this.setState({
					data:data.data
				},this.getCarts)
			})
	}
	toUpperCase = {
		1:'一',
		2:'二',
		3:'三',
		4:'四',
		5:'五',
		6:'六',
		7:'七',
		8:'八',
		9:'九',
		10:'十',
	}

	//获取购物车信息
	getCarts = ()=>{
		const { subject_id } = this.state.data.topics[0].children[0]
		_axios.get(url.owner_carts,{
			subject_id
		})
			.then(data=>{
				this.setState({
					cart_data:data.data
				})
			})
	}
	//收藏
	handleCollect = (id,star) =>{
		let method = star ? 'delete' : 'post'
		let _url = star ? url.action_stores+'/'+id : url.action_stores
		let msg = star ? '取消收藏成功！' : '收藏成功！'
		_axios[method](_url,{
			action_type:'star',
			target_type:'topic',
			id,
		})
			.then(()=>{
				this.getData()
				Modal.success({
					title: '消息提醒',
					content: msg,
				});
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
					this.getData() //重新获取购物车列表
				})
		}else{
			const { cart_id } = this.state.cart_data[0]
			//删除购物车试题
			_axios.delete(url.owner_carts+'/'+cart_id,{
				topic_ids:[topic_id],
			})
				.then(()=>{
					this.getData() //重新获取购物车列表
				})
		}
	}
	//删除购物车行
	handleDelShiTiLan = (topic_ids)=>{
		var _this = this
		confirm({
			title: `确定要删除  么`,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				const { cart_id } = _this.state.cart_data[0]
				_axios.delete(url.owner_carts+'/'+cart_id,{
					topic_ids,
				})
					.then(()=>{
						_this.getData() //重新获取购物车列表
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

	//试卷收藏
	handleExamCollect = ()=>{
		const { id,type:target_type } = this.props.match.params
		const star = this.state.data.star
		let method = star ? 'delete' : 'post'
		let _url = star ? url.action_stores+'/'+id : url.action_stores
		let msg = star ? '取消收藏成功！' : '收藏成功！'
		_axios[method](_url,{
			action_type:'star',
			target_type,
			id,
		})
			.then(()=>{
				this.getData()
				Modal.success({
					title: '消息提醒',
					content: msg,
				});
			})
	}

	render(){
		const { data, cart_data } = this.state
		return (
			<div className='ShiJuanDetail contentCenter'>
				<div className="warp clearfix">
					<div className="leftSide">
						<h1>{data.title}</h1>
						{/*<p><Icon type="clock-circle-o" /> 修改时间：2018-01-22 &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 浏览次数：60 &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：单元试卷 </p>*/}
						<hr/>
						{
							data.topics.length>0 && data.topics.map((item,i)=>{
								return (
									<div key={i}>
										<div className="title">{this.toUpperCase[i+1]}、{item.name}</div>
										<ul>
											{
												item.children.length>0 && item.children.map((iitem)=>{
													return (
														<li key={iitem.id}>
															<ShiTiItem
																header={false}
																data={iitem}
																onCollect = {this.handleCollect}
																onSelect={this.handleSelect}
															/>
														</li>
													)
												})
											}
										</ul>
									</div>
								)
							})
						}
					</div>
					<div className="rightSide">
						<div className="top">
							<Button type="primary" icon="download" size='large' onClick={()=>this.props.history.push(`/downloadpage/${this.props.match.params.id}/direct`)}>下载试卷</Button>
							{/*<div className="clearfix">
								<div className="left" style={{cursor:'pointer'}} onClick={()=>this.props.changeAnswerSheetShow(true)}><Icon type="file-word" style={{color:'#ff9600'}}/> 答题卡下载</div>
								<Link to='/onlineTest/1' style={{color:'rgba(0, 0, 0, 0.65)'}}><div className="right"><Icon type="edit" style={{color:'#ff9600'}}/> 在线测试</div></Link>
							</div>*/}
							<div className="clearfix">
								<div className="left" style={{cursor:'pointer',color:'#ff9600'}} onClick={this.handleExamCollect}>{data.star ? <Icon type="heart" style={{color:'#ff9600'}}/> : <Icon type="heart-o"/>} {data.star ? '试卷已收藏' : '收藏试卷'}</div>
								{/*<div className="right" style={{cursor:'pointer'}} onClick={()=>this.props.changeAnalyzeShow(true)}><Icon type="line-chart" style={{color:'#ff9600',cursor:'pointer'}}/> 分析试卷</div>*/}
							</div>
						</div>
						<div className="bottom">
							<h4>相关试卷</h4>
							<ul>
								{
									data.relation_exams.length>0 && data.relation_exams.map((item)=>{
										return <li key={item.id}><Link to=''>{item.title}</Link></li>
									})
								}
							</ul>
						</div>
					</div>
				</div>
				<ShiTiLan
					data = {cart_data}
					onDel = {this.handleDelShiTiLan}
					onSubmit = {this.handleSubmit}
				/>
			</div>
		)
	}
}
