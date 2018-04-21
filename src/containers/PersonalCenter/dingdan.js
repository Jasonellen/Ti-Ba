
import React,{ Component } from 'react'

export default class Pdingdan extends Component{
	state={
		page:1,
		per_page:10
	}
	componentDidMount(){
		const { page, per_page } = this.state
		_axios.get(url.owner_orders,{
			page,
			per_page
		})
			
	}
	render(){
		return (
			<div className="Pjiucuo Pjiucuo">
      	<h1>订单管理</h1>
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
						<tr>
							<td>1521366425-40226</td>
							<td>小学语文在线组卷VIP，一个月</td>
							<td>￥16</td>
							<td>0元</td>
							<td>已支付</td>
							<td>2018-03-18</td>
							<td className="tab-link">-----</td>
		    		</tr>
					</tbody>
      	</table>
			</div>
		)
	}
}
