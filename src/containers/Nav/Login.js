import React, { Component } from 'react'
import {  Icon, Button, Form, Modal, Input, Checkbox, notification } from 'antd';
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
			axios.post(url.login,{
				mobile,
				password,
			})
				.then(data=>{
					if(data.status === 200){
						this.props.changeLoginModalShow(false)
						notification.success({
							message: '通知提醒',
							description: '恭喜登录成功！',
							duration:2
						});
					}
				})
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const { loginModal } = this.props.state
		return(
			<Modal
				title='登陆'
				width={350}
				visible={loginModal}
				footer={null}
				onCancel={()=>this.props.changeLoginModalShow(false)}
			>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('mobile', {
							rules: [{ required: true, message: '请输入用户名！' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>自动登陆</Checkbox>
						)}
						<a style={{float:'right'}}>忘记密码</a>
						<Button type="primary" htmlType="submit" className="login_button">登陆</Button>
						<div className='clearfix otherLogin'>
							<span className="left">其他登陆方式：<Icon type="wechat" style={{fontSize:25,marginRight:5}}/><Icon type="qq" style={{fontSize:25}}/></span>
							<span className="right">免费注册<Icon type="login" /></span>
						</div>
					</FormItem>
				</Form>
			</Modal>
		)
	}
}
export default Form.create()(Login)
