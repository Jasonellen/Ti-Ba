import React, { Component } from 'react'
import { Icon, Modal } from 'antd';
import './index.scss'
import {connect} from 'react-redux';
// import * as cartAction from '@/Redux/actions/cart.js';
import { bindActionCreators } from 'redux'

@connect(
	state => {
		return {
			cart:state.cart,
			persist:state.persist,
		}
	},
	// dispatch => bindActionCreators(cartAction, dispatch),
)
export default class ShiTiLan extends Component{
	constructor(){
		super()
		this.state={
			none:false,
		}
	}

	handleDel=(topic_ids)=>{
		confirm({
			title: `确定要删除  么`,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				//删除购物车试题
				_axios.put(url.owner_carts,{
					topic_ids,
				})
					.then(()=>{
						this.props.onChange && this.props.onChange() //重新获取试题列表
						this.ShiTiLan.getCarts() //重新获取购物车列表
					})
			}
		});
	}
	render(){
		const { data } = this.props
		let total = 0
		data.map(function(item){
			total += item.topic_ids.length
		})
		return(
			<div className={`ShiTiLan clearfix ${this.state.none && 'none'}`}>
				<div className="left" onClick={()=>this.setState({none:!this.state.none})}>
					<Icon type="folder-open" />试题篮<Icon type="shrink" style={{marginTop:70}}/>
				</div>
				<div className='right'>
					<div className="title">共计 ( <span>{total}</span> ) 道题</div>
					<ul>
						{
							data.length > 0 && data.map((item)=>{
								return (
									<li key={item.topic_type_title}>
										{item.topic_type_title}：<span>{item.topic_ids.length}</span>道&nbsp;&nbsp;&nbsp;
										<Icon 
										type="close-circle-o" 
										style={{cursor:'pointer'}} 
										onClick={()=>this.props.onDel && this.props.onDel(item.topic_ids)}/>
									</li>
								)
							})
						}
					</ul>
					<div className="bottom" onClick={()=>this.props.onSubmit && this.props.onSubmit()}>生成试卷</div>
				</div>
			</div>
		)
	}
}
