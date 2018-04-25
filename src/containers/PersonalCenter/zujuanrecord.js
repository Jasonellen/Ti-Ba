
import React,{ Component } from 'react'
import { Icon, Pagination, Button } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class Pzujuanrecord extends Component{

	state={
		page:1,
		per_page:10,
		data:[],
		total_pages:0
	}
	componentDidMount(){
		this.getList()
	}
	getList = ()=>{
		const { page, per_page } = this.state
		_axios.get(url.owner_exam_records,{
			page, per_page
		})
			.then(data=>{
				this.setState({
					data:data.data,
					total_pages:data.meta.total_pages,
				})
			})
	}
	handlePage = (page)=>{
		this.setState({page},this.getList)
	}
	render(){
		const { data, total_pages, page } = this.state
		return (
      <div className="download zujuanrecord">
      	<h1>组卷记录</h1>
				<ul className='downloadItem'>
				{
					data.length>0 && data.map((item)=>{
						return (
							<li key={item.id}>
								<div className="search-list-left">
									<img src={text} alt=""  className="test-pic"/>
									<div className="test-txt">
										<p className="test-txt-p1">
											<Link to={`/ShiJuanDetail/${item.id}`} target="_blank">{item.name}</Link>
										</p>
										<p>
											<span><Icon type="clock-circle-o" />下载时间：{moment(item.created_at).format('YYYY-MM-DD')}</span>
											<span><Icon type="file-text" />学科：{item.subject}</span>
										</p>
									</div>
								</div>
								<Button icon='download' type='primary' onClick={()=>this.props.history.push(`/downloadpage/${item.source_id}`)}>下载</Button>
							</li>
						)
					})
				}
				</ul>
				{!!total_pages && <Pagination current={page} style={{marginTop:50}} total={total_pages*10} onChange={this.handlePage}/> }
      </div>
		)
	}
}

