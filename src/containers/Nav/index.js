import React, {Component} from 'react';
import { Menu, Dropdown, Button, Pagination, Modal, Icon, Input, Select } from 'antd';
import './index.scss'
import About from '~/About'
import {
	Route,
	Link,
} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import phone_in_talk from 'static/phone-in-talk.svg'
// import { bindActionCreators } from 'redux'
// import {connect} from 'react-redux';
// import { browserHistory} from 'react-router'
// import * as addAddressAction from '@/actions/addAddress.js';


export default class Nav extends Component {
	render() {
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
						<span className='active'>登陆</span><span>注册</span>
					</div>
				</div>
				<div className="NavBar contentCenter clearfix">
					<div className='NavAll left' onMouseOver={()=>{}}>全部课程</div>
					<Menu
		        // onClick={this.handleClick}
		        // selectedKeys={[this.state.current]}
		        mode="horizontal"
			    >
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
			    <ul className="fixed">
			    	<li><Icon type='rocket'/>激活vip</li>
			    	<li><Icon type="pay-circle-o" />购买vip</li>
			    	<li><Icon type="form" />申请试用</li>
			    	<li><Icon type="exclamation-circle-o" />客服帮助</li>
			    	<li><Icon type="flag" />学校服务</li>
			    </ul>
			</div>
		);
	}
}
// const mapStateToProps = (state) => {
// 	return {
// 		state:state.addAddress
// 	}
// };
// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(addAddressAction, dispatch)
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
