
import React,{ Component } from 'react'
import { Pagination } from 'antd'
import moment from 'moment'

export default class Pdingdan extends Component{
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
		_axios.get(url.owner_orders,{
			page,
			per_page
		})
			.then(data=>{
				this.setState({
					data:data.orders,
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
			<div className="Pjiucuo Pjiucuo">
      	<h1>订单管理</h1>
				<div style={{minHeight:450}}>
					<table className="table-record">
						<thead>
							<tr>
								<td className="fixed-width1">订单号</td>
								<td className="no-width1">订单内容</td>
								<td className="fixed-width1">订单金额</td>
								<td className="fixed-width1">优惠券折扣</td>
								<td className="fixed-width1">订单状态</td>
								<td className="fixed-width1">下单时间</td>
								<td className="fixed-width1">操作</td>
							</tr>
						</thead>
						<tbody>
							{
								data.length>0 && data.map(function(item){
									return (
										<tr key={item.id}>
											<td>{item.order_no}</td>
											<td>{item.topic}</td>
											<td>￥{item.amount || 0}</td>
											<td>0元</td>
											<td>{item.aasm_state == 'pending' ? '未支付' : item.aasm_state == 'paid' ? '已支付' : item.aasm_state == 'canceled' ? '取消' : '未知'}</td>
											<td>{moment(item.created_at).format('YYYY-MM-DD')}</td>
											<td className="tab-link">-----</td>
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
