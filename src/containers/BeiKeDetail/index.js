
import React, { Component }from 'react';
import { Icon, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom'
import './index.scss'

export default class BeiKeDetail extends Component{
	handleChange = (value)=>{
		console.log(value)
	}
	render(){
		return (
			<div className='BeiKeDetail'>
				<div className="special-banner">
					<div className="banner-text">
						<div className="banner-title">
							<p className="title1">2018年中考数学几何部分基础考点训练</p>
							<p className="title2">中考复习</p>
						</div>
						<p className="text-msg">
							<span><Icon type="clock-circle-o" /> 时间：2018年03月27日</span>
							<span><Icon type="download" /> 下载量：1次</span>
							<span><Icon type="eye-o" /> 浏览量：48</span>
							<span className="collect">
								<Icon type="star-o" /><Icon type="star" /> 收藏
							</span>
						</p>
					</div>
				</div>
				<div className="contentCenter box">
					<div className="title">
						<Checkbox onChange={this.handleChange}>
							<span className='main'>2018年中考数学几何部分基础考点训练<small>该专题只对<span>VIP</span>与<span>组卷通</span>开放</small></span>
						</Checkbox>
					</div>
					<ul>
						<li className='clearfix'>
							<div className="left">
								<Checkbox onChange={this.handleChange}></Checkbox>
								<Link to='/ShiJuanDetail/1'><span>2018年中考数学几何部分基础考点训练01：三视图<small>(14道题)</small></span></Link>
							</div>
							<div className="right">
								<span>平均分：暂无测试</span>
								<span><Icon type="edit" /> <Link to=''>开始测试</Link></span>
								<Button type="primary" icon="download">下载</Button>
							</div>
						</li>
						<li className='clearfix'>
							<div className="left">
								<Checkbox onChange={this.handleChange}></Checkbox>
								<span>2018年中考数学几何部分基础考点训练01：三视图<small>(14道题)</small></span>
							</div>
							<div className="right">
								<span>平均分：暂无测试</span>
								<span><Icon type="edit" /> <Link to=''>开始测试</Link></span>
								<Button type="primary" icon="download">下载</Button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
