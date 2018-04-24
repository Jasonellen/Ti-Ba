
import React, { Component }from 'react';
import { Card, Modal } from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'
import ShiTiItem from '@/Components/ShiTiItem'
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
export default class AnswerDetail extends Component{
	state = {
		confirmShow:false,
		data:{
			remark:{},
			relation_exams:[]
		}
	};
	componentDidMount(){
		this.getData()
	}
	getData = ()=>{
		_axios.get(url.topics+'/'+this.props.match.params.id)
			.then(data=>{
				this.setState({
					data:data.data
				})
			})
	}
	handleCollect = (id,star) =>{
		let method = star ? 'delete' : 'post'
		let _url = star ? url.action_stores+'/'+id : url.action_stores
		let msg = star ? '取消收藏成功！' : '收藏成功！'
		_axios[method](_url,{
			action_type:'star',
			target_type:'topic',
			id,
		})
			.then(()=>{
				this.getData()
				Modal.success({
				 	title: '消息提醒',
	    		content: msg,
				});
			})
	}

	render(){
		const { data } = this.state
		return (
			<div className='AnswerDetail contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}

				<div className="warp clearfix">

					<div className="leftSide">
						<ul className="st">
							<li>
								<ShiTiItem 
									data={data} 
									open 
									noselect 
									nodetail
									onCollect = {this.handleCollect}
								/>
							</li>
							{/*<li>
								<Card
									type="inner"
									title={<div><span>举一反三</span></div>}
								>
									<ul className='jyfs'>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
										<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
									</ul>
								</Card>
							</li>*/}
						</ul>
					</div>
					<div className="rightSide">
						<img src="https://zujuan.21cnjy.com//images/paper.png" alt=""/>
						<h2>相关试卷</h2>
						<ul>
						{
							data.relation_exams.length>0 && data.relation_exams.map((item)=>{
								return <li key={item.id}><Link to=''>{item.title}</Link></li>
							})
						}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
