import React, { Component } from 'react'
import { Icon, Modal } from 'antd';
import './index.scss'
import {connect} from 'react-redux';
import * as cartAction from '@/Redux/actions/cart.js';
import { bindActionCreators } from 'redux'

@connect(
	state => {
		return {
			cart:state.cart,
			persist:state.persist,
		}
	},
	dispatch => bindActionCreators(cartAction, dispatch),
)
export default class ShiTiLan extends Component{
	constructor(){
		super()
		this.state={
			none:false
		}
	}
	handleSubmit = ()=>{
		const { education_id, subject_id } = this.props.persist
		const { carts } = this.props.cart
		let topic_ids = []
		carts.map(function(item){
			topic_ids = topic_ids.concat(item.topic_ids)
		})
		if(topic_ids.length == 0){
			Modal.error({
				title:'请先选择试题'
			})
			return;
		}
		_axios.post(url.owner_exam_records,{
			education_id,
			subject_id,
			topic_ids,
		})
			.then(data=>{
				_history.push('/DownloadPage/'+data.exam_record_id)
			})
	}
	render(){
		const { carts, total_count} = this.props.cart
		return(
			<div className={`ShiTiLan clearfix ${this.state.none && 'none'}`}>
				<div className="left" onClick={()=>this.setState({none:!this.state.none})}>
					<Icon type="folder-open" />试题篮<Icon type="shrink" style={{marginTop:70}}/>
				</div>
				<div className='right'>
					<div className="title">共计 ( <span>{total_count}</span> ) 道题</div>
					<ul>
						{
							carts.length > 0 && carts.map((item,index)=>{
								if(item.topic_ids.length>0){
									return <li key={index}>{item.name}：<span>{item.topic_ids.length}</span>道&nbsp;&nbsp;&nbsp;<Icon type="close-circle-o" onClick={()=>this.props.delCartItem(item)}/></li>
								}
							})
						}
					</ul>
					<div className="bottom" onClick={this.handleSubmit}>生成试卷</div>
				</div>
			</div>
		)
	}
}
