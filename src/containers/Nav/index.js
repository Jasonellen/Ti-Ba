import React, {Component} from 'react';
import { Menu, Dropdown, Icon, Input, Select, BackTop } from 'antd';
import './index.scss'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import phone_in_talk from 'static/phone-in-talk.svg'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as navAction from '@/actions/nav.js';
import { bindActionCreators } from 'redux'
import Register from './Register'
import Forget from './Forget'
import Login from './Login'

@connect(
	state => {
		return {
			state:state.register,
		}
	},
	dispatch => bindActionCreators(navAction, dispatch)
)
export default class Nav extends Component {
	constructor(){
		super()
		this.state={
			allClassName:'当前课程',
			alClassShow:false
		}
		this.timer=null
	}
	static contextTypes = {
	 router: PropTypes.object.isRequired
	};
	componentDidMount(){

	}
	handleAllClass = (value)=>{
		clearTimeout(this.timer)
		if(value){
			this.setState({alClassShow:value})
		}else{
			this.timer = setTimeout(()=>{
				this.setState({alClassShow:value})
			},2000)
		}
	}
	handleToPage = (page)=>{
		this.context.router.history.push(page)
	}
	NavLinkTo = (item)=>{
		this.context.router.history.push('/'+item.key)
	}
	render() {
		const { allClassName, alClassShow } = this.state
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
						<span onClick={()=>this.props.changeLoginModalShow(true)}>登陆</span>
						<span onClick={()=>this.props.changeRegisterModalShow(true)}>注册</span>
						<Dropdown overlay={
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
						}>
					    <div>欢迎，张三<Icon type="down" /></div>
					  </Dropdown>
					</div>
				</div>
				{/* 导航菜单 */}
				<div className='NavBarWarp'>
					<div className="NavBar contentCenter clearfix">
						<div
							className='NavAll left'
							onMouseOver={()=>this.handleAllClass(true)}
							onMouseOut={()=>this.handleAllClass(false)}
						>{allClassName}</div>
						<Menu mode="horizontal" onClick={(item)=>this.NavLinkTo(item)}>
			        <Menu.Item key="home">网站首页</Menu.Item>
			        <SubMenu title={<span>手动组卷</span>}>
		          	<Menu.Item key="XuanTi/tb">章节同步选题</Menu.Item>
								<Menu.Item key="XuanTi/zsd">知识点选题</Menu.Item>
			        </SubMenu>
			        <SubMenu title={<span>自动组卷</span>}>
								<Menu.Item key="znzj/zj">章节智能组卷</Menu.Item>
								<Menu.Item key="znzj/zsd">知识点智能组卷</Menu.Item>
								<Menu.Item key="znzj/double">双向细目表组卷</Menu.Item>
			        </SubMenu>
			        <SubMenu title={<span>试卷库</span>}>
			          	<Menu.Item key="Papers">同步试卷</Menu.Item>
								<Menu.Item key="PapersTest">测试试卷</Menu.Item>
			            <Menu.Item key="realPapers">真卷&模拟卷</Menu.Item>
			        </SubMenu>
			        <Menu.Item key="beike">备课中心</Menu.Item>
				    </Menu>
						{
							alClassShow && (
								<div className="item-list"
									onMouseOver={()=>this.handleAllClass(true)}
									onMouseOut={()=>this.handleAllClass(false)}
								>
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
							)
						}

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
				</div>
				{/* 固定导航 */}
		    <ul className="fixed">
					<li onClick={()=>this.handleToPage('/VipActivate')}><Icon type='rocket'/>激活vip</li>
					<li onClick={()=>this.handleToPage('/Vip')}><Icon type="pay-circle-o" />购买vip</li>
					<li onClick={()=>this.handleToPage('/SchoolService')}><Icon type="form" />申请试用</li>
					<li><Icon type="exclamation-circle-o" />客服帮助</li>
					<li onClick={()=>this.handleToPage('/SchoolService')} className='last'><Icon type="flag" />学校服务</li>
		    </ul>
				{/* 登陆 */}
				<Login />
				{/* 注册 */}
				<Register />
				{/* 忘记密码 */}
				<Forget />
				{/* 返回顶部 */}
				<BackTop />
			</div>
		);
	}
}
