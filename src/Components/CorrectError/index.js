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
	render(){
		const { correctError } = this.props.other
		return (
			<Modal
				title="试题纠错"
				visible={correctError}
				onOk={this.handleOk}
				onCancel={()=>this.props.changeCorrectErrorShow(false)}
				okText='提交'
				cancelText = '取消'
			>
				<TextArea rows={6} placeholder='请输入您遇到的错误，错误一经确认，我们会给予您一定的奖励'/>
			</Modal>
		)
	}
}
