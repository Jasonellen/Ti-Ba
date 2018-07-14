
import React, { Component }from 'react';
import { Modal, Pagination} from 'antd';
import './index.scss'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
import {connect} from 'react-redux';
import SmallNavBar from '@/Components/SmallNavBar'
const confirm = Modal.confirm;
import PaperItem from '@/Components/PaperItem'

@connect(
	state => state.persist,
	null
)
export default class SearchPage extends Component{
	state = {
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
		this.getList()
		this.getExamTypes()
	}
	getExamTypes = ()=>{
		const { education_id } = this.props
		_axios.get(url.exam_types,{
			exam_class:'',
			educations_id:education_id
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
		const { searchType, subject_id } = this.props
		const { key, page, per_page, exam_type_id } = this.state
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
		const { subject_id } = this.props
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
			.then((data)=>{
				if(data.status == 'success'){
					this.getList()
					Modal.success({
						title: '消息提醒',
						content: msg,
					});
				}
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
		const { data, total_pages, total_count, page, cart_data, key, exam_types } = this.state
		const { searchType } = this.props
		return (
			<div className='SearchPage contentCenter'>
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
										<li key={item.id}><PaperItem data={item}/></li>
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
