import React,{ Component } from 'react'
import { Icon, Pagination, Button } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default class Pdownload extends Component{
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
		_axios.get(url.owner_download_records,{
			page, per_page
		})
			.then(data=>{
				this.setState({
					data:data.records,
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
			<div className="download">
      	<h1>下载记录</h1>
				<ul className='downloadItem'>
					{
						data.length>0 && data.map((item)=>{
							return (
								<li key={item.source_id}>
									<div className="search-list-left">
										<img src={text} alt=""  className="test-pic"/>
										<div className="test-txt">
											<p className="test-txt-p1">
												<Link to={`/ShiJuanDetail/${item.source_id}/${item.source_type == 'ExamRecord'?'exam_record':'exam'}`} >{item.name}</Link>
											</p>
											<p>
												<span><Icon type="clock-circle-o" />下载时间：{moment(item.created_at).format('YYYY-MM-DD')}</span>
												<span><Icon type="file-text" />学科：{item.education_name+ item.subject_name}</span>
												{/*<span><Icon type="pay-circle-o" />扣点：<strong style={{color:'red'}}>1VIP点数</strong></span>*/}
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
