
import React, { Component }from 'react';
import { Icon, Button, Modal, Checkbox } from 'antd';
// import { Link } from 'react-router-dom'
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
			datas:[],
		}
	}
	componentDidMount(){
		this.getData()
	}
	//获取数据
	getData = ()=>{
		let { id } = this.props.match.params
		_axios.get(url.courses+'/'+id)
			.then(data=>{
				data.course.checked = false
				let newData = data.course.datas
				newData.map(function(item){
					item.checked = false
					item.exams.map(function(iitem){
						iitem.checked = false
					})
				})
				this.setState({data:data.course})
			})
	}
	//全选点击
	handleAllChecked = (e)=>{
		let checked = e.target.checked
		let { data } = this.state
		data.checked = checked
		data.datas.map(function(item){
			item.checked = checked
			item.exams.map(function(iitem){
				iitem.checked = checked
			})
		})
		this.setState({data})
	}
	//小的汇总选中点击
	handleSmallAllChecked = (e,title)=>{
		let checked = e.target.checked
		let { data } = this.state
		data.datas.map(function(item){
			if(item.title == title){
				item.checked = checked
				item.exams.map(function(iitem){
					iitem.checked = checked
				})
			}
		})
		//检查全部选中的判断
		data.checked = true
		data.datas.map(function(item){
			if(item.checked == false){
				data.checked = false
			}
		})
		this.setState({data})
	}
	//checkbox点击
	handleChecked = (e,id)=>{
		let checked = e.target.checked
		let { data } = this.state
		data.datas.map(function(item){
			item.exams.map(function(iitem){
				if(iitem.id == id){
					iitem.checked = checked
				}
			})
		})
		//检查小汇总是否选中
		data.datas.map(function(item){
			item.checked = true
			item.exams.map(function(iitem){
				if(iitem.checked == false){
					item.checked = false
				}
			})
		})
		//检查全部选中的判断
		data.checked = true
		data.datas.map(function(item){
			if(item.checked == false){
				data.checked = false
			}
		})
		this.setState({data})
	}
	//下载选中
	handleDownloadMany = ()=>{
		let { data } = this.state
		let exam_ids=[]
		data.datas.map(function(item){
			item.exams.map(function(iitem){
				if(iitem.checked){
					exam_ids.push(iitem.id)
				}
			})
		})
		this.checkLogin(2, data.id, exam_ids)
	}
	//检查是否登录并下载
	checkLogin = (_sort, id,exam_ids)=>{
		const { subject_id, vips } = this.props.persist
		let is_vip = vips.find(function(item){
			return item.subject_id == subject_id
		})
		if(!this.props.persist.user.token){
			eventEmitter.emit('notLogin');
			return
		}else if(!is_vip){
			Modal.error({
				title: '温馨提醒',
				content: '该功能仅限VIP用户使用',
			});
		}else if(_sort == 1){
			this.props.history.push(`/ShiJuanDetail/${id}/exam`)
		}else{
			if(exam_ids.length==1){
				//单个开始下载
				_axios.post(url.download_records,{
					type : 'exam',
					id:exam_ids[0],
				})
					.then(data=>{
						if(data.paid){
							location.href = data.url
						}else{
							Modal.error({
								title: '下载你失败',
								content: data.msg,
							});
						}
					})
			}else{
				//打包开始下载
				_axios.post(url.download_records,{
					type : 'course',
					id,
					exam_ids,
				})
					.then(data=>{
						if(data.paid){
							location.href = data.url
						}else{
							Modal.error({
								title: '下载你失败',
								content: data.msg,
							});
						}
					})
			}

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
					<div className='clearfix' style={{paddingTop:20}}>
						<Checkbox checked={data.checked} className="left" style={{marginTop:10}} onChange={this.handleAllChecked}>全选</Checkbox>
						<Button type="primary" className="right" onClick={this.handleDownloadMany}>下载选中试卷</Button>
					</div>
					{
						data.datas.length>0 && data.datas.map((item,i)=>{
							return (
								<div key={i}>
									<div className="title">
										<Checkbox checked={item.checked} onChange={(e)=>this.handleSmallAllChecked(e,item.title)}>
											<span className='main'>{item.title}<small>该专题只对<span>VIP</span>与<span>组卷通</span>开放</small></span>
										</Checkbox>
									</div>
									<ul>
										{
											item.exams.length>0 && item.exams.map((iitem)=>{
												return (
													<li className='clearfix' key={iitem.id}>
														<div className="left">
															<Checkbox checked={iitem.checked} onChange={(e)=>this.handleChecked(e,iitem.id)}></Checkbox>
															<span onClick={()=>this.checkLogin(1,iitem.id)}>{iitem.title}{/*<small>(14道题)</small>*/}</span>
														</div>
														<div className="right">
															{/*	<span>平均分：暂无测试</span>
															<span><Icon type="edit" /> <Link to='/OnlineTest/1'>开始测试</Link></span>*/}
															<Button type="primary" icon="download" onClick={()=>this.checkLogin(2,data.id,[iitem.id])}>下载</Button>
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
