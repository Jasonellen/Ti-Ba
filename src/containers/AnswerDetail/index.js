
import React, { Component }from 'react';
import { Modal, Breadcrumb, Icon, Pagination, Checkbox, Card, Input } from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
import ShiTiLan from '@/Components/ShiTiLan'

export default class AnswerDetail extends Component{
	state = {
		confirmShow:false
	};
	componentDidMount(){
		console.log(this.props,123)
	}

	render(){
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
								<Card
									type="inner"
									title={<div><span>题型：填空题</span><span>题型：填空题</span><span className='noborder'>题型：填空题</span></div>}
									actions={[
										<div  onClick={()=>Modal.success({title: '消息提示！',content:'收藏成功'})} className='cardLeft' key='1' ><Icon type="heart-o" />收藏</div>,
										<div  onClick={()=>this.setState({confirmShow:true})} className='cardLeft' key='2' ><Icon type="exclamation-circle-o" />纠错</div>, <div className='cardRight' key='3'>组卷次数：66次<i className='i'>+选题</i></div>
									]}
								>
      						Inner Card content
									<div className="answer">
										<div className="kd clearfix">
											<div className="left _left">【考点】</div>
											<div className="left _right">xxxxx雪地里的小画家</div>
										</div>
										<div className="da clearfix">
											<div className="left _left">【答案】</div>
											<div className="left _right">
												<div>[第一空] A</div>
												<div>[第一空] A</div>
												<div>[第一空] A</div>
												<div>[第一空] A</div>
												<div>[第一空] A</div>
												<div>[第一空] A</div>
											</div>
										</div>
									</div>
								</Card>
							</li>
							<li>
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
							</li>
						</ul>
					</div>
					<div className="rightSide">
						<img src="https://zujuan.21cnjy.com//images/paper.png" alt=""/>
						<h2>相关试卷</h2>
						<ul>
							<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
							<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
							<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
							<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
							<li><Link to=''>2017-2018学年华师大版中考数学模拟试卷</Link></li>
						</ul>
					</div>
				</div>
				<Modal
					title="试题纠错"
					visible={this.state.confirmShow}
					onOk={this.handleOk}
					onCancel={()=>this.setState({confirmShow:false})}
					okText='提交'
					cancelText = '取消'
				>
					<TextArea rows={6} placeholder='请输入您遇到的错误，错误一经确认，我们会给予您一定的奖励'/>
				</Modal>
				<ShiTiLan />
			</div>
		)
	}
}
