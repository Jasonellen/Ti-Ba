
import React, { Component }from 'react';
import { Radio, Input, Button, Anchor,Spin, Modal,Checkbox, Affix } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Link } = Anchor;
import './index.scss'

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
export default class TestResult extends Component{
	state={
		value:'Apple',
	}


	componentDidMount() {

	}

	render(){
		const { hour,minutes,seconds,panActive,spinning,visible,loading } = this.state
		return (

				<div className='OnlineTest TestResult contentCenter'>
					<div className="left content_left">
						<h1>新人教版数学七年级上册第三章一元一次方程3.1.1 一元一次方程 课时练习</h1>
						<p className='testTitle'>
              <span>用户名：</span><i className="name">21jy_230026031</i>
              <span>测试成绩：</span><i className="grade">0</i>
            </p>
            <Affix>
            <div className="report-bar clearfix">
	            <div className="report-tab left">
                <span className="active">全部试题</span>
                <span>做错的题</span>
                <span>做对的题</span>
	            </div>
	            <div className="report-items right">
                <Checkbox>Checkbox</Checkbox>
                <Checkbox>Checkbox</Checkbox>
                <Checkbox>Checkbox</Checkbox>
	            </div>
	        	</div>
	        	</Affix>
						<section>
							<div className="title">一、单选题</div>
							<div className="title_content">
								<div className="padding_box">
									<div className="sub_title" id='s_1'>1. 在下列方程中，解是x=-1的是( )</div>
									<div className="sub_content">
										<RadioGroup options={options} value={this.state.value} />
									</div>
								</div>
								<img src="https://zujuan.21cnjy.com/images/qright.png" alt="" className="result"/>
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
												contentEditable={false}
												dangerouslySetInnerHTML={{__html: '<span>111</span>'}}
											></span>
											<img src="https://zujuan.21cnjy.com/images/qwrong.png" alt="" className="result"/>
										</div>
										<div className='edit' >
											【第一空】
											<span
												className='editipt'
												contentEditable={false}
												dangerouslySetInnerHTML={{__html: '<span>111</span>'}}
											></span>
											<img src="https://zujuan.21cnjy.com/images/qwrong.png" alt="" className="result"/>
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
										<div style={{position:'relative'}}>
											<div className="sub_sub_title">（1）列两个不同的含x的代数式表示甲班植树的株数．</div>
											<TextArea rows={6}  placeholder='请输入答案' disabled/>
											<img src="https://zujuan.21cnjy.com/images/qunknow.png" alt="" className="result"/>
										</div>
										<div style={{position:'relative'}}>
											<div className="sub_sub_title">（1）列两个不同的含x的代数式表示甲班植树的株数．</div>
											<TextArea rows={6}  placeholder='请输入答案' disabled/>
											<img src="https://zujuan.21cnjy.com/images/qunknow.png" alt="" className="result"/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div className="right">
						<div className="report-side">
							<h2>测试报告</h2>
							<div className="report-side-con">
	              <p>排名</p>
	              <h3>第2名</h3>
	              <p>
	                共有<span>2</span>人作答，
	                平均成绩<span>2</span>分
	              </p>
	            </div>
	         		<div className="report-side-con report-side-lore">
	              <p>知识点掌握</p>                             
	              <p title="三角形内角和定理">三角形内角和定理 </p>
	              <div className="lore-graspbox" title="三角形内角和定理">
	                <div className="lore-graspbg">
	                  <div className="lore-grasp" style={{width:'0%'}}>
	                  </div>
	                </div>0%
	              </div>                 
	              <p title="等腰三角形的性质">等腰三角形的性质 </p>
	              <div className="lore-graspbox" title="等腰三角形的性质">
	                <div className="lore-graspbg">
	                  <div className="lore-grasp" style={{width:'0%'}}>
	                  </div>
	                </div>0%
	              </div>
	            </div>
	          </div>
					</div>
				</div>

		)
	}
}
