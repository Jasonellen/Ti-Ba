
import React, { Component }from 'react';
import { Icon, Tree,Button, Select } from 'antd';
import './Sider.scss'
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
var Highcharts = require('highcharts');
require('highcharts/modules/variable-pie')(Highcharts);

export default class Sider extends Component{
	state = {
		title_select:false,
	};
	componentDidMount(){

	}

	render(){
		const { title_select } = this.state
		return (
			<div className="Sider">
				<div className="title clearfix" onClick={()=>this.setState({title_select:!this.state.title_select})}>
					<div className="select_title left">选择章节</div>
					<div className='right'><Icon type="caret-down"/></div>
				</div>
				<div className={`pan ${!title_select && 'hide'} `}>
					<div className="title1">教材选择</div>
					<div>
						版本:&nbsp;&nbsp;
						<Select
							style={{width:'65%'}}
							showSearch
							placeholder="Select a person"
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</div>
					<div>
						年级:&nbsp;&nbsp;
						<Select
							style={{width:'65%'}}
							showSearch
							placeholder="Select a person"
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</div>
					<Button type='primary'>确定</Button>
				</div>
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
				</div>
			</div>
		)
	}
}
