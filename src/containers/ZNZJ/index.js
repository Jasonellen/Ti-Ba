
import React, { Component }from 'react';
import { Icon, Tooltip, Checkbox, Card, Input, Radio,Button } from 'antd';
import './index.scss'
import ZuJuanSider from '@/Components/ZuJuanSider'
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class ZNZJ extends Component{
	state = {
		value: 1,
		plainOptions:['一年级','二年级','三年级','一年级'],
		checkedList:['一年级']
	};
	componentDidMount(){
		console.log(this.props,123)
	}
	onChange = (value)=>{
		console.log(value)
	}
	render(){
		return (
			<div className='ZNZJ contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<div className="warp clearfix">
					<div className="leftSide">
						<ZuJuanSider
							checkable
						/>
					</div>
					<div className="rightSide">
						<Card
							hoverable={true}
							type="inner"
							title='题型：填空题'
						>
    						<ul className='select clearfix'>
								<li className='left'>一年级下册 <Icon type="close-circle" /></li>
								<li className='left'>一年级下册 <Icon type="close-circle" /></li>
								<li className='left'>一年级下册 <Icon type="close-circle" /></li>
								<li className='left'>一年级下册 <Icon type="close-circle" /></li>
    							<li className='left'>一年级下册 <Icon type="close-circle" /></li>
    						</ul>
						</Card>
						<Card
							hoverable={true}
							type="inner"
							title='试卷设置'
						>
							<div style={{marginBottom:10}}>
	    					试题难度：
								<RadioGroup onChange={this.onChange} value={this.state.value}>
									<Radio value={1}>不易</Radio>
									<Radio value={2}>容易</Radio>
									<Radio value={3}>普通</Radio>
									<Radio value={4}>困难</Radio>
								</RadioGroup>
							</div>
							<div style={{marginBottom:10}}>
	    					出题方式：
								<RadioGroup onChange={this.onChange} value={this.state.value}>
									<Radio value={1}>关联出题&nbsp;
										<Tooltip placement="topRight" title="Prompt Text" arrowPointAtCenter>
											<Icon type="question-circle" />
										</Tooltip>
									</Radio>
									<Radio value={2}>精准出题&nbsp;
										<Tooltip placement="topRight" title="Prompt Text" arrowPointAtCenter>
											<Icon type="question-circle" />
										</Tooltip>
									</Radio>
								</RadioGroup>
							</div>
							<div>
								试用年级：
								<CheckboxGroup
									options={this.state.plainOptions}
									value={this.state.checkedList}
									onChange={this.onChange}
								/>
							</div>
						</Card>
						<Card
							hoverable={true}
							type="inner"
							title='题型/题量设置'
						>
							<div className="btm clearfix">
								<ul className='left'>
									<li className='clearfix'>
										<div className="left">单选题<small>999+道试题可用</small></div>
										<div className="right"><Input type="number" />道 <Icon type="delete" /></div>
									</li>
									<li className='clearfix'>
										<div className="left">单选题<small>999+道试题可用</small></div>
										<div className="right"><Input type="number" />道 <Icon type="delete" /></div>
									</li>
									<li className='clearfix'>
										<div className="left">单选题<small>999+道试题可用</small></div>
										<div className="right"><Input type="number" />道 <Icon type="delete" /></div>
									</li>
									<li className='clearfix'>
										<div className="left">单选题<small>999+道试题可用</small></div>
										<div className="right"><Input type="number" />道 <Icon type="delete" /></div>
									</li>
									<li className='clearfix'>
										<div className="left">单选题<small>999+道试题可用</small></div>
										<div className="right"><Input type="number" />道 <Icon type="delete" /></div>
									</li>
    						</ul>
								<div className="right">
									<Button type='primary'>单选题</Button>
									<Button type='primary'>单选题</Button>
									<Button type='primary'>单选题</Button>
									<Button type='primary'>单选题</Button>
									<Button type='primary'>单选题</Button>
									<Button type='primary'>单选题</Button>
								</div>
							</div>
						</Card>
						<div className="submit"><Button type='primary' size='large'>生成试卷</Button></div>

					</div>
				</div>
			</div>
		)
	}
}
