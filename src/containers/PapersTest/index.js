
import React, { Component }from 'react';
import {  Pagination } from 'antd';
import './index.scss'
import ZuJuanSider from '@/Components/ZuJuanSider'
import PaperItem from '@/Components/PaperItem'
import SmallNavBar from '@/Components/SmallNavBar'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null
)
export default class PapersTest extends Component{
	state = {
		exam_types:[],
		area:[],
		data:[],
		page:1,
		per_page:10,
		total_pages:0,
		grade_id:'',
		region_id:'',
		exam_type_id:''
	};
	componentDidMount(){
		this.getExamTypes()
		this.getArea()
		this.getData()
		eventEmitter.on('subjectChanged',()=>{
			this.getData()
		});
	}
	getData = ()=>{
		const { education_id, subject_id } = this.props.persist
		const { grade_id, region_id, page, per_page, exam_type_id } = this.state
		_axios.post(url.exams,{
			education_id,
			subject_id,
			grade_id,
			region_id,
			page,
			per_page,
			exam_class:'test',
			exam_type_id
		})
			.then(data=>{
				this.setState({
					data:data.exams,
					total_pages:data.meta.total_pages,
				})
			})
	}
	getExamTypes = ()=>{
		const { education_id } = this.props.persist
		_axios.get(url.exam_types,{
			exam_class:'test',
			educations_id:education_id
		})
			.then(data=>{
				let newData = data.data
				newData.map(function(item){
					if(!item.children){
						item.children = [];
					}
					item.id = item.value
					item.name = item.label
				})
				this.setState({exam_types:[{id:'',name:'全部',children:[]}].concat(newData)})
			})
	}
	getArea = ()=>{
		_axios.get(url.regions)
			.then(data=>{
				let newData = data.data
				newData.map(function(item){
					item.id = item.value
					item.name = item.label
				})
				this.setState({
					area:newData
				})
			})
	}
	//翻页
	handlePage = (page)=>{
		this.setState({page},this.getData)
	}
	handleGrade = (grade_id)=>{
		this.setState({
			grade_id
		},this.getData)
	}
	handleRegion = (region_id)=>{
		this.setState({
			region_id
		},this.getData)
	}
	handleTypesSelect = (x)=>{
		let exam_type_id = x[0] == '-'? '' : x[0]
		this.setState({exam_type_id},this.getData)
	}
	render(){
		const { exam_types, area, page, data, total_pages } = this.state
		const { grades } = this.props.persist
		return (
			<div className='PapersTest contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						<ZuJuanSider data={exam_types} onSelect={this.handleTypesSelect}/>
					</div>
					<div className="rightSide">
						<div className="bar">
							<SmallNavBar title='适用年级' data={grades} width='120px' onChange={this.handleGrade}/>
							<SmallNavBar title='适用地区' data={area} width='120px' onChange={this.handleRegion}/>
						</div>
						{
							data.length> 0 && (
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
