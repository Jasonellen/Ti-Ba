

import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment'

@connect(
	state => state.persist,
	null
)
export default class PersonalInfo extends Component{
	state={
		user:{
			avatar_data:{},
			vips:[]
		}
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
	render(){
		const { user } = this.state
		//teacher, student, :family
		return (
			<div className="personalInfo">
      	<h1>个人信息</h1>
      	<h3>基本信息</h3>
      	<ul>
      		<li>
      			<span className="name">用户名：</span>
      			<strong className="value">{user.login}</strong>
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
