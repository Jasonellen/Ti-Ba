
import React, { Component }from 'react';
import { Breadcrumb, Icon, Card,Modal, Input } from 'antd';
import './index.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const { TextArea } = Input;

connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class ShiTiItem extends Component{
	state = {

	};
	componentDidMount(){
		// console.log(this.props,123)
	}

	render(){
		const { header=true, data={} } = this.props
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
					title={header && <div><span>题型：{data.topic_type}</span><span>题类：{data.topic_class}</span><span className='noborder'>难易度：{ease_type[data.level]}</span></div>}
					actions={[
						<Link to={`/AnswerDetail/${data.id}`} className='cardLeft' key='0' ><Icon type="eye-o" />查看答案解析</Link>,
						<div onClick={()=>this.props.onCollect && this.props.onCollect(data.id,data.star)} className='cardLeft' key='1' >{data.star ? <Icon type="heart" style={{color:'#ff9600'}}/> : <Icon type="heart-o"/>}{data.star ? '已收藏' : '收藏'}</div>,
						<div onClick={()=>this.props.changeCorrectErrorShow(false)} className='cardLeft' key='2' ><Icon type="exclamation-circle-o" />纠错</div>, <div className='cardRight' key='3'>组卷次数：{data.mix_times || 0}次<i className='i'>+选题</i></div>
					]}
				>
					<div dangerouslySetInnerHTML={{__html: data.content}}></div>
					<div className="answer">
						<div className="kd clearfix">
							<div className="left _left">【考点】</div>
							<div className="left _right" dangerouslySetInnerHTML={{__html: data.remark && data.remark.test_point}}></div>
						</div>
						<div className="da clearfix">
							<div className="left _left">【答案】</div>
							<div className="left _right" dangerouslySetInnerHTML={{__html: data.remark && data.remark.right_answer}}></div>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}
