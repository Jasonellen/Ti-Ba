
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

export default class Pjiucuo extends Component{
	state={

	}
	render(){
		return (
      <div className="Pjiucuo">
      	<h1>纠错记录</h1>
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
						<tr>
							<td className=" fixed-width">5815747</td>
							<td className="no-width"><span title="123">123</span></td>
							<td className="fixed-width">
								<small>待审中</small>
							</td>
							<td className="fixed-width">
								......
							</td>
							<td className="fixed-width"><Link to='/shijuandetail/1' target="_blank">查看试题</Link></td>
						</tr>
					</tbody>
      	</table>
      </div>
		)
	}
}

