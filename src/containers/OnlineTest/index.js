
import React, { Component }from 'react';
import { Radio, Input, Button, Anchor,Spin, Modal } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Link } = Anchor;
import './index.scss'

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
export default class OnlineTest extends Component{
	state={
		value:'',
		hour:'00',
		minutes:'00',
		seconds:'00',
		panActive:false,
		spinning:false,
		visible:false,
		loading:false
	}
	time = 3570
	timer = null
	onChange = (e)=>{
		console.log(e)
		this.setState({
			value: e.target.value
		});
	}
	componentDidMount() {
		// setTimeout(()=>{
		// 	console.log(window.frames.contentInput.document.getElementById('ipt').value,'======')
		// },1000)

		clearInterval(this.timer)
		this.timer = setInterval(()=>{
			this.time++
			let hour = parseInt(this.time/3600)
			let minutes = parseInt((this.time -  hour*3600)/60)
			let seconds = this.time % 60
			hour = hour > 9 ? hour : '0'+hour
			minutes = minutes > 9 ? minutes : '0'+minutes
			seconds = seconds > 9 ? seconds : '0'+seconds
			this.setState({
				hour,minutes,seconds
			})
		},1000)
	}
	handleCancel = ()=>{
		this.setState({loading:false,visible:false})
	}
	handleSubmit = ()=>{
		this.setState({loading:true},()=>{
			setTimeout(()=>{
				this.setState({loading:false,visible:false})
				this.props.history.push('/TestResult/1')
			},2000)
		})
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render(){
		const { hour,minutes,seconds,panActive,spinning,visible,loading } = this.state
		return (

				<div className='OnlineTest contentCenter'>
					<div className="left content_left">
						<h1>新人教版数学七年级上册第三章一元一次方程3.1.1 一元一次方程 课时练习</h1>
						<section>
							<div className="title">一、单选题</div>
							<div className="title_content">
								<div className="padding_box">
									<div className="sub_title" id='s_1'>1. 在下列方程中，解是x=-1的是( )</div>
									<div className="sub_content">
										<RadioGroup options={options} onChange={this.onChange} value={this.state.value} />
									</div>
								</div>
								<div className="padding_box">
									<div className="sub_title">1. 在下列方程中，解是x=-1的是( )</div>
									<div className="sub_content">
										<RadioGroup options={options} onChange={this.onChange} value={this.state.value} />
									</div>
								</div>
								<div className="padding_box">
									<div className="sub_title">1. 在下列方程中，解是x=-1的是( )</div>
									<div className="sub_content">
										<RadioGroup options={options} onChange={this.onChange} value={this.state.value} />
									</div>
								</div>
							</div>
						</section>
						<section>
							<div className="title">二、填空题</div>
							<div className="title_content">
								<div className="padding_box">
									<div className="sub_title">18. 只含有 __ 个未知数，并且未知数的次数是 __ 次的整式方程叫做一元一次方程．</div>
									<div className="sub_content">
										<div className='edit' >
											【第一空】
											<span
												className='editipt'
												contentEditable
												onFocus={()=>this.setState({panActive:true})}
												dangerouslySetInnerHTML={{__html: '<span>111</span>'}}
											></span>
										</div>
										<div className='edit' >
											【第二空】
											<span
												className='editipt'
												contentEditable
												onFocus={()=>console.log(1)}
												dangerouslySetInnerHTML={{__html: '<span>111</span>'}}
											></span>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section>
							<div className="title">三、综合题</div>
							<div className="title_content">
								<div className="padding_box">
									<div className="sub_title">23. 植树节甲班植树的株数比乙班多20%，乙班植树的株树比甲班的一半多10株，若乙班植树x株．</div>
									<div className="sub_content">
										<div>
											<div className="sub_sub_title">（1）列两个不同的含x的代数式表示甲班植树的株数．</div>
											<TextArea rows={6}  placeholder='请输入答案'/>
										</div>
										<div>
											<div className="sub_sub_title">（1）列两个不同的含x的代数式表示甲班植树的株数．</div>
											<TextArea rows={6}  placeholder='请输入答案'/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div className="right">
						<Spin tip="试卷保存中..." size='large' spinning={spinning}>
							<Anchor showInkInFixed={true}>
								<div className="content_right">
									<div className="answer-time">
										<div className="answer-hour">
									    <div>
									    	<h3>{hour}</h3>
									    	<p>小时</p>
									    </div>
									  </div>
								    <div className="answer-min">
									    <div>
										    <h3>{minutes}</h3>
										    <p>分钟</p>
									    </div>
								    </div>
								    <div className="answer-sec">
									    <div>
										    <h3>{seconds}</h3>
										    <p>秒</p>
									    </div>
								    </div>
									</div>
									<div className="answer-number"><h2>一、单选题</h2>
								    <div className="answer-num">
									    <ul>
										    <li><Link href='#s_1' title="1"></Link></li>
										    <li className="active"><Link title="2"></Link></li>
										    <li><Link title="3"></Link></li>
										    <li><Link title="4"></Link></li>
										    <li><Link title="5"></Link></li>
									    </ul>
								    </div>
								    <h2>二、填空题</h2>
								    <div className="answer-num">
									    <ul>
										    <li className="active"><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
									    </ul>
								    </div>
								    <h2>三、综合题</h2>
								    <div className="answer-num">
									    <ul>
										    <li><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
										    <li><Link title="1"></Link></li>
									    </ul>
								    </div>
								  </div>
							  </div>
							  <div className="submit">
									<Button type='primary' onClick={()=>this.setState({visible:true})}>马上提交</Button>
									<Button type='primary' onClick={()=>this.setState({spinning:true})}>暂时保存</Button>
							  </div>
						  </Anchor>
						</Spin>
					</div>
					<div className={`right_sider ${panActive && 'active'}`}>
						<iframe src="/static/iframe.html" name='contentInput' frameBorder="0" width='100%' height='100%'></iframe>
						<div className='iptBottom'>
							<Button type='primary' onClick={()=>this.setState({panActive:false})}>取消</Button>
							<Button type='primary'>确定</Button>
						</div>
					</div>

					<Modal
	          visible={visible}
	          title="完成测试"
	          onCancel={this.handleCancel}
	          footer={[<Button key="back" onClick={this.handleCancel}>取消</Button>,<Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>确定</Button>]}
		      >
	          <p>你还有 <i style={{color:'red'}}>27</i> 道题还没有完成，是否提交？</p>
	        </Modal>
				</div>

		)
	}
}
