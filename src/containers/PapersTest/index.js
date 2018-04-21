
import React, { Component }from 'react';
import {  Pagination } from 'antd';
import './index.scss'
import ZuJuanSider from '@/Components/ZuJuanSider'
import PaperItem from '@/Components/PaperItem'
import SmallNavBar from '@/Components/SmallNavBar'

export default class PapersTest extends Component{
	state = {
	};
	componentDidMount(){
		console.log(this.props,123)
	}

	render(){
		return (
			<div className='PapersTest contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						<ZuJuanSider />
					</div>
					<div className="rightSide">
						<div className="bar">
							<SmallNavBar />
							<SmallNavBar />
						</div>
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
			</div>
		)
	}
}
