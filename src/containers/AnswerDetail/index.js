
import React, { Component }from 'react';
import { Modal } from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
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
export default class AnswerDetail extends Component{
	state = {
		confirmShow:false,
		data:{
			remark:{},
			relation_exams:[]
		},
		cart_data:[]
	};
	componentDidMount(){
		this.getData()
	}
	getData = ()=>{
		_axios.get(url.topics+'/'+this.props.match.params.id)
			.then(data=>{
				this.setState({
					data:data.data
				},this.getCarts)
			})
	}
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

	render(){
		const { data, cart_data } = this.state
		return (
			<div className='AnswerDetail contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}

				<div className="warp clearfix">

					<div className="leftSide">
						<ul className="st">
							<li>
								<ShiTiItem
									data={data}
									open
									nodetail
									onCollect = {this.handleCollect}
									onSelect={this.handleSelect}
								/>
							</li>
							{/*<li>
								<Card
									type="inner"
									title={<div><span>举一反三</span></div>}
								>
									<ul className='jyfs'>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
									</ul>
								</Card>
							</li>*/}
						</ul>
					</div>
					<div className="rightSide">
						<Link to='/SchoolService'><img src="https://zujuan.21cnjy.com//images/paper.png" alt=""/></Link>
						<h2>相关试卷</h2>
						<ul>
							{
								data.relation_exams.length>0 && data.relation_exams.map((item)=>{
									return <li key={item.id}><Link to=''>{item.title}</Link></li>
								})
							}
						</ul>
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
