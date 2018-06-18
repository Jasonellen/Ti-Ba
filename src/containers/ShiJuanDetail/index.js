
import React, { Component }from 'react';
import {Icon, Button, Modal } from 'antd';
import './index.scss'
import ShiTiLan from '@/Components/ShiTiLan'
import ShiTiItem from '@/Components/ShiTiItem'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
import moment from 'moment'
const confirm = Modal.confirm;

@connect(
	state => {
		return {
			other:state.other,
			persist:state.persist,
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
		cart_data:[],
		modalshow:false,
	};
	componentDidMount(){
		this.getData()
	}
	getData = ()=>{
		const { id,type } = this.props.match.params
		let _url = type == 'exam_record' ? url.owner_exam_records : url.exams
		_axios.get(_url+'/'+id)
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
		const { subject_id } = this.state.data
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
	//检查支付状态
	checkStatus = (order_no)=>{
		_axios.get(url.orders_check,{order_no})
			.then(data=>{
				if(data.data.status == 'paid'){
					clearInterval(this.check_status)
					this.setState({modalshow:false},this.handleDownload)
				}
			})
	}
	//需要支付
	needWxPay = ()=>{
		const { subject_id,education_id } = this.props.persist
		_axios.post(url.orders,{
			type:'exam',
			pay_way:'wechat_qr_pay',
			subject_id,
			education_id,
			id:this.props.match.params.id,
		})
			.then(data=>{
				this.setState({
					modalshow:true
				},()=>{
					setTimeout(()=>{
						document.querySelector('#qrcode').innerHTML = ''
						new QRCode('qrcode', {
							text: data.data.qr_code_url,
							width: 350,
							height: 350,
							colorDark: '#000000',
							colorLight: '#ffffff',
						});
						clearInterval(this.check_status)
						this.check_status = setInterval(()=>{
							this.checkStatus(data.data.order_no)
						},1000)
					},0)
				})
			})
	}
	//开始下载
	handleDownload = ()=>{
		const { id,type } = this.props.match.params
		if(type=='exam_record'){
			this.props.history.push(`/downloadpage/${id}/${type}`)
		}else{
			// 检查是否登录并下载
			if(!this.props.persist.user.token){
				eventEmitter.emit('notLogin');
				return
			}else{
				_axios.post(url.download_records,{
					type : 'exam',
					id : id
				})
					.then((data)=>{
						if(data.paid){
							location.href = data.url
						}else{
							this.needWxPay()
						}
					})
			}
		}
	}
	handleReload = (id)=>{
		this.props.history.push(`/ShiJuanDetail/${id+1}/exam`)
		location.reload()
	}
	componentWillUnmount() {
		clearInterval(this.check_status)
	}
	render(){
		const { data, cart_data, modalshow } = this.state
		return (
			<div className='ShiJuanDetail contentCenter'>
				<div className="warp clearfix">
					<div className="leftSide">
						<h1>{data.title}</h1>
						<p><Icon type="clock-circle-o" /> 修改时间：{moment(data.updated_at).format('YYYY-MM-DD')} &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 下载次数：{data.download_times} &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：{data.exam_type_name} </p>
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
							<Button type="primary" icon="download" size='large' onClick={this.handleDownload}>下载试卷</Button>
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
										return <li key={item.id} onClick={()=>this.handleReload(item.id)}>{item.title}</li>
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
				<Modal
					title='扫码支付'
					visible={modalshow}
					footer={null}
					width={400}
					maskClosable={false}
					onCancel={()=>this.setState({modalshow:false})}
				>
					<p style={{textAlign:'center',marginBottom:15}}>请使用 <span style={{color:'red'}}>微信</span> 扫一扫二维码完成支付</p>
					<div id="qrcode"></div>
				</Modal>
			</div>
		)
	}
}
