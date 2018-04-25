
import React, { Component }from 'react';
import { Modal, Pagination } from 'antd';
import './index.scss'
import ShiTiItem from '@/Components/ShiTiItem'
import ShiTiLan from '@/Components/ShiTiLan'
import {connect} from 'react-redux';
import SmallNavBar from '@/Components/SmallNavBar'
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
		total_pages:10,
		cart_data:[],
	};
	componentDidMount(){
		// this.getData()
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
		})
	}
	//搜索列表
	getList = ()=>{

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
	handleDelShiTiLan = (topic_ids)=>{
		var _this = this
		confirm({
			title: `确定要删除  么`,
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
		const { educations, subjects, data, total_pages, page, cart_data } = this.state
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
				<div className="downoption">
					<SmallNavBar
						title='题型'
						data={educations}
					/>
				</div>
				<p className='about'>和<span> “语文” </span>相关试题相关试卷共<span> 20622 </span>道张</p>
				<ul>
					<li>
						<ShiTiItem
							data={{}}
							onCollect = {this.handleCollect}
							onSelect={this.handleSelect}
						/>
					</li>
					{/*
					<li key={item.id}>
						<div className="search-list-left">
							<img src={text} alt=""  className="test-pic"/>
							<div className="test-txt">
								<p className="test-txt-p1">
									<Link to={`/ShiJuanDetail/${item.id}/exam_record`} target="_blank">{item.name}</Link>
								</p>
								<p>
									<span><Icon type="clock-circle-o" />下载时间：{moment(item.created_at).format('YYYY-MM-DD')}</span>
									<span><Icon type="file-text" />学科：{item.subject}</span>
								</p>
							</div>
						</div>
						<Button icon='download' type='primary' onClick={()=>this.props.history.push(`/downloadpage/${item.id}`)}>下载</Button>
					</li>*/}
				</ul>
				{!!total_pages && <Pagination showQuickJumper style={{marginTop:50}} current={page} total={total_pages*10} onChange={this.handlePage}/> }
				<ShiTiLan
					data = {cart_data}
					onDel = {this.handleDelShiTiLan}
					onSubmit = {this.handleSubmit}
				/>
			</div>
		)
	}
}
