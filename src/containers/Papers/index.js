
import React, { Component }from 'react';
import { Table, Breadcrumb, Icon, Tree, Checkbox, Pagination,Modal, Input, Radio,Button, Select } from 'antd';
import './index.scss'
import {Link} from 'react-router-dom'
import Sider from './Sider'
import Analyze from './Analyze'
import Download from './Download'
import PaperItem from '@/Components/PaperItem'
var Highcharts = require('highcharts');
require('highcharts/modules/variable-pie')(Highcharts);

export default class Papers extends Component{
	state = {
	};
	componentDidMount(){
		console.log(this.props,123)
	}

	render(){
		return (
			<div className='Papers contentCenter'>
				<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>
				<div className="warp clearfix">
					<div className="leftSide">
						<Sider />
					</div>
					<div className="rightSide">
						<ul className='ul_list'>
							<li>
								<PaperItem />
							</li>
							<li>
								<PaperItem />
							</li>
						</ul>
						<Pagination defaultCurrent={1} total={50} />
					</div>
				</div>
				{/*<Analyze />*/}
				{/*<Download />*/}
			</div>
		)
	}
}
