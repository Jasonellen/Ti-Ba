
import React, { Component }from 'react';
import { Breadcrumb, Icon, Pagination, Checkbox, Button,Modal, Input } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
import ShiTiLan from '@/Components/ShiTiLan'
import ShiTiItem from '@/Components/ShiTiItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class ShiJuanDetail extends Component{
	state = {

	};
	componentDidMount(){
		console.log(this.props,123)
		document.body.style.background='#f5f5f5'
	}
	componentWillUnmount(){
		document.body.style.background=''
	}
	render(){
		return (
			<div className='ShiJuanDetail contentCenter'>
				<div className="warp clearfix">
					<div className="leftSide">
						<h1>2017-2018学年人教新课标高一上学期 牛顿运动定律 单元测试</h1>
						<p><Icon type="clock-circle-o" /> 修改时间：2018-01-22 &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 浏览次数：60 &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：单元试卷 </p>
						<hr/>
						<ul>
							<li><ShiTiItem header={false}/></li>
							<li><ShiTiItem header={false}/></li>
							<li><ShiTiItem header={false}/></li>
						</ul>
					</div>
					<div className="rightSide">
						<div className="top">
							<Button type="primary" icon="download" size='large' onClick={()=>this.props.changeDownloadShow(true)}>下载试卷</Button>
							<div className="clearfix">
								<div className="left" style={{cursor:'pointer'}} onClick={()=>this.props.changeAnswerSheetShow(true)}><Icon type="file-word" style={{color:'#ff9600'}}/> 答题卡下载</div>
								<Link to='/onlineTest/1' style={{color:'rgba(0, 0, 0, 0.65)'}}><div className="right"><Icon type="edit" style={{color:'#ff9600'}}/> 在线测试</div></Link>
							</div>
							<div className="clearfix">
								<div className="left"><Icon type="heart-o" style={{color:'#ff9600'}}/> 收藏试卷</div>
								<div className="right" style={{cursor:'pointer'}} onClick={()=>this.props.changeAnalyzeShow(true)}><Icon type="line-chart" style={{color:'#ff9600',cursor:'pointer'}}/> 分析试卷</div>
							</div>
						</div>
						<div className="bottom">
							<h4>相关试卷</h4>
							<ul>
								<li><Link to=''>高中物理人教版选修3选修3-2第五章第5节电能的输送</Link></li>
								<li><Link to=''>高中物理人教版选修3选修3-2第五章第5节电能的输送</Link></li>
								<li><Link to=''>高中物理人教版选修3选修3-2第五章第5节电能的输送</Link></li>
								<li><Link to=''>高中物理人教版选修3选修3-2第五章第5节电能的输送</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<ShiTiLan />
			</div>
		)
	}
}
