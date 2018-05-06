
import React, { Component }from 'react';
import { Icon, Pagination } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import moment from 'moment'

@connect(
	state => state.persist,
	null
)
export default class Beike extends Component{
	state={
		page:1,
		per_page:10,
		total_pages:0,
		course_category_id:'',
		data:[]
	}
	componentDidMount(){
		this.getCourseCategories()
		eventEmitter.on('subjectChanged',()=>{
			this.getCourseCategories()
		});
	}
	getCourseCategories = ()=>{
		const { education_id } = this.props
		_axios.get(url.course_categories,{
			education_id
		})
			.then(data=>{
				this.setState({categories:data.categories},this.getData)
			})
	}
	handleChange = (course_category_id)=>{
		this.setState({
			course_category_id
		},this.getData)
	}
	getData = ()=>{
		const { subject_id } = this.props
		const { course_category_id, page, per_page } = this.state
		_axios.get(url.courses,{
			subject_id,
			course_category_id,
			page,
			per_page
		})
			.then(data=>{
				this.setState({
					data:data.courses,
					total_pages:data.meta.total_pages,
				})
			})
	}
	//翻页
	handlePage = (page)=>{
		this.setState({page},this.getData)
	}
	render(){
		const { data, categories, total_pages, page } = this.state
		return (
			<div className='beike contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<SmallNavBar data={categories} title='类型' onChange={this.handleChange}/>
				<ul className="clearfix textContainer">
					{
						data.length>0 && data.map((item)=>{
							return (
								<li className='clearfix left' key={item.id}>
									<Link to={`/BeiKeDetail/${item.id}`}>
										<img src={item.cover_data.original} alt="" className="left"/>
										<div className="right main">
											<h3>{item.course_category_name}</h3>
											<h4>{item.name}</h4>
											<div className="time">时间：{moment(item.updated_at).format('YYYY-MM-DD')}</div>
											<div className='clearfix bottom'>
												<span className='left'><Icon type="download" />下载：{item.downloads_count}次</span>
												<span className='right'><Icon type="eye" />浏览量：{item.views_count}次</span>
											</div>
										</div>
									</Link>
								</li>
							)
						})
					}
				</ul>
				{!!total_pages && <Pagination showQuickJumper style={{marginTop:50}} current={page} total={total_pages*10} onChange={this.handlePage}/> }
			</div>
		)
	}
}
