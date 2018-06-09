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
// import Analyze from '@/Components/Analyze'
import Download from '@/Components/Download'
// import AnswerSheet from '@/Components/AnswerSheet'
import CorrectError from '@/Components/CorrectError'
import { getCookie } from '@/service/cookie'
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

@connect(
	state => {
		return {
			persist:state.persist,
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
			alClassShow:false,
			educations:[],
			logo:'',
			phone:'',
			searchkey:'',
		}
		this.timer=null
	}
	static contextTypes = {
	 router: PropTypes.object.isRequired
	};
	componentDidMount(){
		global._history = this.context.router.history  //设置一下全局路由

		let token = getCookie('tiba_key')
		if(token){
			this.props.persistAction.getUser(token)
		}

		this.props.persistAction.getEducations()
		this.props.persistAction.getLogo()

	}

	//全部课程hover
	handleAllClass = (value)=>{
		clearTimeout(this.timer)
		if(value){
			this.setState({alClassShow:value})
		}else{
			this.timer = setTimeout(()=>{
				this.setState({alClassShow:value})
			},500)
		}
	}
	//课程点击
	handleClassClick = (item,iitem)=>{
		this.props.persistAction.changeSubject(item,iitem)
		this.props.persistAction.changeAllClassName('当前：'+item.name+iitem.name)
	}

	NavLinkTo = (page)=>{
		if(page == 'double'){
			if(!this.props.persist.user.token){
				eventEmitter.emit('notLogin');
				return
			}
		}
		this.props.persistAction.changeExamClass(page)
		if(page == 'synchronous'){
			page = 'Papers'
		}else if(page == 'test'){
			page = 'PapersTest'
		}else if(page == 'simulation'){
			page = 'realPapers'
		}
		this.context.router.history.push('/'+page)
	}
	handleSearch = ()=>{
		const { searchkey } = this.state
		if(location.pathname.toLowerCase() !== '/searchpage'){
			this.context.router.history.push({pathname:'/searchpage',query:{key:searchkey}})
		}else{
			eventEmitter.emit('beginSearch',searchkey)
		}
	}

	render() {
		const { alClassShow } = this.state
		const { user,educations,allClassName,web, exam_classes, searchType } = this.props.persist
		return (
			<div className="Nav">
				<div className="head">
					<div className="contentCenter clearfix">
						<img src={web.avatar_data.original} alt="" className="left"/>
						<div className="right">
							<img src={phone_in_talk} alt=""/>
							{web.telephone}
						</div>
					</div>
				</div>
				<div className="login contentCenter clearfix">
					<div className="right">
						{
							!user.token
								?
								<div>
									<span onClick={()=>this.props.navAction.changeLoginModalShow(true)}>登陆</span>
									<span onClick={()=>this.props.navAction.changeRegisterModalShow(true)}>注册</span>
								</div>
								:
								<Dropdown overlay={
									<Menu>
										<Menu.Item key="download">
											<Link to='/PersonalCenter/download'>下载记录</Link>
										</Menu.Item>
										<Menu.Item key="Pzujuanrecord">
											<Link to='/PersonalCenter/Pzujuanrecord'>组卷记录</Link>
										</Menu.Item>
										<Menu.Item key="Pshiti">
											<Link to='/PersonalCenter/Pshiti'>我的收藏</Link>
										</Menu.Item>
										<Menu.Item key="personalcenter">
											<Link to='/PersonalCenter/PersonalInfo'>个人信息</Link>
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
									<div>欢迎，{user.login}<Icon type="down" /></div>
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
			        {
									exam_classes.length>0 && exam_classes.map((item)=>{
										return <Menu.Item key={item.value}>{item.label}</Menu.Item>
									})
			        }
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
															return <span key={iitem.id} onClick={()=>this.handleClassClick(item,iitem)}>{iitem.name}</span>
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
								onChange = {(e)=>this.setState({searchkey:e.target.value})}
								onPressEnter = {this.handleSearch}
							 	placeholder='请输入关键词'
							 	addonBefore={
							 		<Select defaultValue={searchType} style={{ width: 90 }} onChange={(x)=>this.props.persistAction.changeSearchType(x)}>
									   <Option value="topic">试题</Option>
									   <Option value="exam">试卷</Option>
									</Select>}
							 	addonAfter={<Icon type="search" onClick={this.handleSearch}/>}
							 />
					  </div>
				  </div>
				</div>
				{/* 固定导航 */}
		    <ul className="fixed">
					{/*<li onClick={()=>this.NavLinkTo('VipActivate')}><Icon type='rocket'/>激活vip</li>*/}
					<li onClick={()=>this.NavLinkTo('Vip')}><Icon type="pay-circle-o" />购买vip</li>
					<li onClick={()=>this.NavLinkTo('SchoolService')}><Icon type="form" />申请试用</li>
					<li><a href="http://wpa.qq.com/msgrd?v=1&uin=3212088314&site=qq&menu=yes&from=message&isappinstalled=0" target='_blank' rel='noopener noreferrer'><Icon type="qq" />客服帮助</a></li>
					<li onClick={()=>this.NavLinkTo('helpCenter')}><Icon type="flag" />帮助中心</li>
					<li onClick={()=>this.NavLinkTo('SchoolService')} className='last'><Icon type="home" />学校服务</li>
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
				{/*<Analyze />*/}
				{/* 试卷下载 */}
				<Download />
				{/* 答题卡下载 */}
				{/*<AnswerSheet />*/}
				{/* 试题纠错 */}
				<CorrectError />
			</div>
		);
	}
}
