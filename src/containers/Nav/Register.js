import React, { Component } from 'react'
import {  Icon, Button, Form, Modal, Dropdown, Input, Checkbox, Menu, notification } from 'antd';
const FormItem = Form.Item;
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import * as persistAction from '@/Redux/actions/persist.js';
import { bindActionCreators } from 'redux'
import { setCookie } from '@/service/cookie'
import Protocol from './Protocol'

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
	dispatch => {
		return {
			navAction:bindActionCreators(navAction, dispatch),
			persistAction:bindActionCreators(persistAction, dispatch)
		}
	}
)
class Register extends Component {
	state={
		user_type:'teacher',
		menuName:'老师',
		secondsText:'获取验证码',
		seconds:59,
	}
	onOff=true
	timer=null
	componentDidMount(){

	}
	handleGetCode = ()=>{
		const form = this.props.form;
		const { mobile } = form.getFieldValue('mobile')
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
		
		// _fetch(url.send_code,{mobile:mobile})
		// 	.then(data=>{
		// 		if(data.success){
		// 			notification.success({
		// 				message: '通知提醒',
		// 				description: '验证码发送成功',
		// 				duration:2
		// 			});
		// 			this.setState({code:data.code},()=>{
		// 				this.setState({secondsText:`重新获取(${this.state.seconds+1})`},()=>{
		// 					clearInterval(this.timer)
		// 					this.timer=setInterval(()=>{
		// 						if(this.state.seconds === 0){
		// 							this.onOff = true;
		// 							clearInterval(this.timer)
		// 							this.setState({
		// 								seconds:59,
		// 								secondsText:'获取验证码',
		// 							})
		// 						}else{
		// 							this.setState({
		// 								seconds:this.state.seconds - 1,
		// 								secondsText:`重新获取(${this.state.seconds})`
		// 							})
		// 						}
		// 					},1000)
		// 				})
		// 			})
		// 		}else{
		// 			notification.error({
		// 				message: '通知提醒',
		// 				description: '验证码发送失败!',
		// 				duration:2
		// 			});
		// 		}
		// 	})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
			const {mobile,password,remember} = values
			const { user_type } = this.state
			if(!remember)return false;
			_axios.post(url.register,{
				mobile,
				password,
				user_type
			})
				.then(data=>{
					this.props.navAction.changeRegisterModalShow(false)
					setCookie('tiba_key',data.token)
					this.props.persistAction.getUser()
					notification.success({
						message: '通知提醒',
						description: '恭喜注册成功！',
						duration:2
					});
				})
		});
	}
	handleMenuClick = (option)=>{
		this.setState({
			user_type:option.key,
			menuName:option.key == 'teacher' ? '老师' : option.key == 'student' ? '学生' : '家长'
		})
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('两次密码不一致!');
		} else {
			callback();
		}
	}
	handleProtocol = ()=>{
		Modal.info({
			title: <div style={{fontSize:24,marginBottom:20}}>题霸网用户注册协议</div>,
			width: '80%',
			content: (
				<Protocol />
			),
		});
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { registerModal } = this.props.state
		const { menuName, secondsText } = this.state
		return(
			<Modal
				title='注册'
				visible={registerModal}
				footer={null}
				onCancel={()=>this.props.navAction.changeRegisterModalShow(false)}
			>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem
						{...formItemLayout}
						label="注册用户"
					>
						<Dropdown.Button overlay={
							<Menu onClick={this.handleMenuClick}>
								<Menu.Item key="teacher">老师</Menu.Item>
								<Menu.Item key="student">学生</Menu.Item>
								<Menu.Item key="family">家长</Menu.Item>
							</Menu>
						}>
							{ menuName }
						</Dropdown.Button>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="手机号码"
					>
						{getFieldDecorator('mobile', {
							rules: [{ required: true, message: '请输入手机号码' }],
						})(
							<Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="登录密码"
					>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入登录密码' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入登录密码" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="确认密码"
					>
						{getFieldDecorator('ConfirmPassword', {
							rules: [{
								required: true, message: '请确认密码！'
							}, {
								validator: this.compareToFirstPassword,
							}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入密码" />
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="手机验证码"
					>
						{getFieldDecorator('password2', {
							rules: [{ required: true, message: '请输入验证码!' }],
						})(
							<Input prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入验证码" addonAfter={<span className='getYanzhenma'>{secondsText}</span>}/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							rules: [{
								required: true, message: '请阅读并同意协议！'
							}],
						})(
							<div><Checkbox style={{marginLeft:115}}>我同意</Checkbox><strong onClick={this.handleProtocol} style={{color:'#ff9600',cursor:'pointer'}}>《题霸网用户注册协议》</strong></div>
						)}
						<Button type="primary" htmlType="submit" className="register_button">注册</Button>
					</FormItem>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(Register)
