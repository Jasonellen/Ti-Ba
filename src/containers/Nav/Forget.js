import React, { Component } from 'react'
import {  Icon, Button, Form, Modal, Input, notification } from 'antd';
const FormItem = Form.Item;
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import { bindActionCreators } from 'redux'

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};
@connect(
	state => {
		return {
			state:state.nav,
		}
	},
	dispatch => bindActionCreators(navAction, dispatch)
)
class Forget extends Component {
	state={
		secondsText:'获取验证码',
		seconds:59,
	}
	onOff=true
	timer=null
	handleGetCode = ()=>{
		const form = this.props.form;
		const mobile = form.getFieldValue('mobile')
		if(!mobile){
			notification.error({
				message: '通知提醒',
				description: '请先输入手机号！',
				duration:2
			});
			return
		}
		if(!this.onOff) return;
		this.onOff = false;
		_axios.get(url.sms_new,{
			type:'change_password',
			mobile,
		})
			.then(data=>{
				notification.success({
					message: '通知提醒',
					description: '验证码发送成功',
					duration:2
				});
				this.setState({code:data.code},()=>{
					this.setState({secondsText:`重新获取(${this.state.seconds+1})`},()=>{
						clearInterval(this.timer)
						this.timer=setInterval(()=>{
							if(this.state.seconds === 0){
								this.onOff = true;
								clearInterval(this.timer)
								this.setState({
									seconds:59,
									secondsText:'获取验证码',
								})
							}else{
								this.setState({
									seconds:this.state.seconds - 1,
									secondsText:`重新获取(${this.state.seconds})`
								})
							}
						},1000)
					})
				})
			})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
			const {mobile,password,code} = values
			_axios.post(url.users_change,{
				mobile,
				password,
				code
			})
				.then(()=>{
					notification.success({
						message: '通知提醒',
						description: '密码修改成功！',
						duration:2
					});
					this.props.changeForgetModalShow(false)
				})
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const { forgetModal } = this.props.state
		const { secondsText } = this.state
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
						{...formItemLayout}
						label="手机号"
					>
						{getFieldDecorator('mobile', {
							rules: [{ required: true, message: '请输入手机号码' }],
						})(
							<Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="验证码"
					>
						{getFieldDecorator('code', {
							rules: [{ required: true, message: '请输入验证码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="验证码" addonAfter={<span onClick={this.handleGetCode} className='getYanzhenma'>{secondsText}</span>}/>
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="新密码"
					>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入新密码' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
						)}
					</FormItem>
					<Button type="primary" htmlType="submit" className="login_button">立即找回</Button>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(Forget)
