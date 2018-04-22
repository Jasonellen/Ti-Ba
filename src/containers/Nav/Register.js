import React, { Component } from 'react'
import {  Icon, Button, Form, Modal, Dropdown, Input, Checkbox, Menu, notification } from 'antd';
const FormItem = Form.Item;
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import * as persistAction from '@/Redux/actions/persist.js';
import { bindActionCreators } from 'redux'
import { setCookie } from '@/service/cookie'

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
		menuName:'老师'
	}
	componentDidMount(){

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
	render(){
		const { getFieldDecorator } = this.props.form;
		const { registerModal } = this.props.state
		const { menuName } = this.state
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
					{/*<FormItem
						{...formItemLayout}
						label="手机验证码"
					>
						{getFieldDecorator('password2', {
							rules: [{ required: true, message: '请输入验证码!' }],
						})(
							<Input prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入验证码" addonAfter={<span className='getYanzhenma'>获取验证码</span>}/>
						)}
					</FormItem>*/}
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox style={{marginLeft:115}}>我同意<a href="">《xx注册协议》</a></Checkbox>
						)}
						<Button type="primary" htmlType="submit" className="register_button">注册</Button>
					</FormItem>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(Register)
