
import React, { Component }from 'react';
import { Icon, Pagination, Checkbox,Modal } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
import ShiTiLan from '@/Components/ShiTiLan'
import ShiTiItem from '@/Components/ShiTiItem'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as zjzujuanAction from '@/Redux/actions/zjzujuan.js';
const CheckboxGroup = Checkbox.Group;

@connect(
	state => {
		return {
			persist:state.persist,
			zjzujuan:state.zjzujuan,
		}
	},
	dispatch => bindActionCreators(zjzujuanAction, dispatch)
)

export default class XuanTi extends Component{
	state = {
		side:this.props.location.pathname,
	};
	componentDidMount(){
		this.props.history.listen((location)=>{
			this.setState({
				side:location.pathname
			})
		})

		this.props.initParamsAndSearch()
		eventEmitter.on('subjectChanged',()=>{
			this.props.initParamsAndSearch()
		});
	}

	handleSort = (key,value)=>{
		let x = value == 'asc' ? 'desc' : 'asc'
		this.props.handleOptionChange(key,x)
	}
	handleC = (x)=>{
		this.props.handleOptionChange('chapters',x)
		this.props.handleOptionChange('knowledges',[])
	}
	handleK = (x)=>{
		this.props.handleOptionChange('chapters',[])
		this.props.handleOptionChange('knowledges',x)
	}
	render(){
		const { versions, topic_types,topic_classes,levels, test_point_counts, chapter,knowledges } = this.props.persist
		const { grades, data,current_page, total_pages, total_count, created_at, mix_times } = this.props.zjzujuan
		let select_grades=[]
		grades.map(function(item){
			if(item.checked == true){
				select_grades.push(item.value)
			}
		})
		return (
			<div className='XuanTi contentCenter'>
				<div style={{background:'#f5h5h5',overflow:'hidden'}}>
					{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				</div>

				<div className="oneBar">
					<SmallNavBar
						title='教材'
						data={versions}
						onChange={(x)=>this.props.handleOptionChange('version_id',x)}
					/>
				</div>
				{/*<div className="oneBar">
					<SmallNavBar />
				</div>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						{
							this.state.side == '/XuanTi/tb'
								?
								<ZuJuanSider data={chapter} title='选择章节' onSelect={(x)=>this.handleC(x)}/>
								: <ZuJuanSider data={knowledges} title='选择知识点' onSelect={(x)=>this.handleK(x)}/>
						}
					</div>
					<div className="rightSide">
						<div className="select">
							<SmallNavBar
								title='题型'
								data={topic_types}
								onChange={(x)=>this.props.handleOptionChange('topic_type_id',x)}
								width='120px'
							/>
							<SmallNavBar
								title='难易程度'
								data={levels}
								onChange={(x)=>this.props.handleOptionChange('level',x)}
								width='120px'
							/>
							<SmallNavBar
								title='题类筛选'
								data={topic_classes}
								onChange={(x)=>this.props.handleOptionChange('topic_class_id',x)}
								width='120px'
							/>
							<SmallNavBar
								title='知识点个数'
								data={test_point_counts}
								onChange={(x)=>this.props.handleOptionChange('test_point_count',x)}
								width='120px'
							/>
							<div className='checkWarp'>
								适用年级：
								<CheckboxGroup options={grades} value={select_grades} onChange={(x)=>this.props.handleCheckGroup(x)} />
							</div>
						</div>
						<div className="selectMain">
							排序：<span onClick={()=>this.handleSort('created_at',created_at)}>时间<Icon type={ created_at ==='asc' ? "arrow-up" : 'arrow-down'} /></span>
							<span onClick={()=>this.handleSort('mix_times',mix_times)}>组卷次数<Icon type={ mix_times ==='asc' ? "arrow-up" : 'arrow-down'}/></span>
							{/*<span>去除已使用的试题</span>*/}
							{/*<span className='right active all'>选择本页全部试题</span>*/}
							<span className="right notHover">共计：{total_count}题</span>
						</div>
						<ul className="st">
							{
								data.length>0 && data.map((item)=>{
									return (
										<li key={item.id}>
											<ShiTiItem data={item} onCollect={this.props.handleCollect}/>
										</li>
									)
								})
							}
						</ul>
						{ !!total_pages && <Pagination current={current_page} total={total_pages*10} onChange={x=>this.props.handleOptionChange('current_page',x)}/> }
					</div>
				</div>
				<ShiTiLan />
			</div>
		)
	}
}
