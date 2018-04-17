

import React,{ Component } from 'react'
import { Icon, Button } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'

export default class PersonalInfo extends Component{
	state={

	}
	render(){
		return (
      <div className="personalInfo">
      	<h1>个人信息</h1>
      	<h3>基本信息</h3>
      	<ul>
      		<li>
      			<span className="name">用户名：</span>
      			<strong className="value">阿萨空间的休息休息</strong>
      		</li>
      		<li>
      			<span className="name">用户身份：</span>
      			<strong className="value">未知</strong>
      		</li>
      		<li>
      			<span className="name">真实姓名：</span>
      			<strong className="value">xxxx</strong>
      		</li>
      		<li>
      			<span className="name">绑定手机：</span>
      			<strong className="value">13138888****</strong>
      		</li>
      	</ul>
      	<h3>VIP会员信息</h3>
      	<div className="user-item">
					<p><span>学段学科：</span>小学语文</p>
					<p><span>到期时间：</span>2018-04-18</p>
					<p><span>剩余下载次数：</span>49</p>
					<Link to="/vip">续费</Link>
				</div>
      </div>
		)
	}
}

