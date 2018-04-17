import React, {Component} from 'react';
import { Menu, Dropdown, Icon, Input, Select, BackTop } from 'antd';
import './index.scss'
import phone_in_talk from 'static/phone-in-talk.svg'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as navAction from '@/Redux/actions/nav.js';
import * as persistAction from '@/Redux/actions/persist.js';
import { bindActionCreators } from 'redux'
import Register from './Register'
import Forget from './Forget'
import Login from './Login'
import Analyze from '@/Components/Analyze'
import Download from '@/Components/Download'
import AnswerSheet from '@/Components/AnswerSheet'
import CorrectError from '@/Components/CorrectError'
import { getCookie } from '@/service/cookie'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

@connect(
	state => {
		return {
			persist:state.persist,
			other:state.other
		}
	},
	dispatch => {
		return {
			navAction:bindActionCreators(navAction, dispatch),
			persistAction:bindActionCreators(persistAction, dispatch)
		}
	}
)
export default class Nav extends Component {
	constructor(){
		super()
		this.state={
			allClassName:'全部课程',
			alClassShow:false,
			educations:[],
			logo:'',
			phone:''
		}
		this.timer=null
	}
	static contextTypes = {
	 router: PropTypes.object.isRequired
	};
	componentDidMount(){
		this.getLogo()
		this.props.persistAction.getEducations()

		let token = getCookie('tiba_key')
		if(token){
			this.props.persistAction.getUser(token)
		}
	}
		//获取logo和电话
	getLogo = ()=>{
		axios.get(url.homelogo)
			.then(({data})=>{
				if(data.msg.status === 'success'){
					this.setState({
						logo:data.web && data.web.avatar_data.original,
						phone:data.web.telephone
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
		const { allClassName, alClassShow, logo, phone } = this.state
		const { user,educations,full_name } = this.props.persist
		const { other } = this.props
		return (
			<div className="Nav">
				<div className="head">
					<div className="contentCenter clearfix">
						<img src={logo} alt="" className="left"/>
						<div className="right">
							<img src={phone_in_talk} alt=""/>
							{phone}
						</div>
					</div>
				</div>
				<div className="login contentCenter clearfix">
					<div className="right">
						{
							!user
								?
								<div>
									<span onClick={()=>this.props.navAction.changeLoginModalShow(true)}>登陆</span>
									<span onClick={()=>this.props.navAction.changeRegisterModalShow(true)}>注册</span>
								</div>
								:
								<Dropdown overlay={
									<Menu>
										<Menu.Item key="download">
											<Link to='/PersonalCenter/download' target="_blank">下载记录</Link>
										</Menu.Item>
										<Menu.Item key="Pzujuanrecord">
											<Link to='/PersonalCenter/Pzujuanrecord' target="_blank">组卷记录</Link>
										</Menu.Item>
										<Menu.Item key="Pshiti">
											<Link to='/PersonalCenter/Pshiti' target="_blank">我的收藏</Link>
										</Menu.Item>
										<Menu.Item key="personalcenter">
											<Link to='/PersonalCenter/personalcenter' target="_blank">个人信息</Link>
										</Menu.Item>
										<Menu.Divider />
										<Menu.Item key="exit">
											<span 
												style={{display: 'inline-block',width: '100%'}} 
												onClick={()=>this.props.persistAction.exitUser(this.context.router.history)}>退出
											</span>
										</Menu.Item>
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
						>{full_name} <Icon type="down" /></div>
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
			        {/*<Menu.Item key="beike">备课中心</Menu.Item>*/}
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
