import React,{ Component } from 'react'
import { Icon, Button } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'

export default class Pshijuan extends Component{
	state={

	}

	render(){
		return (
			<div className="download">
      	<h1>试卷收藏</h1>
				<ul className='downloadItem'>
					<li>
						<div className="search-list-left">
							<img src={text} alt=""  className="test-pic"/>
							<div className="test-txt">
								<p className="test-txt-p1">
									<Link to='/ShiJuanDetail/1' target="_blank">2018年4月15日小学语文试卷</Link>
								</p>
								<p>
									<span><Icon type="clock-circle-o" />作者：xxx</span>
									<span><Icon type="file-text" />学科：小学语文</span>
									<span><Icon type="pay-circle-o" />试卷类型：<strong>同步测试</strong></span>
								</p>
							</div>
						</div>
						<Button icon='download' type='primary'>下载</Button>
					</li>
				</ul>
			</div>
		)
	}
}
