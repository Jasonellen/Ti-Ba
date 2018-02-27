
import React, { Component }from 'react';
import { Breadcrumb, Icon, Pagination, Checkbox, Card,Modal, Input } from 'antd';
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
import ShiTiLan from '@/Components/ShiTiLan'
const CheckboxGroup = Checkbox.Group;
import {Link} from 'react-router-dom'
const { TextArea } = Input;

export default class XuanTi extends Component{
	state = {
		plainOptions: ['Apple', 'Pear', 'Orange'],
		checkedList: ['Apple', 'Orange'],
		indeterminate: true,
		checkAll: true,
	};
	componentDidMount(){
		console.log(this.props,123)
	}
	onChange = (checkedList) => {
		this.setState({
			checkedList,
			checkAll: checkedList.length === this.state.plainOptions.length,
		});
	}
	onCheckAllChange = (e) => {
		this.setState({
			checkedList: e.target.checked ? this.state.plainOptions : [],
			checkAll: e.target.checked,
		});
	}
	render(){
		return (
			<div className='XuanTi contentCenter'>
				<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>
				<div className="oneBar">
					<SmallNavBar />
				</div>
				<div className="oneBar">
					<SmallNavBar />
				</div>
				<div className="warp clearfix">
					<div className="leftSide">
						<ZuJuanSider />
					</div>
					<div className="rightSide">
						<div className="select">
							<SmallNavBar />
							<SmallNavBar />
							<SmallNavBar />
							<div className='checkWarp'>
								适用年级：
								<Checkbox
									onChange={this.onCheckAllChange}
									checked={this.state.checkAll}
								>
            			Check all
								</Checkbox>
								<CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
							</div>
						</div>
						<div className="selectMain">
							排序：<span>时间<Icon type="arrow-up" /></span>
							<span>组卷次数<Icon type="arrow-down" /></span>
							<span>去除已使用的试题</span>
							<span className='right active all'>选择本页全部试题</span>
							<span className="right notHover">共计：1234题</span>
						</div>
						<ul className="st">
							<li>
								<Card
									hoverable={true}
									type="inner"
									title={<div><span>题型：填空题</span><span>题型：填空题</span><span className='noborder'>题型：填空题</span></div>}
									actions={[
										<Link to='/AnswerDetail/1' className='cardLeft' key='0' ><Icon type="eye-o" />查看答案解析</Link>,
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
									title={<div><span>题型：填空题</span><span>题型：填空题</span><span className='noborder'>题型：填空题</span></div>}
									actions={[<div  className='cardLeft' key='0' ><Icon type="eye-o" />查看答案解析</div>, <div  className='cardLeft' key='1' ><Icon type="heart-o" />收藏</div>, <div  className='cardLeft' key='2' ><Icon type="exclamation-circle-o" />纠错</div>, <div className='cardRight' key='3'>组卷次数：66次<i className='i'>+选题</i></div>]}
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

						</ul>
						<Pagination defaultCurrent={1} total={50} />
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
