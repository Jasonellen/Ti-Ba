
import React, { Component }from 'react';
import { Breadcrumb, Icon, Pagination } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import { Link } from 'react-router-dom'

export default class Beike extends Component{
	render(){
		return (
			<div className='beike contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<SmallNavBar />
				<ul className="clearfix textContainer">
					<li className='clearfix left'>
						<Link to='/BeiKeDetail/1'>
							<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1165352806,4057071978&fm=27&gp=0.jpg" alt="" className="left"/>
							<div className="right main">
								<h3>同步跟踪训练</h3>
								<h4>2017-2018学年人教版九年级下册同步训练</h4>
								<div className="time">时间：2017-8-9</div>
								<div className='clearfix bottom'>
									<span className='left'><Icon type="download" />下载：61次</span>
									<span className='right'><Icon type="eye" />浏览量：161次</span>
								</div>
							</div>
						</Link>
					</li>
					<li className='clearfix left'>
						<Link to='/BeiKeDetail/1'>
							<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1165352806,4057071978&fm=27&gp=0.jpg" alt="" className="left"/>
							<div className="right main">
								<h3>同步跟踪训练</h3>
								<h4>2017-2018学年人教版九年级下册同步训练</h4>
								<div className="time">时间：2017-8-9</div>
								<div className='clearfix bottom'>
									<span className='left'><Icon type="download" />下载：61次</span>
									<span className='right'><Icon type="eye" />浏览量：161次</span>
								</div>
							</div>
						</Link>
					</li>
					<li className='clearfix left'>
						<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1165352806,4057071978&fm=27&gp=0.jpg" alt="" className="left"/>
						<div className="right main">
							<h3>同步跟踪训练</h3>
							<h4>2017-2018学年人教版九年级下册同步训练</h4>
							<div className="time">时间：2017-8-9</div>
							<div className='clearfix bottom'>
								<span className='left'><Icon type="download" />下载：61次</span>
								<span className='right'><Icon type="eye" />浏览量：161次</span>
							</div>
						</div>
					</li>
					<li className='clearfix left'>
						<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1165352806,4057071978&fm=27&gp=0.jpg" alt="" className="left"/>
						<div className="right main">
							<h3>同步跟踪训练</h3>
							<h4>2017-2018学年人教版九年级下册同步训练</h4>
							<div className="time">时间：2017-8-9</div>
							<div className='clearfix bottom'>
								<span className='left'><Icon type="download" />下载：61次</span>
								<span className='right'><Icon type="eye" />浏览量：161次</span>
							</div>
						</div>
					</li>
				</ul>
				<Pagination defaultCurrent={1} total={50} />
			</div>
		)
	}
}
