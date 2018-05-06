import React , { Component } from 'react'
import {  Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment'
import './index.scss'


export default class PaperItem extends Component{
	render(){
		const { data } = this.props || {}
		return(
			<div className="PaperItem clearfix">
				<div className="left clearfix">
					{/*<img className='left' src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2204742496,833438369&fm=27&gp=0.jpg" alt=""/>*/}
					<div className="title right">
						<Link to={`/ShiJuanDetail/${data.id}/exam`}><h3>{data.title}</h3></Link>
						<p><Icon type="clock-circle-o" /> 修改时间：{moment(data.updated_at).format('YYYY-MM-DD')} &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 下载次数：{data.download_times} &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：{data.exam_type_name}</p>
					</div>
				</div>
				<div className="right fenxi">
					{/*<span onClick={()=>this.props.changeCorrectErrorShow(true)}><Icon type="line-chart" /> 试卷分析</span>*/}<Button type='primary' onClick={()=>this.props.history.push(`/downloadpage/${data.id}/exam`)}>下载</Button>
				</div>

			</div>
		)
	}
}
