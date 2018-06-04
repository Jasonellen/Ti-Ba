
import React, { Component }from 'react';
import { Button, Select } from 'antd';
import './Sider.scss'
const Option = Select.Option;
// var Highcharts = require('highcharts');
// require('highcharts/modules/variable-pie')(Highcharts);

export default class Sider extends Component{
	state = {
		title_select:false,
		version_id:'',
		grade_id:''
	};
	componentDidMount(){

	}

	render(){
		const { versions=[], grades=[] } = this.props
		const { version_id, grade_id } = this.props
		return (
			<div className="Sider">
				<div className="title clearfix" onClick={()=>this.setState({title_select:!this.state.title_select})}>
					<div className="select_title left">试卷筛选</div>
					{/*<div className='right'><Icon type="caret-down"/></div>*/}
				</div>
				<div className='pan'>
					<div className="title1">教材选择</div>
					<div>
						版本:&nbsp;&nbsp;
						<Select
							style={{width:'65%'}}
							showSearch
							placeholder="选择版本"
							onChange={version_id=>this.setState({version_id})}
						>
							{
								versions.length>0 && versions.map((item)=>{
									return <Option key={item.id} value={item.id}>{item.name}</Option>
								})
							}
						</Select>
					</div>
					<div>
						年级:&nbsp;&nbsp;
						<Select
							style={{width:'65%'}}
							showSearch
							placeholder="选择年级"
							onChange={grade_id=>this.setState({grade_id})}
						>
							{
								grades.length>0 && grades.map((item)=>{
									return <Option key={item.id} value={item.id}>{item.name}</Option>
								})
							}
						</Select>
					</div>
					<Button type='primary' onClick={()=>this.props.onSubmit && this.props.onSubmit(version_id, grade_id) }>确定</Button>
				</div>
				{/*
				<div className="content">
					<Tree
						showLine
						onSelect={this.handleSelect}
					>
						<TreeNode title="parent 1" key="0-0">
							<TreeNode title="parent 1-0" key="0-0-0">
								<TreeNode title="leaf" key="0-0-0-0" />
								<TreeNode title="leaf" key="0-0-0-1" />
								<TreeNode title="leaf" key="0-0-0-2" />
							</TreeNode>
							<TreeNode title="parent 1-1" key="0-0-1">
								<TreeNode title="leaf" key="0-0-1-0" />
							</TreeNode>
							<TreeNode title="parent 1-2" key="0-0-2">
								<TreeNode title="leaf" key="0-0-2-0" />
								<TreeNode title="leaf" key="0-0-2-1" />
							</TreeNode>
						</TreeNode>
					</Tree>
					<Tree
						showLine
						onSelect={this.handleSelect}
					>
						<TreeNode title="parent 1" key="0-0">
							<TreeNode title="parent 1-0" key="0-0-0">
								<TreeNode title="leaf" key="0-0-0-0" />
								<TreeNode title="leaf" key="0-0-0-1" />
								<TreeNode title="leaf" key="0-0-0-2" />
							</TreeNode>
							<TreeNode title="parent 1-1" key="0-0-1">
								<TreeNode title="leaf" key="0-0-1-0" />
							</TreeNode>
							<TreeNode title="parent 1-2" key="0-0-2">
								<TreeNode title="leaf" key="0-0-2-0" />
								<TreeNode title="leaf" key="0-0-2-1" />
							</TreeNode>
						</TreeNode>
					</Tree>
					<Tree
						showLine
						onSelect={this.handleSelect}
					>
						<TreeNode title="parent 1" key="0-0">
							<TreeNode title="parent 1-0" key="0-0-0">
								<TreeNode title="leaf" key="0-0-0-0" />
								<TreeNode title="leaf" key="0-0-0-1" />
								<TreeNode title="leaf" key="0-0-0-2" />
							</TreeNode>
							<TreeNode title="parent 1-1" key="0-0-1">
								<TreeNode title="leaf" key="0-0-1-0" />
							</TreeNode>
							<TreeNode title="parent 1-2" key="0-0-2">
								<TreeNode title="leaf" key="0-0-2-0" />
								<TreeNode title="leaf" key="0-0-2-1" />
							</TreeNode>
						</TreeNode>
					</Tree>
				</div>*/}
			</div>
		)
	}
}
