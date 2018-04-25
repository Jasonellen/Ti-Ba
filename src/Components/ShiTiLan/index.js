import React, { Component } from 'react'
import { Icon } from 'antd';
import './index.scss'

export default class ShiTiLan extends Component{
	constructor(){
		super()
		this.state={
			none:false,
		}
	}

	render(){
		const { data } = this.props
		let total = 0
		data.map(function(item){
			total += item.topic_ids.length
		})
		return(
			<div className={`ShiTiLan clearfix ${this.state.none && 'none'}`}>
				<div className="left" onClick={()=>this.setState({none:!this.state.none})}>
					<Icon type="folder-open" />试题篮<Icon type="shrink" style={{marginTop:70}}/>
				</div>
				<div className='right'>
					<div className="title">共计 ( <span>{total}</span> ) 道题</div>
					<ul>
						{
							data.length > 0 && data.map((item)=>{
								return (
									<li key={item.topic_type_title}>
										{item.topic_type_title}：<span>{item.topic_ids.length}</span>道&nbsp;&nbsp;&nbsp;
										<Icon
											type="close-circle-o"
											style={{cursor:'pointer'}}
											onClick={()=>this.props.onDel && this.props.onDel(item.topic_ids)}/>
									</li>
								)
							})
						}
					</ul>
					<div className="bottom" onClick={()=>this.props.onSubmit && this.props.onSubmit()}>生成试卷</div>
				</div>
			</div>
		)
	}
}
