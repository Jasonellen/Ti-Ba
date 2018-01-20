import React, {Component} from 'react';
import { Button, Pagination, Modal, Icon } from 'antd';
import './index.scss'
import About from '~/About'
import {
	Route,
	Link,
} from 'react-router-dom'
import smallSchool from 'static/smallSchool.png'
import middleSchool from 'static/middleSchool.png'
import heightSchool from 'static/heightSchool.png'

export default class Home extends Component {
	constructor(props){
		super(props)
		this.state={

		}
	}
	componentDidMount() {
		new Swiper ('.swiper', {
			loop: true,
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.next',
				prevEl: '.prev',
			}
		})
		setTimeout(function(){
			new Swiper('.swiper1', {
				loop: true,
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows : true,
				},
				navigation: {
					nextEl: '.next1',
					prevEl: '.prev1',
				},
			});
		},500)

	}
	render() {
		return (
			<div className="Home">
				<div className="swiper-container swiper">
			    <div className="swiper-wrapper">
						<div className="swiper-slide"></div>
						<div className="swiper-slide"></div>
			      <div className="swiper-slide"></div>
			    </div>
			    <div className="swiper-pagination"></div>
					<div className="swiper-button-prev prev"></div>
					<div className="swiper-button-next next"></div>
				</div>
				<div className="moudleTitle">
					<h3>课程导航</h3>
					<p>Course navigation</p>
				</div>
				<ul className="CourseNavi clearfix">
					<li className='left box small'>
						<div className="title"><Icon type="schedule"/>小学资源导航</div>
						<ul className='list clearfix'>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='right'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
						</ul>
					</li>
					<li className='left box middle'>
						<div className="title"><Icon type="schedule"/>小学资源导航</div>
						<ul className='list clearfix'>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='right'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
						</ul>
					</li>
					<li className='left box height'>
						<div className="title"><Icon type="schedule"/>小学资源导航</div>
						<ul className='list clearfix'>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='right'>小学语文:<span>试题</span>|<span>试卷</span></li>
							<li className='left'>小学语文:<span>试题</span>|<span>试卷</span></li>
						</ul>
					</li>
				</ul>
				<div className="moudleTitle">
					<h3>课程导航</h3>
					<p>Course navigation</p>
				</div>
				<div className="beike">
					<ul className="contentCenter clearfix">
						<li className='left'>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
						</li>
						<li className='left'>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
						</li>
						<li className='left'>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
							<div className="content">
								<div className="title">同步跟踪训练</div>
								<div className='text'>你这么好看，说什么的偶对</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="moudleTitle">
					<h3>课程导航</h3>
					<p>Course navigation</p>
				</div>
				<div className="contentCenter">
					<div className="swiper-container swiper1">
				    <div className="swiper-wrapper">
				      <div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>354168</p>
									<small>今日组卷数量：3980份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>354168</p>
									<small>今日组卷数量：3980份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>354168</p>
									<small>今日组卷数量：3980份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>354168</p>
									<small>今日组卷数量：3980份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>354168</p>
									<small>今日组卷数量：3980份</small>
								</div>
				      </div>
				    </div>
				    <div className="swiper-pagination pagination1"></div>
						<div className="swiper-button-next next1"></div>
						<div className="swiper-button-prev prev1"></div>
				  </div>
				</div>
				<div className="moudleTitle">
					<h3>课程导航</h3>
					<p>Course navigation</p>
				</div>
				<div className="beike bulletin">
					<ul className="contentCenter clearfix">
						<li className='left'>
							<h1>01&bull;</h1>
							<h2>组卷编辑页面</h2>
							<p>组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面</p>
							<div>阅读更多</div>
						</li>
						<li className='left'>
							<h1>01&bull;</h1>
							<h2>组卷编辑页面</h2>
							<p>组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面</p>
							<div>阅读更多</div>
						</li>
						<li className='left'>
							<h1>01&bull;</h1>
							<h2>组卷编辑页面</h2>
							<p>组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面</p>
							<div>阅读更多</div>
						</li>
					</ul>
					<Icon type="double-right"/>
					<p>组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面组卷编辑页面</p>
				</div>
			</div>
		);
	}
}
