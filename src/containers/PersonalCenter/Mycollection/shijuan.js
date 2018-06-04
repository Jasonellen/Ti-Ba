import React,{ Component } from 'react'
import { Icon, Button, Pagination } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'

export default class Pshijuan extends Component{
	state={
		page:1,
		per_page:10,
		data:[]
	}
	componentDidMount() {
		this.getList()
	}
	getList = ()=>{
		const { page, per_page } = this.state
		_axios.get(url.owner_star_exams,{
			page, per_page
		})
			.then(data=>{
				this.setState({
					data:data.exams,
					total_pages:data.meta.total_pages,
				})
			})
	}
	handlePage = (page)=>{
		this.setState({page},this.getList)
	}
	render(){
		const { data, page, total_pages } = this.state
		return (
			<div className="download">
      	<h1>试卷收藏</h1>
				<ul className='downloadItem'>
					{
						data.length>0 && data.map((item)=>{
							return (
								<li key={item.id}>
									<div className="search-list-left">
										<img src={text} alt=""  className="test-pic"/>
										<div className="test-txt">
											<p className="test-txt-p1">
												<Link to={`/ShiJuanDetail/${item.id}/exam`} target="_blank">{item.title}</Link>
											</p>
											<p>
												{item.user_name && <span><Icon type="clock-circle-o" />作者：{item.user_name}</span> }
												<span><Icon type="file-text" />学科：{item.education_name+item.subject_name}</span>
												<span><Icon type="pay-circle-o" />试卷类型：<strong>{item.exam_type_name}</strong></span>
											</p>
										</div>
									</div>
									<Button icon='download' type='primary' onClick={()=>this.props.history.push(`/downloadpage/${item.id}/exam`)}>下载</Button>
								</li>
							)
						})
					}

				</ul>
				{!!total_pages && <Pagination current={page} total={total_pages*10} onChange={this.handlePage}/> }
			</div>
		)
	}
}
