
import React, { Component }from 'react';
import { Pagination, Icon } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import { Link } from 'react-router-dom'

export default class Double extends Component{
	state={
	}


	componentDidMount() {

	}

	render(){

		return (
			<div className='Double contentCenter'>
				<div className="bar">
					<SmallNavBar />
					<SmallNavBar />
				</div>
				<div className="ximu-list-count clearfix">
	        <div className="order-type left">
            <span>时间</span>
            <i></i>
            <span>热门</span>
            <Link to="" className="help-enter" target="_blank"><Icon type='question-circle-o'></Icon>如何使用双向细目表组卷？</Link>
	        </div>
	        <span className="right">共计：<strong>39</strong>份</span>
	    	</div>
	    	<div className="ximu-list-wrap">
          <div className="ximu-list clearfix">
						<div className="ximu-list-inner clearfix">
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="/doubledetail/1" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
							<div className="ximu-item">
								<div className="inner">
									<h4><Link to="" className="J_ToEditXimu" title="2017年江苏省泰州市中考数学试卷">2017年江苏省泰州市中考数学试卷</Link></h4>
									<span className="used-ximu-num">使用人数：101人</span>
								</div>
							</div>
						</div>

					</div>
        </div>
        <Pagination defaultCurrent={1} total={50} />
			</div>
		)
	}
}
