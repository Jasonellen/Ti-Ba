
import React, { Component }from 'react';
import { Modal, Pagination, Icon, Button } from 'antd';
import './index.scss'
import { Link } from 'react-router-dom'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
import {connect} from 'react-redux';
import SmallNavBar from '@/Components/SmallNavBar'
import text from 'static/text.jpg'
import moment from 'moment'
const confirm = Modal.confirm;

@connect(
	state => state.persist,
	null
)
export default class SearchPage extends Component{
	state = {
		educations:[],
		educations_id:'',
		subjects:[],
		subjects_id:'',
		page:1,
		per_page:10,
		total_pages:0,
		total_count:0,
		cart_data:[],
		key:'',
		data:[],
		exam_type_id:'',
		exam_types:[]
	};
	componentDidMount(){
		const query = this.props.location.query
		if(query){
			this.setState({
				key:query.key
			},()=>{
				this.InitialSeatchOption()
			})
		}else{
			this.InitialSeatchOption()
		}

		eventEmitter.on('beginSearch',(key)=>{
			this.setState({key},this.getList)
		});
		eventEmitter.on('subjectChanged',()=>{
			this.getList()
			this.getCarts()
		});

	}

	//初始化搜索条件
	InitialSeatchOption = ()=>{
		const { educations } = this.props
		let subjects = []
		let educations_id = ''
		let subjects_id = ''
		if(educations.length>0){
			subjects = educations[0].subjects
			educations_id = educations[0].id
			subjects_id = subjects[0].id
		}
		this.setState({
			educations,
			subjects,
			educations_id,
			subjects_id
		},()=>{
			this.getList()
			this.getExamTypes()
		})
	}
	getExamTypes = ()=>{
		_axios.get(url.exam_types,{
			exam_class:'',
			educations_id:this.state.educations_id
		})
			.then(data=>{
				let exam_types = data.data
				exam_types.map(function(item){
					item.id = item.value
					item.name = item.label
				})
				this.setState({
					exam_types
				})
			})
	}
	//搜索列表
	getList = ()=>{
		const { searchType } = this.props
		const { key, subjects_id:subject_id, page, per_page, exam_type_id } = this.state
		let option = {
			type:searchType,
			key,
			subject_id,
			page,
			per_page
		}
		if(searchType == 'exam'){
			option.exam_type_id = exam_type_id
		}
		_axios.post(url.home_search,option)
			.then(data=>{
				this.setState({
					data:data.data,
					total_count:data.meta.total_count,
					total_pages:data.meta.total_pages,
				},this.getCarts)
			})
	}
	//教育点击
	handleE = (x)=>{
		const { educations } = this.props
		let subjects = educations.find(function(item){
			return item.id == x
		}).subjects
		let subjects_id = ''
		if(subjects.length> 0 ){
			subjects_id = subjects[0].id
		}
		this.setState({
			educations_id:x,
			subjects,
			subjects_id,
			page:1
		},()=>{
			this.getList()
		})
	}
	//学科点击
	handleS = (subjects_id)=>{
		this.setState({subjects_id,page:1},()=>{
			this.getList()
		})
	}
	//题型点击
	handleExamTypes = (exam_type_id)=>{
		this.setState({exam_type_id},this.getList)
	}
	//翻页
	handlePage = (page)=>{
		this.setState({page},this.getList)
	}
	//获取购物车信息
	getCarts = ()=>{
		const { subjects_id:subject_id } = this.state
		_axios.get(url.owner_carts,{
			subject_id
		})
			.then(data=>{
				this.setState({
					cart_data:data.data
				})
			})
	}
	//收藏/取消收藏
	handleCollect = (id,star) =>{
		let method = star ? 'delete' : 'post'
		let _url = star ? url.action_stores+'/'+id : url.action_stores
		let msg = star ? '取消收藏成功！' : '收藏成功！'
		_axios[method](_url,{
			action_type:'star',
			target_type:'topic',
			id,
		})
			.then(()=>{
				this.getList()
				Modal.success({
					title: '消息提醒',
					content: msg,
				});
			})
	}
	//选题点击
	handleSelect = (topic_id,subject_id,in_cart)=>{
		if(!in_cart){
			//添加购物车
			_axios.post(url.owner_carts,{
				topic_id,
				subject_id
			})
				.then(()=>{
					this.getList() //重新获取购物车列表
				})
		}else{
			const { cart_id } = this.state.cart_data[0]
			//删除购物车试题
			_axios.delete(url.owner_carts+'/'+cart_id,{
				topic_ids:[topic_id],
			})
				.then(()=>{
					this.getList() //重新获取购物车列表
				})
		}

	}
	//删除购物车行
	handleDelShiTiLan = (topic_ids,title)=>{
		var _this = this
		confirm({
			title: <div>确定要删除 <span style={{color:'#ff9600'}}>{title}</span> 么</div>,
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				const { cart_id } = _this.state.cart_data[0]
				_axios.delete(url.owner_carts+'/'+cart_id,{
					topic_ids,
				})
					.then(()=>{
						_this.getList() //重新获取购物车列表
					})
			}
		});
	}
	//生成组卷
	handleSubmit = ()=>{
		const { cart_data } = this.state
		if(!cart_data[0]){
			Modal.error({
				title:'请先选择试题'
			})
			return;
		}else{
			const { cart_id } = cart_data[0]
			_axios.post(url.group_exam_hand_exams,{
				cart_id
			})
				.then(data=>{
					_history.push('/DownloadPage/'+data.exam_record_id)
				})
		}
	}
	render(){
		const { educations, subjects, data, total_pages, total_count, page, cart_data, key, exam_types } = this.state
		const { searchType } = this.props
		return (
			<div className='SearchPage contentCenter'>
				<div className="upoption">
					<SmallNavBar
						noall
						title='学段'
						data={educations}
						onChange={this.handleE}
					/>
					<SmallNavBar
						noall
						title='学科'
						data={subjects}
						onChange={this.handleS}
					/>
				</div>
				{
					searchType == 'exam' && (
						<div className="downoption">
							<SmallNavBar
								title='题型'
								data={exam_types}
								onChange={this.handleExamTypes}
							/>
						</div>
					)
				}
				<p className='about'>{key && <me>和<span> “{key}” </span></me>}相关{searchType == 'topic' ? '试题' : '试卷'}共<span> {total_count} </span>{searchType == 'topic' ? '道' : '张'}</p>
				{
					searchType == 'topic' && (
						<ul>
							{
								data.length>0 && data.map((item)=>{
									return (
										<li key={item.id} style={{marginBottom:20}}>
											<ShiTiItem
												data={item}
												onCollect = {this.handleCollect}
												onSelect={this.handleSelect}
											/>
										</li>
									)
								})
							}
						</ul>
					)
				}
				{
					searchType == 'exam' && (
						<ul className='downloadItem'>
							{
								data.length>0 && data.map((item)=>{
									return (
										<li key={item.id}>
											<div className="search-list-left">
												<img src={text} alt=""  className="test-pic"/>
												<div className="test-txt">
													<p className="test-txt-p1">
														<Link to={`/ShiJuanDetail/${item.id}/exam`} target="_blank">{item.title}</Link>
													</p>
													<p>
														<span><Icon type="clock-circle-o" />下载时间：{moment(item.created_at).format('YYYY-MM-DD')}</span>
														<span><Icon type="download" />下载次数：{item.download_times}</span>
														<span><Icon type="file-text" />类型：{item.exam_type_name}</span>
													</p>
												</div>
											</div>
											<Button icon='download' type='primary' onClick={()=>this.props.history.push(`/downloadpage/${item.id}/exam`)}>下载</Button>
										</li>
									)
								})
							}
						</ul>
					)
				}
				{!!total_pages && <Pagination showQuickJumper style={{marginTop:50}} current={page} total={total_pages*10} onChange={this.handlePage}/> }
				{
					searchType == 'topic' && (
						<ShiTiLan
							data = {cart_data}
							onDel = {this.handleDelShiTiLan}
							onSubmit = {this.handleSubmit}
						/>
					)
				}
			</div>
		)
	}
}
