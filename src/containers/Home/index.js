import React, {Component} from 'react';
import { Icon } from 'antd';
import './index.scss'

export default class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			carousels:[],
			educations:[],
			features:[],
			Course:[],
			School:[],
			notices:[],
			Zujuan:{},
		}
	}
	componentDidMount() {
		this.getCarousels()
		this.getFeatures()
		this.getRecommends('School')
		this.getRecommends('Course')
		this.getNotices()
		this.getZujuanData()
	}
	//获取轮播图
	getCarousels = ()=>{
		_axios.get(url.carousels)
			.then(data=>{
				this.setState({
					carousels:data.carousels
				},this.SwiperInit)
			})
	}
	//获取网站特色
	getFeatures = ()=>{
		_axios.get(url.features,{
			limit:3
		})
			.then(data=>{
				this.setState({
					features:data.features
				})
			})
	}
	//专题推荐
	getRecommends = (type)=>{
		_axios.get(url.recommends,{
			type,
			limit:1000
		})
			.then(data=>{
				this.setState({
					[type]:data.recommends
				},()=>{
					if(type==='School')this.SchoolSwiperInit();
				})
			})
	}
	//获取网站公告
	getNotices =()=>{
		_axios.get(url.notices)
			.then(data=>{
				this.setState({
					notices:data.notices
				})
			})
	}
	//获取组卷轮播
	getZujuanData = ()=>{
		_axios.get(url.home)
			.then(data=>{
				this.setState({
					Zujuan:data.data
				},this.DataShowSwiperInit)
			})
	}
	//大图轮播
	SwiperInit = ()=>{
		new Swiper ('.swiper', {
			loop: true,
			autoplay:{
				disableOnInteraction:false
			},
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.next',
				prevEl: '.prev',
			}
		})
	}
	//数据展示Swiper
	DataShowSwiperInit = ()=>{
		new Swiper('.swiper1', {
			loop: true,
			autoplay:{
				disableOnInteraction:false
			},
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
	}
	//学校swiper
	SchoolSwiperInit=()=>{
		new Swiper('.swiper2', {
			loop: false,
			autoplay:{
				disableOnInteraction:false
			},
			slidesPerView: 5,
			spaceBetween: 30,
			pagination: {
				el: '.pagination2',
				dynamicBullets:true,
			},
		});
	}
	render() {
		const { carousels, educations, features, School,notices, Zujuan } = this.state
		return (
			<div className="Home">
				<div className="swiper-container swiper">
			    <div className="swiper-wrapper">
			    {
			    	carousels.length>0 && carousels.map(function(item){
			    		return (
									<div className="swiper-slide" key={item.id} style={{background:`url(${item.cover_data.original}) center center no-repeat rgb(17, 137, 171)`,backgroundSize:'cover'}}></div>
			    		)
			    	})
			    }
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
					{
						educations.length>0 && educations.map((item,index)=>{
							return (
								<li key={item.id} className={`left box ${index==0?'small':index==1?'middle':'height'}`}>
									<div className="title"><Icon type="schedule"/>{item.name}资源导航</div>
									<ul className='list clearfix'>
										{
											item.subjects.length>0 && item.subjects.map((iitem,i)=>{
												return <li className={`${i%2 == 0 ? 'left' : 'right'}`} key={iitem.id}>{iitem.name}:<span>试题</span>|<span>试卷</span></li>
											})
										}
									</ul>
								</li>
							)
						})
					}
				</ul>
			{/*
				<div className="moudleTitle">
					<h3>专题推荐</h3>
					<p>Thematic recommendation</p>
				</div>
				<div className="beike">
					<ul className="contentCenter clearfix">
						<li className='left'>
							{
								Course.length>0 && Course.map((item,i)=>{
									if(i<4){
										return (
											<div key={item.id} className="content">
												<div className="title">{item.category}</div>
												<div className='text'>{item.name}</div>
											</div>
										)
									}

								})
							}
						</li>
						<li className='left'>
							{
								Course.length>0 && Course.map((item,i)=>{
									if(i>=4 && i<8){
										return (
											<div key={item.id} className="content">
												<div className="title">{item.category}</div>
												<div className='text'>{item.name}</div>
											</div>
										)
									}
								})
							}
						</li>
						<li className='left'>
							{
								Course.length>0 && Course.map((item,i)=>{
									if(i>=8 && i<12){
										return (
											<div key={item.id} className="content">
												<div className="title">{item.category}</div>
												<div className='text'>{item.name}</div>
											</div>
										)
									}
								})
							}
						</li>
					</ul>
				</div>
				*/}
				<div className="moudleTitle">
					<h3>数据展示</h3>
					<p>Data display</p>
				</div>
				<div className="contentCenter">
					<div className="swiper-container swiper1">
				    <div className="swiper-wrapper">
				      <div className="swiper-slide">
								<div className="content">
									<h2>试题库</h2>
									<small>试题总量</small>
									<p>{Zujuan.all_exams_count}</p>
									<small>今日组卷数量：{Zujuan.today_exams_count}份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>试卷库</h2>
									<small>试卷总量</small>
									<p>{Zujuan.all_topics_count}</p>
									<small>今日组卷数量：{Zujuan.today_topics_count}份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>智能组卷</h2>
									<small>组卷总量</small>
									<p>{Zujuan.all_exam_records_count}</p>
									<small>今日组卷数量：{Zujuan.today_exam_records_count}份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>在线测试</h2>
									<small>测试总量</small>
									<p>{Zujuan.all_test_records_count}</p>
									<small>今日组卷数量：{Zujuan.today_test_records_count}份</small>
								</div>
				      </div>
							<div className="swiper-slide">
								<div className="content">
									<h2>合作学校</h2>
									<small>学校总量</small>
									<p>{Zujuan.all_schools_count}</p>
									<small>今日组卷数量：{Zujuan.today_schools_count}份</small>
								</div>
				      </div>
				    </div>
				    <div className="swiper-pagination pagination1"></div>
						<div className="swiper-button-next next1"></div>
						<div className="swiper-button-prev prev1"></div>
				  </div>
				</div>
				<div className="moudleTitle">
					<h3>网站公告</h3>
					<p>Website Bulletin</p>
				</div>
				<div className="beike bulletin">
					<ul className="contentCenter clearfix">
					{
						notices.length>0 && notices.map(function(item,index){
							return (
								<li className='left' key={item.id} onClick={()=>_history.push('/NoticeDetail/'+item.id)}>
									<h1>{index+1}&bull;</h1>
									<h2>{item.title}</h2>
									<div>阅读更多</div>
								</li>
							)
						})
					}
					</ul>
					{/*<Icon type="double-right"/>*/}
				</div>
				<div className="moudleTitle">
					<h3>网站特色</h3>
					<p>Site characteristics</p>
				</div>
				<div className="beike site">
					<ul className="contentCenter clearfix">
						{
							features.length>0 && features.map((item)=>{
								return (
									<li key={item.id} className='left'>
										<img src={item.avatar_data.original} alt=""/>
										<h2>{item.title}</h2>
										<p>
											{
												item.tags.split(',').map((iitem, i)=>{
													return <span key={i}>{iitem}</span>
												})
											}
										</p>
									</li>
								)
							})
						}
					</ul>
				</div>
				<div className="moudleTitle">
					<h3>校园合作</h3>
					<p>Cooperation colleges and Universities</p>
				</div>
				<div className="beike school">
					<div className="contentCenter">
						<div className="swiper-container swiper2">
					    <div className="swiper-wrapper">
					    {
					    	School.length>0 && School.map(function(item){
					    		return (
										<div className="swiper-slide" key={item.id}>
											<div className="content">
												<img src={item.cover_data.original} alt=""/>
												<div className="text">{item.name}</div>
											</div>
							      </div>
					    		)
					    	})
					    }
					    {
					    	School.length>0 && School.map(function(item){
					    		return (
										<div className="swiper-slide" key={item.id}>
											<div className="content">
												<img src={item.cover_data.original} alt=""/>
												<div className="text">{item.name}</div>
											</div>
							      </div>
					    		)
					    	})
					    }
					    </div>
					    <div className="swiper-pagination pagination2"></div>
					  </div>
					</div>
				</div>
			</div>
		);
	}
}
