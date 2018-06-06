
import React, { Component }from 'react';
import { Pagination, Icon, Modal } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as zjzujuanAction from '@/Redux/actions/zjzujuan.js';

@connect(
	state => {
		return {
			persist:state.persist,
			zjzujuan:state.zjzujuan,
		}
	},
	dispatch => bindActionCreators(zjzujuanAction, dispatch)
)
export default class Double extends Component{
	state={
		sort:1,
		data:[],
		project_types:[],
		tab_id:1,
		project_type_id:'',
		page:1,
		total_pages:0,
		total_count:0,
	}

	componentDidMount() {
		this.getProjecttypes()
		this.getListData()
		eventEmitter.on('subjectChanged',()=>{
			this.getProjecttypes()
			this.getListData()
		});
	}
	getProjecttypes = ()=>{
		const { education_id } = this.props.persist
		_axios.get(url.project_types,{
			education_id
		})
			.then(data=>{
				this.setState({
					project_types:data.project_types
				})
			})
	}
	getListData = ()=>{
		const { subject_id } = this.props.persist
		const { project_type_id, page, tab_id } = this.state
		const _url = tab_id == 1 ? url.projects : url.owner_projects
		_axios.get(_url,{
			subject_id,
			project_type_id,
			page,
			per_page:16
		})
			.then(data=>{
				this.setState({
					data:data.projects,
					total_pages:data.meta.total_pages,
					total_count:data.meta.total_count,
				})
			})
	}
	handleTab = (tab_id)=>{
		this.setState({tab_id,page:1},this.getListData)
	}
	//翻页
	handlePage = (page)=>{
		this.setState({page},this.getListData)
	}
	handleToDetail = (page)=>{
		const { subject_id, vips } = this.props.persist
		let is_vip = vips.find(function(item){
			return item.subject_id == subject_id
		})
		if(is_vip){
			this.props.history.push(page)
		}else{
			Modal.error({
				title: '温馨提醒',
				content: '该功能仅限VIP用户使用',
			});
		}
	}
	render(){
		const { data, total_pages, page, total_count, project_types} = this.state
		return (
			<div className='Double contentCenter'>
				<div className="bar">
					<SmallNavBar noall title='选择细目表' data={[{id:1,title:'推荐细目表'},{id:2,title:'我的细目表'},]} width='140px' onChange={this.handleTab}/>
					<SmallNavBar title='细目表类型' data={project_types} width='140px' onChange={this.handleTab}/>
				</div>
				<div className="ximu-list-count clearfix">
	        {/*<div className="order-type left">
            <span style={{color: (sort == 1) && '#ff9600'}} onClick={()=>this.setState({sort:1})}>时间</span>
            <i></i>
            <span style={{color: (sort == 2) && '#ff9600'}} onClick={()=>this.setState({sort:2})}>热门</span>
            <Link to="" className="help-enter" target="_blank"><Icon type='question-circle-o'></Icon>如何使用双向细目表组卷？</Link>
	        </div>*/}
	        <span className="right">共计：<strong>{total_count}</strong>份</span>
	    	</div>
	    	<div className="ximu-list-wrap">
          <div className="ximu-list clearfix">
						<div className="ximu-list-inner clearfix">
							{
								data.length>0 && data.map((item)=>{
									return (
										<div className="ximu-item" key={item.id}>
											<div className="inner">
												<h4 style={{cursor:'pointer'}} onClick={()=>this.handleToDetail(`/doubledetail/${item.id}`)}>{item.name}</h4>
												<span className="used-ximu-num">使用人数：{item.users_count}人</span>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
        </div>
        {!!total_pages && <Pagination showQuickJumper style={{marginTop:50}} current={page} total={total_pages*10} onChange={this.handlePage}/> }
			</div>
		)
	}
}
