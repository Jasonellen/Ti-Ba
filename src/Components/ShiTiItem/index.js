
import React, { Component }from 'react';
import { Icon, Card } from 'antd';
import './index.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as cartAction from '@/Redux/actions/cart.js';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'

@connect(
	state => {
		return {
			cart:state.cart,
		}
	},
	dispatch => {
		return {
			cartAction:bindActionCreators(cartAction, dispatch),
			otherAction:bindActionCreators(otherAction, dispatch),
		}
	}
)
export default class ShiTiItem extends Component{
	state = {
		showAnswer:false
	};
	componentDidMount(){
		// console.log(this.props,123)
	}
	handleSelect = (select,name,id)=>{
		if(select){
		 this.props.cartAction.cancelToCart(name, id)
		}else{
			this.props.cartAction.addToCart(name, id)
		}
	}
	render(){
		const { header=true, data={},noselect=false } = this.props
		const ease_type = {
			'easy':'简单',
			'normal':'普通',
			'difficult':'困难'
		}
		return (
			<div className='ShiTiItem'>
				<Card
					hoverable={true}
					type="inner"
					title={header && <div><span>题型：{data.topic_type_title}</span><span>题类：{data.topic_class_title}</span><span className='noborder'>难易度：{ease_type[data.level]}</span></div>}
					actions={[
						<Link to={`/AnswerDetail/${data.id}`} className='cardLeft' key='0' ><Icon type="eye-o" />查看答案解析</Link>,
						<div onClick={()=>this.props.onCollect && this.props.onCollect(data.id,data.star)} className='cardLeft' key='1' >{data.star ? <Icon type="heart" style={{color:'#ff9600'}}/> : <Icon type="heart-o"/>}{data.star ? '已收藏' : '收藏'}</div>,
						<div onClick={()=>this.props.otherAction.changeCorrectErrorShow(true)} className='cardLeft' key='2' >
							<Icon type="exclamation-circle-o" />纠错</div>, <div className='cardRight' key='3'>组卷次数：{data.mix_times || 0}次
							{ !noselect && <i style={{background:data.select && '#999'}} className='i' onClick={()=>this.handleSelect(data.select,data.topic_type_title, data.id)}>+选题</i>}
						</div>
					]}
				>
					<div onClick={()=>this.setState({showAnswer:!this.state.showAnswer})} dangerouslySetInnerHTML={{__html: data.content}}></div>
					{
						this.state.showAnswer && (
							<div className="answer">
								<div className="kd clearfix">
									<div className="left _left">【考点】</div>
									<div className="left _right" dangerouslySetInnerHTML={{__html: data.remark && data.remark.test_point}}></div>
								</div>
								<div className="da clearfix">
									<div className="left _left">【答案】</div>
									<div className="left _right" dangerouslySetInnerHTML={{__html: data.remark && data.remark.right_answer}}></div>
								</div>
								<div className="da clearfix">
									<div className="left _left">【解析】</div>
									<div className="left _right" dangerouslySetInnerHTML={{__html: data.remark && data.remark.right_answer}}></div>
								</div>
							</div>
						)
					}
				</Card>
			</div>
		)
	}
}
