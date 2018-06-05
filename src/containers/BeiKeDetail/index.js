
import React, { Component }from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom'
import './index.scss'
import moment from 'moment'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null
)
export default class BeiKeDetail extends Component{
	state={
		data:{
			datas:[]
		}
	}
	componentDidMount(){
		let { id } = this.props.match.params
		_axios.get(url.courses+'/'+id)
			.then(data=>{
				this.setState({data:data.course})
			})
	}
	handleChange = (value)=>{
		console.log(value)
	}
	checkLogin = (_sort, id)=>{
		if(!this.props.persist.user.token){
			eventEmitter.emit('notLogin');
			return
		}else if(_sort == 1){
			this.props.history.push(`/ShiJuanDetail/${id}/exam`)
		}else{
			this.props.history.push(`/downloadpage/${id}/exam`)
		}
	}
	render(){
		const { data } = this.state
		return (
			<div className='BeiKeDetail'>
				<div className="special-banner">
					<div className="banner-text">
						<div className="banner-title">
							<p className="title1">{data.name}</p>
							<p className="title2">{data.course_category_name}</p>
						</div>
						<p className="text-msg">
							<span><Icon type="clock-circle-o" /> 时间：{moment(data.updated_at).format('YYYY年MM月DD日')}</span>
							<span><Icon type="download" /> 下载量：{data.downloads_count}次</span>
							<span><Icon type="eye-o" /> 浏览量：{data.views_count}</span>
							{/*<span className="collect">
								<Icon type="star-o" /><Icon type="star" /> 收藏
							</span>*/}
						</p>
					</div>
				</div>
				<div className="contentCenter box">
					{
						data.datas.length>0 && data.datas.map((item,i)=>{
							return (
								<div key={i}>
									<div className="title">
										{/*<Checkbox onChange={this.handleChange}>
											<span className='main'>2018年中考数学几何部分基础考点训练<small>该专题只对<span>VIP</span>与<span>组卷通</span>开放</small></span>
										</Checkbox>*/}
										<span className='main'>{item.title}<small>该专题只对<span>VIP</span>与<span>组卷通</span>开放</small></span>
									</div>
									<ul>
										{
											item.exams.length>0 && item.exams.map((iitem)=>{
												return (
													<li className='clearfix' key={iitem.id}>
														<div className="left" onClick={()=>this.checkLogin(1,iitem.id)}>
															{/*<Checkbox onChange={this.handleChange}></Checkbox>*/}
															<div><span>{iitem.title}{/*<small>(14道题)</small>*/}</span></div>
														</div>
														<div className="right">
															{/*	<span>平均分：暂无测试</span>
															<span><Icon type="edit" /> <Link to='/OnlineTest/1'>开始测试</Link></span>*/}
															<Button type="primary" icon="download" onClick={()=>this.checkLogin(2,iitem.id)}>下载</Button>
														</div>
													</li>
												)
											})
										}
									</ul>
								</div>
							)
						})
					}


				</div>
			</div>
		)
	}
}
