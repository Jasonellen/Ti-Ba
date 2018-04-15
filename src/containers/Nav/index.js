import React, {Component} from 'react';
import { Menu, Dropdown, Icon, Input, Select, BackTop } from 'antd';
import './index.scss'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
import phone_in_talk from 'static/phone-in-talk.svg'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import { bindActionCreators } from 'redux'
import Register from './Register'
import Forget from './Forget'
import Login from './Login'
import Analyze from '@/Components/Analyze'
import Download from '@/Components/Download'
import AnswerSheet from '@/Components/AnswerSheet'
import CorrectError from '@/Components/CorrectError'

@connect(
	state => {
		return {
			user:state.persist.user,
			other:state.other
		}
	},
	dispatch => bindActionCreators(navAction, dispatch),
)
export default class Nav extends Component {
	constructor(){
		super()
		this.state={
			allClassName:'全部课程',
			alClassShow:false,
			educations:[],
		}
		this.timer=null
	}
	static contextTypes = {
	 router: PropTypes.object.isRequired
	};
	componentDidMount(){
		this.getEducations()
	}
	//课程列表
	getEducations=()=>{
		axios.get(url.educations)
			.then(({status,data})=>{
				if(status == 200){
					this.setState({
						educations:data.educations
					})
				}
			})
	}
	//全部课程hover
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
	//课程点击
	handleClassClick = (topic_id,topic_name,subject_id,subject_name)=>{
		this.setState({
			allClassName:'当前：'+topic_name+subject_name
		})
	}

	NavLinkTo = (page)=>{
		this.context.router.history.push('/'+page)
	}

	render() {
		const { allClassName, alClassShow, educations } = this.state
		const { user,other } = this.props
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
						{
							user
								?
								<div>
									<span onClick={()=>this.props.changeLoginModalShow(true)}>登陆</span>
									<span onClick={()=>this.props.changeRegisterModalShow(true)}>注册</span>
								</div>
								:
								<Dropdown overlay={
									<Menu>
										<Menu.Item key="0">
											<a target="_blank">下载记录</a>
										</Menu.Item>
										<Menu.Item key="1">
											<a target="_blank">组卷记录</a>
										</Menu.Item>
										<Menu.Item key="1">
											<a target="_blank">测试记录</a>
										</Menu.Item>
										<Menu.Item key="1">
											<a target="_blank">我的收藏</a>
										</Menu.Item>
										<Menu.Item key="1">
											<a target="_blank">错题本</a>
										</Menu.Item>
										<Menu.Item key="1">
											<a target="_blank">个人信息</a>
										</Menu.Item>
										<Menu.Divider />
										<Menu.Item key="3">退出</Menu.Item>
									</Menu>
								}>
									<div>欢迎，{user.name}<Icon type="down" /></div>
								</Dropdown>
						}
					</div>
				</div>
				{/* 导航菜单 */}
				<div className='NavBarWarp'>
					<div className="NavBar contentCenter clearfix">
						<div
							className='NavAll left'
							onMouseOver={()=>this.handleAllClass(true)}
							onMouseOut={()=>this.handleAllClass(false)}
						>{allClassName} <Icon type="down" /></div>
						<Menu mode="horizontal" onClick={(item)=>this.NavLinkTo(item.key)}>
			        <Menu.Item key="home">网站首页</Menu.Item>
			        <SubMenu title={<span>手动组卷</span>}>
		          	<Menu.Item key="XuanTi/tb">章节同步选题</Menu.Item>
								<Menu.Item key="XuanTi/zsd">知识点选题</Menu.Item>
			        </SubMenu>
			        <SubMenu title={<span>自动组卷</span>}>
								<Menu.Item key="znzj/zj">章节智能组卷</Menu.Item>
								<Menu.Item key="znzj/zsd">知识点智能组卷</Menu.Item>
								<Menu.Item key="double">双向细目表组卷</Menu.Item>
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
									{
										educations.length>0 && educations.map((item)=>{
											return(
												<div key={item.id}>
													<h3>{item.name}</h3>
													{
														item.subjects.length>0 && item.subjects.map((iitem)=>{
															return <span key={iitem.id} onClick={()=>this.handleClassClick(item.id,item.name,iitem.id,iitem.name)}>{iitem.name}</span>
														})
													}
												</div>
											)
										})
									}
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
					<li onClick={()=>this.NavLinkTo('VipActivate')}><Icon type='rocket'/>激活vip</li>
					<li onClick={()=>this.NavLinkTo('Vip')}><Icon type="pay-circle-o" />购买vip</li>
					<li onClick={()=>this.NavLinkTo('SchoolService')}><Icon type="form" />申请试用</li>
					<li><Icon type="exclamation-circle-o" />客服帮助</li>
					<li onClick={()=>this.NavLinkTo('helpCenter/base')} className='last'><Icon type="flag" />帮助中心</li>
		    </ul>
				{/* 登陆 */}
				<Login/>
				{/* 注册 */}
				<Register/>
				{/* 忘记密码 */}
				<Forget />
				{/* 返回顶部 */}
				<BackTop />
				{/* 试卷分析 */}
				<Analyze />
				{/* 试卷下载 */}
				<Download />
				{/* 答题卡下载 */}
				<AnswerSheet />
				{/* 试题纠错 */}
				<CorrectError />
			</div>
		);
	}
}
