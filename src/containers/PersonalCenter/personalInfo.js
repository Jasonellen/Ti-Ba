

import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { Icon, Input, notification } from 'antd'
import moment from 'moment'
import * as persistAction from '@/Redux/actions/persist.js';
import { bindActionCreators } from 'redux'
const Search = Input.Search;

@connect(
	state => state.persist,
	dispatch => bindActionCreators(persistAction, dispatch)
)
export default class PersonalInfo extends Component{
	state={
		user:{
			avatar_data:{},
			vips:[]
		},
		edit:false
	}
	componentDidMount(){
		this.getUserInfo()
	}
	getUserInfo = ()=>{
		const { user } = this.props
		_axios.get(url.owner_users+user.id)
			.then((data)=>{
				this.setState({
					user:data.user
				})
			})
	}
	handleChangeName = (name)=>{
		_axios.patch(url.owner_users+'/'+this.state.user.id,{name})
			.then(()=>{
				this.getUserInfo()
				this.props.changeUserName(name)
				notification.success({
					message: '通知提醒',
					description: '用户名更新成功！',
					duration:3
				});
				this.setState({edit:false})
				eventEmitter.emit('user_name_changed');
			})
	}
	render(){
		const { user, edit } = this.state
		//teacher, student, :family
		return (
			<div className="personalInfo">
      	<h1>个人信息</h1>
      	<h3>基本信息</h3>
      	<ul>
      		<li>
      			<span className="name">用户名：</span>
      			<strong className="value">{user.name || user.login}</strong>
						{
							edit
							?
							<span>
								<Search
									style={{width:200,marginLeft: 10}}
									placeholder="请修改用户名"
									enterButton="确定"
									onSearch={this.handleChangeName}
								/>
								<Icon type="backward" style={{ marginLeft:10,cursor:'pointer',fontSize: 16, color: '#ff9600' }} onClick={()=>this.setState({edit:false})}/>
							</span>
							:
							<Icon type="edit" style={{ marginLeft:10,cursor:'pointer',fontSize: 16, color: '#ff9600' }} onClick={()=>this.setState({edit:true})}/>
						}
      		</li>
      		<li>
      			<span className="name">用户身份：</span>
      			<strong className="value">{user.user_type == 'teacher'?'老师': user.user_type == 'student'?'学生':user.user_type == 'family'?'家人':'未知'}</strong>
      		</li>
      		{/* <li>
      			<span className="name">真实姓名：</span>
      			<strong className="value">{user.name}</strong>
      		</li> */}
      		<li>
      			<span className="name">绑定手机：</span>
      			<strong className="value">{user.mobile}</strong>
      		</li>
      	</ul>
      	<h3>VIP会员信息</h3>
				<div className='clearfix'>
					{
						user.vips.length>0 && user.vips.map(function(item){
							return (
								<div key={item.id} className="user-item left">
									<p><span>学段学科：</span>{item.education_name+item.subject_name}</p>
									<p><span>到期时间：</span>{moment(item.end_at).format('YYYY-MM-DD')}</p>
									<p><span>剩余下载次数：</span>{item.total_download_no - item.download_no}</p>
									<Link to="/vip">续费</Link>
								</div>
							)
						})
					}
				</div>

			</div>
		)
	}
}
