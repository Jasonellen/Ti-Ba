
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
		console.log(this.props,123)
	}

	render(){
		const { header=true } = this.props
		return (
			<div className='ShiTiItem'>
				<Card
					hoverable={true}
					type="inner"
					title={header && <div><span>题型：填空题</span><span>题类：填空题</span><span className='noborder'>难易度：填空题</span></div>}
					actions={[
						<Link to='/AnswerDetail/1' className='cardLeft' key='0' ><Icon type="eye-o" />查看答案解析</Link>,
						<div  onClick={()=>Modal.success({title: '消息提示！',content:'收藏成功'})} className='cardLeft' key='1' ><Icon type="heart-o" />收藏</div>,
						<div  onClick={()=>this.props.changeCorrectErrorShow(false)} className='cardLeft' key='2' ><Icon type="exclamation-circle-o" />纠错</div>, <div className='cardRight' key='3'>组卷次数：66次<i className='i'>+选题</i></div>
					]}
				>
						Inner Card content
					<div className="answer">
						<div className="kd clearfix">
							<div className="left _left">【考点】</div>
							<div className="left _right">xxxxx雪地里的小画家</div>
						</div>
						<div className="da clearfix">
							<div className="left _left">【答案】</div>
							<div className="left _right">
								<div>[第一空] A</div>
								<div>[第一空] A</div>
								<div>[第一空] A</div>
								<div>[第一空] A</div>
								<div>[第一空] A</div>
								<div>[第一空] A</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}
