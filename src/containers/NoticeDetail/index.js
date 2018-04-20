import React, {Component} from 'react';
import './index.scss'

export default class NoticeDetail extends Component {
	state={
		notices:[],
		data:{}
	}
	componentDidMount() {
		this.getNotices()
		this.getNoticeDetail()
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
	//获取网站公告详情页
	getNoticeDetail =()=>{
		_axios.get(url.notices+'/'+this.props.match.params.id)
			.then(data=>{
				this.setState({
					data:data.notice
				})
			})
	}
	render() {
		const { notices, data } = this.state
		return (
			<div className="NoticeDetail contentCenter clearfix" key={this.props.match.params.id}>
				<div className="notice-main left">
          <h1>{data.title}</h1>
          <div className="notice-article">
              <div dangerouslySetInnerHTML={{__html: data.content}}></div>
          </div>
      	</div>
				<div className="notice-sidebar right">
					<h2>资讯列表</h2>
					<ol>
					{
						notices.length>0 && notices.map(function(item,index){
							return <li key={item.id}><span>{index+1}、</span><a href={`/NoticeDetail/${item.id}`}>{item.title}</a></li>
						})
					}
					</ol>
				</div>
			</div>
		);
	}
}
