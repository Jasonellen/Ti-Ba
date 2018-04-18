
import React, { Component }from 'react';
import { Breadcrumb, Icon, Pagination, Checkbox, Card,Modal, Input } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
import ShiTiLan from '@/Components/ShiTiLan'
import ShiTiItem from '@/Components/ShiTiItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as zjzujuanAction from '@/Redux/actions/zjzujuan.js';
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

@connect(
	state => { 
		return {
			persist:state.persist,
		}
	},
	dispatch => bindActionCreators(zjzujuanAction, dispatch)
)

export default class XuanTi extends Component{
	state = {

	};
	componentDidMount(){
		this.props.initParamsAndSearch()
		eventEmitter.on('subjectChanged',()=>{
			this.props.initParamsAndSearch()
		});
	}
	onChange = (checkedList) => {
		
	}

	render(){
		const { versions, topic_types,topic_classes,levels, test_point_counts, grades, chapter } = this.props.persist
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
						onChange={(x)=>alert(x)}
					/>
				</div>
				{/*<div className="oneBar">
					<SmallNavBar />
				</div>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						<ZuJuanSider data={chapter} title='选择章节'/>
					</div>
					<div className="rightSide">
						<div className="select">
							<SmallNavBar
								title='题型'
								data={topic_types}
								onChange={(x)=>alert(x)}
								width='120px'
							/>
							<SmallNavBar
								title='难易程度'
								data={levels}
								onChange={(x)=>alert(x)}
								width='120px'
							/>
							<SmallNavBar
								title='题类筛选'
								data={topic_classes}
								onChange={(x)=>alert(x)}
								width='120px'
							/>
							<SmallNavBar
								title='知识点个数'
								data={test_point_counts}
								onChange={(x)=>alert(x)}
								width='120px'
							/>
							<div className='checkWarp'>
								适用年级：
								<CheckboxGroup options={grades} value={select_grades} onChange={this.onChange} />
							</div>
						</div>
						<div className="selectMain">
							排序：<span>时间<Icon type="arrow-up" /></span>
							<span>组卷次数<Icon type="arrow-down" /></span>
							{/*<span>去除已使用的试题</span>*/}
							<span className='right active all'>选择本页全部试题</span>
							<span className="right notHover">共计：1234题</span>
						</div>
						<ul className="st">
							<li>
								<ShiTiItem />
							</li>
						</ul>
						<Pagination defaultCurrent={1} total={50} />
					</div>
				</div>
				<ShiTiLan />
			</div>
		)
	}
}
