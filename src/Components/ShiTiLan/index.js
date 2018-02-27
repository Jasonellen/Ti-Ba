import React, { Component } from 'react'
import { Icon } from 'antd';
import './index.scss'

export default class ShiTiLan extends Component{
	constructor(){
		super()
		this.state={
			none:false
		}
	}
	render(){
		return(
			<div className={`ShiTiLan clearfix ${this.state.none && 'none'}`}>
				<div className="left" onClick={()=>this.setState({none:!this.state.none})}>
					{/*<Icon type="folder" />*/}<Icon type="folder-open" />试题篮
				</div>
				<div className='right'>
					<div className="title">共计 ( <span>2</span> ) 道题</div>
					<ul>
						<li>天空题：<span>2</span>道&nbsp;&nbsp;&nbsp;<Icon type="close-circle-o" /></li>
						<li>计算题：<span>2</span>道&nbsp;&nbsp;&nbsp;<Icon type="close-circle-o" /></li>
						<li>解答题：<span>2</span>道&nbsp;&nbsp;&nbsp;<Icon type="close-circle-o" /></li>
					</ul>
					<div className="bottom">生成试卷</div>
				</div>
			</div>
		)
	}
}
