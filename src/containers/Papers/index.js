
import React, { Component }from 'react';
import { Pagination } from 'antd';
import './index.scss'
import Sider from './Sider'
import PaperItem from '@/Components/PaperItem'
import {connect} from 'react-redux';
// var Highcharts = require('highcharts');
// require('highcharts/modules/variable-pie')(Highcharts);

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null
)
export default class Papers extends Component{
	state = {
		version_id:'',
		grade_id:'',
		page:1,
		per_page:10,
		total_pages:0,
		data:[],
	};
	componentDidMount(){
		this.getData()

		eventEmitter.on('subjectChanged',()=>{
			this.getData()
		});
	}
	getData = ()=>{
		const { education_id, subject_id, exam_class } = this.props.persist
		const { version_id, grade_id, page, per_page } = this.state
		_axios.post(url.exams,{
			education_id,
			subject_id,
			grade_id,
			version_id,
			exam_class,
			page,
			per_page,
		})
			.then(data=>{
				this.setState({
					data:data.exams,
					total_pages:data.meta.total_pages,
				})
			})
	}
	handleSideChange = (version_id, grade_id)=>{
		this.setState({
			version_id,grade_id
		},this.getData)
	}
	//翻页
	handlePage = (page)=>{
		this.setState({page},this.getData)
	}
	render(){
		const { grades, versions } = this.props.persist
		const { page, data, total_pages } = this.state
		return (
			<div className='Papers contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						<Sider 
							versions = { versions }
							grades = { grades }
							onSubmit = { this.handleSideChange }
						/>
					</div>
					<div className="rightSide">
						{
							data.length>0 && (
								<ul className='ul_list'>
								{
									data.map((item)=>{
										return <li key={item.id}><PaperItem data={item}/></li>
									})
								}
								</ul>
							)
						}
						{!!total_pages && <Pagination showQuickJumper style={{marginTop:50}} current={page} total={total_pages*10} onChange={this.handlePage}/> }
					</div>
				</div>
			</div>
		)
	}
}
