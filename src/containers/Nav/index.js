import React, {Component} from 'react';
import { Menu, Dropdown, Modal, Icon, Input, Select,Form, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import './index.scss'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import phone_in_talk from 'static/phone-in-talk.svg'
// import { bindActionCreators } from 'redux'
// import {connect} from 'react-redux';
// import { browserHistory} from 'react-router'
// import * as addAddressAction from '@/actions/addAddress.js';

const menu = (
	<Menu>
		<Menu.Item key="0">
			<a target="_blank">1st menu item</a>
		</Menu.Item>
		<Menu.Item key="1">
			<a target="_blank">2nd menu item</a>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="3">3rd menu </Menu.Item>
	</Menu>
);
const menu1 = (
	<Menu>
		<Menu.Item key="0">
			<a target="_blank">1st menu item</a>
		</Menu.Item>
		<Menu.Item key="1">
			<a target="_blank">2nd menu item</a>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="3">3rd menu </Menu.Item>
	</Menu>
);
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
export default Form.create()(class Nav extends Component {
	constructor(){
		super()
		this.state={
			title:'登陆',
			visible1:false,
			visible2:true,
			visible3:false
		}
	}
	handleSubmit1 = (e) => {
	 e.preventDefault();
	 this.props.form.validateFields((err, values) => {
		 if (!err) {
			 console.log('Received values of form: ', values);
		 }
	 });
	}
	handleLogin = ()=>{
		this.setState({visible1:true})
	}
	handleRegister = ()=>{
		this.setState({visible2:true})
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { visible1, visible2, visible3 } = this.state
		return (
			<div className="Nav">
				<div className="head">
					<div className="contentCenter clearfix">
						<img src="https://zujuan.21cnjy.com/images/test_logo.png" alt="" className="left"/>
						<div className="right">
							<img src={phone_in_talk} alt=""/>
							400-800-4489
						</div>
					</div>
				</div>
				<div className="login contentCenter clearfix">
					<div className="right">
						<span onClick={this.handleLogin}>登陆</span>
						<span onClick={this.handleRegister}>注册</span>
						<Dropdown overlay={menu}>
					    <div>欢迎，张三<Icon type="down" /></div>
					  </Dropdown>
					</div>
				</div>
				{/* 导航菜单 */}
				<div className="NavBar contentCenter clearfix">
					<div className='NavAll left' onMouseOver={()=>{}}>全部课程</div>
					<Menu mode="horizontal">
		        <Menu.Item key="home">网站首页</Menu.Item>
		        <SubMenu title={<span>手动组卷</span>}>
		          	<Menu.Item key="setting:1">Option 1</Menu.Item>
		            <Menu.Item key="setting:2">Option 2</Menu.Item>
		        </SubMenu>
		        <SubMenu title={<span>自动组卷</span>}>
		          	<Menu.Item key="setting:3">Option 1</Menu.Item>
		            <Menu.Item key="setting:4">Option 2</Menu.Item>
		        </SubMenu>
		        <SubMenu title={<span>试题库</span>}>
		          	<Menu.Item key="setting:5">Option 1</Menu.Item>
		            <Menu.Item key="setting:6">Option 2</Menu.Item>
		        </SubMenu>
		        <Menu.Item key="beike">备课中心</Menu.Item>
			    </Menu>
					<div className="item-list">
						<h3>小学</h3>
						<span>语文</span>
						<span>数学</span>
						<span>英语</span>
						<span>科学</span>
						<span>政治思品</span>
						<h3>初中</h3>
						<span>语文</span>
						<span>数学</span>
						<span>英语</span>
						<span>科学</span>
						<span>物理</span>
						<span>化学</span>
						<span>历史</span>
						<span>政治思品</span>
						<span>历史与社会</span>
						<span>社会思品</span>
						<span>生物</span>
						<h3>高中</h3>
						<span>语文</span>
						<span>数学</span>
						<span>英语</span>
						<span>物理</span>
					</div>
			    <div className="right search">
						<Input
						 	placeholder='请输入关键词'
						 	addonBefore={
						 		<Select defaultValue="试卷" style={{ width: 90 }}>
								   <Option value="试题">试题</Option>
								   <Option value="试卷">试卷</Option>
								</Select>}
						 	addonAfter={<Icon type="search"/>}
						 />
				  </div>
			  </div>
				{/* 固定导航 */}
		    <ul className="fixed">
					<li><Icon type='rocket'/>激活vip</li>
					<li><Icon type="pay-circle-o" />购买vip</li>
					<li><Icon type="form" />申请试用</li>
					<li><Icon type="exclamation-circle-o" />客服帮助</li>
					<li className='last'><Icon type="flag" />学校服务</li>
		    </ul>
				{/* 登陆 */}
				<Modal
					title='登陆'
					width={350}
					visible={visible1}
					footer={null}
					onCancel={()=>this.setState({visible1:false})}
				>
					<Form onSubmit={this.handleSubmit1} className="login-form">
						<FormItem>
							{getFieldDecorator('userName', {
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
				{/* 注册 */}
				<Modal
					title='注册'
					visible={visible2}
					footer={null}
					onCancel={()=>this.setState({visible2:false})}
				>
					<Form onSubmit={this.handleSubmit2} className="login-form">
						<FormItem
							{...formItemLayout}
							label="注册用户"
						>
							{getFieldDecorator('remember')(
								<Dropdown.Button overlay={menu1}>
							    老师
							  </Dropdown.Button>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="手机号码"
						>
							{getFieldDecorator('userName', {
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
							{getFieldDecorator('password1', {
								rules: [{ required: true, message: '两次密码不一致!' }],
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
								<Input prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入验证码" addonAfter={<span className='getYanzhenma'>获取验证码</span>}/>
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox style={{marginLeft:115}}>我同意<a href="">《xx注册协议》</a></Checkbox>
							)}
							<Button type="primary" htmlType="submit" className="register_button">登陆</Button>
						</FormItem>
					</Form>
				</Modal>
				{/* 忘记密码 */}
				<Modal
					title='找回密码'
					visible={visible3}
					width={350}
					footer={null}
					onCancel={()=>this.setState({visible2:false})}
				>
					<Form onSubmit={this.handleSubmit2} className="login-form">
						<FormItem
							label="手机号码"
						>
							{getFieldDecorator('userName', {
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
			</div>
		);
	}
})
// const mapStateToProps = (state) => {
// 	return {
// 		state:state.addAddress
// 	}
// };
// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(addAddressAction, dispatch)
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
