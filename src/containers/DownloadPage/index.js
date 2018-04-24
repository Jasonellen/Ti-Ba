
import React, { Component }from 'react';
import { Modal, Button, Radio,Checkbox, Anchor, InputNumber } from 'antd';
import './index.scss'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Link } = Anchor;
import axios from 'axios'

let img="data:image/jpeg;base64,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"
function dataURItoBlob (base64Data) {
	var byteString;
	if (base64Data.split(',')[0].indexOf('base64') >= 0){
		byteString = atob(base64Data.split(',')[1]);
	}else{
		byteString = unescape(base64Data.split(',')[1]);
	}	
	var type = base64Data.split(',')[0].split(':')[1].split(';')[0];
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	// canvas.toDataURL 返回的默认格式是 image/png
	return new Blob([ia], {type: type});
}

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class DownloadPage extends Component{
	state={
		contentEditable:false,
		plainOptions:[
			{ label: '密封线', value: '1', },
			{ label: '大题评分区', value: '2' },
			{ label: '主标题', value: '3' },
			{ label: '注意事项', value: '4' },
			// { label: '副标题', value: '5' },
			{ label: '考试时间', value: '6' },
			{ label: '考生填写', value: '7' },
			{ label: '分大题', value: '8' },
			{ label: '总评分', value: '9' },
			{ label: '大题注释', value: '10' },
		],
		CheckedList:['3', '8','10'],
		redioCheck:JSON.stringify(['3', '8','10']),
		sortOptions:[
			{ label: '选择题', value: '1' },
			{ label: '填空题', value: '2' },
			{ label: '解答题', value: '2' },
		],
		data:{
			title:'',
			topics:[]
		}
	}
	componentDidMount(){
		this.getExamDetail()
		// console.log(dataURItoBlob(img))
		// var querystring = require('querystring');
		// axios.post(url.attachments, querystring.stringify({ 
		// 	token:"CUhLA9Gst9nVNYGQYU2DKSPg",
		// 	base64_image: dataURItoBlob(img)
		// }));
		var fd=new FormData();
		fd.append('file',dataURItoBlob(img),'1.png');
		//如果需要多图上传只需要把对象添加进数组就可以了，向这样：fd.append('file[]',file);
		$.ajax({
			url:url.attachments,
			type:"POST",
			data:fd,
			processData: false,
			contentType: false,
			success:function(data){
			 	console.log(data)
			}
		}); 
	}
	handleRedioGroupClick = (e)=>{
		// console.log(e.target.value,1)
		this.setState({
			CheckedList:JSON.parse(e.target.value),
			redioCheck:e.target.value
		})
	}
	handleSingleCheck = (v)=>{
		this.setState({
			CheckedList:v 
		})
	}

	//获取试卷详情
	getExamDetail = ()=>{
		const { id } = this.props.match.params
		_axios.get(url.owner_exam_records +'/'+id)
			.then(data=>{
				this.setState({data:data.data})
			})
	}
	handleDownload = ()=>{
		// this.props.changeDownloadShow(true)
		

		html2canvas(document.querySelector("#download_exam")).then(canvas => {
			// document.body.appendChild(canvas)

			var base64Data = canvas.toDataURL("image/png"); //.replace(/^data:image\/\w+;base64,/, "");
			
			

	    // var dataBuffer = new Buffer(base64Data, 'base64');
	    // var querystring = require('querystring');
	    // axios.post(url.attachments, querystring.stringify({ 
	    // 	token:"CUhLA9Gst9nVNYGQYU2DKSPg",
	    // 	base64_image: dataURItoBlob(img)
	    // }));
			// _axios.post(url.attachments,{
			// 	base64_image:
			// })

	   
			// document.querySelector("#test").src=base64Data
			_axios.post(url.download_records,{
				type : 'exam_record',
				id : this.props.match.params.id
			})
				.then(data=>{
					$(document).googoose({
						area: "#download",
						filename: `${data.name}.doc`
					});

				})

			
		});
	}
	render(){
		const { CheckedList,redioCheck,contentEditable, data } = this.state
		return (
			<div className='DownloadPage contentCenter clearfix'>
				<div className="left leftBar">
					<div className="pad">
						<Button type="primary" icon="download" size='large' onClick={this.handleDownload}>下载试卷</Button>
						{/*<div className="clearfix small_title">
							<div className="left" onClick={()=>this.props.changeAnswerSheetShow(true)}><Icon type="file-word" style={{color:'#ff9600'}}/> 下载答题卡</div>
							<div className="left" onClick={()=>this.props.changeAnalyzeShow(true)}><Icon type="line-chart" style={{color:'#ff9600',cursor:'pointer'}}/> 分析试卷</div>
							<div className="left"><Icon type="save" style={{color:'#ff9600'}}/> 保存组卷</div>
						</div>*/}
					</div>
					<h3 className='h3'>试卷结构调整<span>收起</span></h3>
					<div className="group">
						<RadioGroup onChange={this.handleRedioGroupClick} value={redioCheck} size='small'>
			        <Radio value={JSON.stringify(['3', '8','10'])}>简易模办</Radio>
			        <Radio value={JSON.stringify(['3','4','6','7','8','9','10'])}>普通模板</Radio>
			        <Radio value={JSON.stringify(['1','2','3','4','6','7','8','9','10'])}>正式模板</Radio>
			      </RadioGroup>
					</div>
					<div className="checkgroup pad">
						<CheckboxGroup options={this.state.plainOptions} value={CheckedList} onChange={this.handleSingleCheck}/>
					</div>
					<h3 className='h3'>试题统计{/*<span>收起</span>*/}</h3>
					<Anchor>
						<div className="answer-number">
							{
								data.topics.length> 0 && data.topics.map((item, index)=>{
									return (
										<div key={index}>
											<h2 className='h2'>{index+1}、{item.name}{/*<div className="right">排序<span>删除</span></div>*/}</h2>
									    <div className="answer-num">
										    <ul>
													{
														item.children.length>0 && item.children.map(function(iitem,i){
															return <li key={iitem.id}><Link href={'#'+item.name+iitem.id} title={i+1}></Link></li>
														})
													}
											    {/*<li className="active"><Link title="2"></Link></li>*/}
										    </ul>
									    </div>
										</div>
									)
								})
							}
					  </div>
					</Anchor>
				</div>
				<div className="right rightContent clearfix" id='download_exam'>
					{ CheckedList.indexOf('1') !== -1 && <div className="left editing"></div>}
					<div className="left rightpage">
						{
							CheckedList.indexOf('3') !== -1 && <div style={{textAlign:'center'}}><h1 className='h1' contentEditable={contentEditable}>{data.title}</h1></div>
						}
						{/*
							CheckedList.indexOf('5') !== -1 && <div style={{textAlign:'center'}}><h2 className='h2' contentEditable={contentEditable}>数学考试</h2></div>
						*/}
						{
							CheckedList.indexOf('6') !== -1 && (
								<div className="test-time">
									考试时间：<span contentEditable={contentEditable} className='total_time'>* *</span>分钟 <span contentEditable={contentEditable}>* *</span>分
								</div>
							)
						}
						{
							CheckedList.indexOf('7') !== -1 && (
								<ul className="stu-info">
									<li>姓名：<span>____________</span></li>
									<li>班级：<span>____________</span></li>
									<li>学号：<span>____________</span></li>
								</ul>
							)
						}

						{
							CheckedList.indexOf('9') !== -1 && (
								<table className="top_table">
									<tbody>
										<tr>
											<th>题号</th>
											<td>一</td>
											<td>二</td>
											<td>三</td>
										</tr>
										<tr>
											<th>评分</th>
											<td>&nbsp;</td>
											<td>&nbsp;</td>
											<td>&nbsp;</td>
										</tr>
									</tbody>
								</table>
							)
						}

						{
							CheckedList.indexOf('4') !== -1 && (
								<div className="warning">
									<p>* 注意事项：</p>
									<div className="warningText" contentEditable={contentEditable}>
										1、填写答题卡的内容用2B铅笔填写<br/>
										2、提前 xx 分钟收取答题卡;
									</div>
						    </div>
							)
						}

				    {/*<div style={{textAlign:'center',marginTop:10}} className='clearfix'>
				    	<small className="left" style={{color:'#999'}} contentEditable={contentEditable}>第Ⅰ卷的注释</small>
				    	<h3 contentEditable={contentEditable}>第Ⅰ卷 客观题</h3>
				    </div>*/}

						{
							data.topics.length> 0 && data.topics.map((item, index)=>{
								return (
									<div key={index}>
										<div className="paper-types">
											{
												CheckedList.indexOf('2') !== -1 && (
													<table>
											    	<tbody>
											    		<tr>
											    			<th>阅卷人</th>
											    			<td></td>
											    		</tr>
											    		<tr>
											    			<th>得&nbsp;&nbsp;分</th>
											    			<td></td>
											    		</tr>
											    	</tbody>
											    </table>
												)
											}
											{
												CheckedList.indexOf('8') !== -1 && (
													<p>
											    	<strong>
											    		<b className="t-order">{index+1}</b>
											    		、<span contentEditable={contentEditable}>{item.name}</span>
											    		{
																CheckedList.indexOf('10') !== -1 && <span>(共<b className="t-num">{item.children.length}</b>题；共<b className="t-score">{item.score_count}</b>分)</span>
															}
											    	</strong>
											    </p>
												)
											}

									    {/*<div className="types-btngroup">
								        <span onClick={()=>this.setState({visible1: true})}><Icon type="switcher" />批量设置得分</span>
								        <span onClick={()=>this.setState({visible2: true})}><Icon type="filter" />排序</span>
								        <span onClick={()=>this.setState({visible3: true})}><Icon type="delete" />删除</span>
									    </div>*/}
								    </div>

										{
											item.children.length> 0 && item.children.map((iitem, i)=>{
												return (
													<div key={iitem.id} className="selectQ types" id={item.name+iitem.id}>
														<div style={{overflow:'hidden',position:'relative'}}>
															<div className="question-num" style={{position:'absolute'}}>
																<span className="q-sn">{i+1}.</span>
																<span className="q-scoreval">（{iitem.remark.score}分）</span>
															</div>
															<div dangerouslySetInnerHTML={{__html: iitem.content }}></div>
														</div>

														{/*<div className="types-btngroup">
											        <span onClick={()=>this.props.history.push('/AnswerDetail/1')}><Icon type="eye-o" />答案解析</span>
											        <span onClick={()=>this.setState({visible4: true})}><Icon type="switcher" />设定得分</span>
											        <span onClick={()=>message.success('试题收藏成功')}><Icon type="heart-o" /><Icon type="heart" />收藏</span>
											        <span onClick={()=>this.props.changeCorrectErrorShow(true)}><Icon type="form" />纠错</span>
											        <span onClick={()=>{}}><Icon type="delete" />删除</span>
												    </div>*/}
											    </div>
												)
											})
										}
									</div>
								)
							})
						}


				    {/*<div className="selectQ types">
							<div className="question-num">
								<span className="q-sn">1.</span>
								<span className="q-scoreval">（2分）</span>
								三明市地处福建省中西部，面积为22900平方千米，将22900用科学记数法表示为（   ）
							</div>
							<div className="question-answer-area">
								<span className="op-item">A. 229下水道</span>
								<span className="op-item">B. 229下水道</span>
								<span className="op-item">C. 229下水道</span>
								<span className="op-item">D. 229下水道</span>
							</div>
							<div className="types-btngroup">
				        <span onClick={()=>this.props.history.push('/AnswerDetail/1')}><Icon type="eye-o" />答案解析</span>
				        <span onClick={()=>this.setState({visible4: true})}><Icon type="switcher" />设定得分</span>
				        <span onClick={()=>message.success('试题收藏成功')}><Icon type="heart-o" /><Icon type="heart" />收藏</span>
				        <span onClick={()=>this.props.changeCorrectErrorShow(true)}><Icon type="form" />纠错</span>
				        <span onClick={()=>{}}><Icon type="delete" />删除</span>
					    </div>
				    </div>*/}

						<div className="answer">
							{
								data.topics.length> 0 && data.topics.map((item, index)=>{
									return (
										<div key={index} className='answer_title'>
											<div style={{fontSize:18}}>{index+1+' 、'+ item.name}</div>
											{
												item.children.length>0 && item.children.map(function(iitem, i){
													return (
														<div key={iitem.id}>
															<span style={{textIndent: '1em',display:'inline-block'}}>{i+1+' . '}</span>
															<span style={{color:'#ff9600'}}>【答案】</span>
															<span style={{textIndent: '5em'}} dangerouslySetInnerHTML={{__html: iitem.remark.right_answer }}></span>
															<div style={{color:'#ff9600',textIndent: '2em'}}>【解析】</div>
															<div style={{textIndent: '5em'}} dangerouslySetInnerHTML={{__html: iitem.remark.answer_analysis }}></div>
															<div style={{color:'#ff9600',textIndent: '2em'}}>【知识点】</div>
															<div style={{textIndent: '5em'}} dangerouslySetInnerHTML={{__html: iitem.remark.test_point }}></div>
														</div>
													)
												})
											}
										</div>
									)
								})
							}
						</div>

						<div id="download">
						
						</div>
						<img id='test' src='' alt=""/>
					</div>
					
				</div>

				 <Modal
					title="根据题型批量设置分数"
					visible={this.state.visible1}
					onOk={()=>this.setState({visible1: false})}
					onCancel={()=>this.setState({visible1: false})}
					okText='确定'
					cancelText='取消'
				>
        	单选题：<InputNumber defaultValue={0} /> 分 x 12题
					<p style={{marginTop:10}}>&nbsp;&nbsp;&nbsp;共计：120 分</p>
				</Modal>
				<Modal
					title="试题排序"
					visible={this.state.visible2}
					onOk={()=>this.setState({visible2: false})}
					onCancel={()=>this.setState({visible2: false})}
					okText='确定'
					cancelText='取消'
				>
        	<h4>需要排序的大题</h4>
        	<CheckboxGroup options={this.state.sortOptions} value={['1']} />
        	<h4 style={{marginTop:20}}>排序的方式</h4>
        	<RadioGroup onChange={()=>{}} value={1} size='small'>
		        <Radio value={1}>难度从低到高排序</Radio>
		        <Radio value={2}>难度从高到低排序</Radio>
		      </RadioGroup>
				</Modal>
				<Modal
					title="友情提示"
					visible={this.state.visible3}
					onOk={()=>this.setState({visible3: false})}
					onCancel={()=>this.setState({visible3: false})}
					okText='确定'
					cancelText='取消'
				>
					确定要删除全部的“选择题”么？
				</Modal>
				<Modal
					title="分数设定：选择题 - 第(2)题"
					visible={this.state.visible4}
					onOk={()=>this.setState({visible4: false})}
					onCancel={()=>this.setState({visible4: false})}
					okText='确定'
					cancelText='取消'
				>
					单选题：<InputNumber defaultValue={0} /> 分
				</Modal>
			</div>
		)
	}
}
