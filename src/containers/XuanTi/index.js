
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
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null
)

export default class XuanTi extends Component{
	state = {
		plainOptions: ['Apple', 'Pear', 'Orange'],
		checkedList: ['Apple', 'Orange'],
		indeterminate: true,
		checkAll: true,
	};
	componentDidMount(){
		console.log(this.props,123)
	}
	onChange = (checkedList) => {
		this.setState({
			checkedList,
			checkAll: checkedList.length === this.state.plainOptions.length,
		});
	}
	onCheckAllChange = (e) => {
		this.setState({
			checkedList: e.target.checked ? this.state.plainOptions : [],
			checkAll: e.target.checked,
		});
	}
	render(){
		const { versions, topic_types } = this.props.persist
		console.log(topic_types,3333)
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
						<ZuJuanSider />
					</div>
					<div className="rightSide">
						<div className="select">
							<SmallNavBar 
								title='题型'
								data={topic_types} 
								onChange={(x)=>alert(x)}
								width='120px'
							/>
							<SmallNavBar />
							<SmallNavBar />
							<div className='checkWarp'>
								适用年级：
								<Checkbox
									onChange={this.onCheckAllChange}
									checked={this.state.checkAll}
								>
            			Check all
								</Checkbox>
								<CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
							</div>
						</div>
						<div className="selectMain">
							排序：<span>时间<Icon type="arrow-up" /></span>
							<span>组卷次数<Icon type="arrow-down" /></span>
							<span>去除已使用的试题</span>
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
