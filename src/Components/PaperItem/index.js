import React , { Component } from 'react'
import {  Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class PaperItem extends Component{
	render(){
		return(
			<div className="PaperItem clearfix">
				<div className="left clearfix">
					<img className='left' src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2204742496,833438369&fm=27&gp=0.jpg" alt=""/>
					<div className="title right">
						<Link to='ShiJuanDetail/1'><h3>2017-2018学年人教新课标高一上学期 牛顿运动定律 单元测试牛顿运动定律 单元测试牛顿运动定律 单元测试</h3></Link>
						<p><Icon type="clock-circle-o" /> 修改时间：2018-01-22 &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 浏览次数：48 &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：单元试卷</p>
					</div>
				</div>
				<div className="right fenxi">
					{/*<span onClick={()=>this.props.changeCorrectErrorShow(true)}><Icon type="line-chart" /> 试卷分析</span>*/}<Button type='primary'>下载</Button>
				</div>

			</div>
		)
	}
}
