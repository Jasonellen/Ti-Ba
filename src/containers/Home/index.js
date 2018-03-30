import React, {Component} from 'react';
import { Modal, Icon } from 'antd';
import { Link } from 'react-router-dom'
import './index.scss'

export default class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			carousels:[],
			educations:[],
			features:[],
			recommends:[]
		}
	}
	componentDidMount() {
		this.getEducations()
		this.getCarousels()
		this.getFeatures()
		this.getRecommends()
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
		setTimeout(function(){
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

			new Swiper('.swiper2', {
				loop: true,
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
		},500)
	}
	//获取轮播图
	getCarousels = ()=>{
		axios.get(url.carousels)
			.then(data=>{
				if(data.data.msg.status === 'success'){
					this.setState({
						carousels:data.data.carousels
					})
				}
			})
	}
	//课程列表
	getEducations=()=>{
		axios.get(url.educations)
			.then(({data})=>{
				if(data.msg.status === 'success'){
					this.setState({
						educations:data.educations
					})
				}
			})
	}
	//获取网站特色
	getFeatures = ()=>{
		axios.get(url.features,{
			params:{
				limit:3
			}
		})
			.then(({data})=>{
				if(data.msg.status === 'success'){
					this.setState({
						features:data.features
					})
				}
			})
	}
	//专题推荐
	getRecommends = ()=>{
		axios.get(url.recommends)
			.then(({data})=>{
				if(data.msg.status === 'success'){
					this.setState({
						recommends:data.recommends
					})
				}
			})
	}
	render() {
		const { carousels, educations, features, recommends } = this.state
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
				<div className="moudleTitle">
					<h3>专题推荐</h3>
					<p>Thematic recommendation</p>
				</div>
				<div className="beike">
					<ul className="contentCenter clearfix">
						<li className='left'>
							{
								recommends.length>0 && recommends.map((item,i)=>{
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
								recommends.length>0 && recommends.map((item,i)=>{
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
								recommends.length>0 && recommends.map((item,i)=>{
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
				<div className="moudleTitle">
					<h3>数据展示</h3>
					<p>Data display</p>
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
					<h3>网站公告</h3>
					<p>Website Bulletin</p>
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
													return <Link key={i} to=''><span>{iitem}</span></Link>
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
					      <div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">xx中学</div>
									</div>
					      </div>
								<div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">xx中学</div>
									</div>
					      </div>
								<div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">xx中学</div>
									</div>
					      </div>
								<div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">傻逼中学</div>
									</div>
					      </div>
								<div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">傻逼中学</div>
									</div>
					      </div>
								<div className="swiper-slide">
									<div className="content">
										<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3375177454,1868030626&fm=27&gp=0.jpg" alt=""/>
										<div className="text">傻逼中学</div>
									</div>
					      </div>
					    </div>
					    <div className="swiper-pagination pagination2"></div>
					  </div>
					</div>
				</div>
			</div>
		);
	}
}
