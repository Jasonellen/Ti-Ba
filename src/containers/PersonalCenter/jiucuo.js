
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'

export default class Pjiucuo extends Component{
	state={
		page:1,
		per_page:10,
		data:[]
	}
	componentDidMount(){
		this.getData()
	}
	getData = ()=>{
		const { page, per_page } = this.state
		_axios.get(url.owner_correct_records,{
			page,
			per_page
		})
			.then(data=>{
				this.setState({
					data:data.records,
					total_pages:data.meta.total_pages,
				})
			})
	}
	handlePage = (page)=>{
		this.setState({page},this.getData)
	}
	render(){
		const { page, total_pages, data } = this.state
		return (
			<div className="Pjiucuo">
      	<h1>纠错记录</h1>
				<div style={{minHeight:450}}>
					<table className="table-record">
						<thead>
	          <tr>
	            <td className=" fixed-width fixed-width1">试题ID</td>
	            <td className="no-width no-width1">纠错内容</td>
	            <td className=" fixed-width fixed-width2">纠错状态</td>
	            <td className=" fixed-width fixed-width3">纠错奖励</td>
	            <td className=" fixed-width fixed-width4">操作</td>
	          </tr>
						</thead>
						<tbody>
							{
								data.length>0 && data.map(function(item){
									return (
										<tr key={item.id}>
											<td className=" fixed-width">{item.id}</td>
											<td className="no-width"><span title="123">{item.content}</span></td>
											<td className="fixed-width">
												<small>{item.status == 'padding' ? '待审中' : item.status == 'completed' ? '审核通过' : '未知' }</small>
											</td>
											<td className="fixed-width">
											......
											</td>
											<td className="fixed-width"><Link to={`/AnswerDetail/${item.id}`} target="_blank">查看试题</Link></td>
										</tr>
									)
								})
							}
						</tbody>
      	</table>
				</div>
				<div style={{marginTop:30}}>
					{!!total_pages && <Pagination current={page} total={total_pages*10} onChange={this.handlePage}/> }
				</div>
			</div>
		)
	}
}
