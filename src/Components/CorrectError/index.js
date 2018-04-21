CorrectError

import React, { Component }from 'react';
import { Modal, Input } from 'antd';
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const { TextArea } = Input;

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class CorrectError extends Component{
	state={
		content:'',
	}
	handleCancel = ()=>{
		this.props.changeCorrectErrorShow({modal:false})
		this.setState({
			content:''
		})
	}
	handleOk = ()=>{
		const { topic_id } = this.props.other
		const { content } = this.state
		if(!content) return;
		_axios.post(url.correct_records,{
			topic_id,
			content
		})
			.then(()=>{
				this.props.changeCorrectErrorShow({modal:false})
				this.setState({
					content:''
				})
				Modal.success({
					title:'试题纠错成功！'
				})
			})
	}
	render(){
		const { correctError } = this.props.other
		const { content } = this.state
		return (
			<Modal
				title="试题纠错"
				visible={correctError}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				okText='提交'
				cancelText = '取消'
			>
				<TextArea rows={6} value={content} placeholder='请输入您遇到的错误，错误一经确认，我们会给予您一定的奖励' onChange={(e)=>this.setState({content:e.target.value})}/>
			</Modal>
		)
	}
}
