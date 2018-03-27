import React, { Component } from 'react'
import {  Icon, Button, Form, Modal, Input, notification } from 'antd';
const FormItem = Form.Item;
import {connect} from 'react-redux';
import * as navAction from '@/actions/nav.js';
import { bindActionCreators } from 'redux'

@connect(
	state => {
		return {
			state:state.nav,
		}
	},
	dispatch => bindActionCreators(navAction, dispatch)
)
class Login extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
			const {mobile,password,remember} = values

			if(!remember)return false;
			axios.post(url.forget,{
				mobile,
				password,
			})
				.then(data=>{
					console.log(data, data.status ==='success')
					if(data.status === 200){
						this.props.changeRegisterModalShow(false)
						notification.success({
							message: '通知提醒',
							description: '恭喜注册成功！',
							duration:2
						});
					}
				})
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const { forgetModal } = this.props.state
		return(
			<Modal
				title='找回密码'
				visible={forgetModal}
				width={350}
				footer={null}
				onCancel={()=>this.props.changeForgetModalShow(false)}
			>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem
						label="手机号码"
					>
						{getFieldDecorator('mobile', {
							rules: [{ required: true, message: '请输入手机号码' }],
						})(
							<Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码" />
						)}
					</FormItem>
					<FormItem
						label="手机验证码"
					>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入验证码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入验证码" addonAfter={<span className='getYanzhenma'>获取验证码</span>}/>
						)}
					</FormItem>
					<Button type="primary" htmlType="submit" className="login_button">立即找回</Button>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(Login)
