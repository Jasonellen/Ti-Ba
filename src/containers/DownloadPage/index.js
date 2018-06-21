
import React, { Component }from 'react';
import { Modal, Button, Radio,Checkbox, Anchor } from 'antd';
import './index.scss'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
import move_diagonal from 'static/move-diagonal.svg'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Link } = Anchor;


@connect(
	state => {
		return {
			other:state.other,
			persist:state.persist,
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class DownloadPage extends Component{
	state={
		modalshow:false,
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
		CheckedList:['3','4','6','7', '8','10'],
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
		const { type } = this.props.match.params
		if(type){
			//试卷详情页过来的
			this.getDatafromExamDetail()
		}else{
			//手动组卷过来的
			this.getExamDetail()
		}
	}
	handleRedioGroupClick = (e)=>{
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
		_axios.get(url.exam_records +'/'+id)
			.then(data=>{
				this.setState({data:data.data})
			})
	}
	//从试卷详情页过来的获取详情数据
	getDatafromExamDetail = ()=>{
		const { id,type } = this.props.match.params
		let _url = type == 'exam_record' ? url.owner_exam_records : url.exams
		_axios.get(_url+'/'+id)
			.then(data=>{
				this.setState({
					data:data.data
				})
			})
	}

	needWxPay = ()=>{
		const { subject_id,education_id } = this.props.persist
		_axios.post(url.orders,{
			type:'exam_record',
			pay_way:'wechat_qr_pay',
			subject_id,
			education_id,
			id:this.props.match.params.id,
		})
			.then(data=>{
				this.setState({
					modalshow:true
				},()=>{
					setTimeout(()=>{
						document.querySelector('#qrcode').innerHTML = ''
						new QRCode('qrcode', {
							text: data.data.qr_code_url,
							width: 350,
							height: 350,
							colorDark: '#000000',
							colorLight: '#ffffff',
						});
						clearInterval(this.check_status)
						this.check_status = setInterval(()=>{
							this.checkStatus(data.data.order_no)
						},1000)
					},0)
				})
			})
	}
	checkStatus = (order_no)=>{
		_axios.get(url.orders_check,{order_no})
			.then(data=>{
				if(data.data.status == 'paid'){
					clearInterval(this.check_status)
					this.setState({modalshow:false},this.beginDownload)
				}
			})
	}
	//开始下载
	beginDownload = (title)=>{
		const { id,type } = this.props.match.params
		if(!this.props.persist.user.token){
			eventEmitter.emit('notLogin');
			return
		}
		_axios.post(url.download_records,{
			type : type == 'exam' ? 'exam': 'exam_record',
			id : id
		})
			.then((data)=>{
				if(data.paid){
					jQuery(document).googoose({
						filename: `${title}.doc`,
						size:'8.5in',
						area:'#download_exam'
					});
				}else{
					this.needWxPay()
				}
			})
	}
	componentWillUnmount() {
		clearInterval(this.check_status)
	}
	toUpperCase = {
		1:'一',
		2:'二',
		3:'三',
		4:'四',
		5:'五',
		6:'六',
		7:'七',
		8:'八',
		9:'九',
		10:'十',
	}
	render(){
		const { CheckedList,redioCheck,contentEditable, data, modalshow } = this.state
		return (
			<div className='DownloadPage contentCenter clearfix'>
				<div className="left leftBar">
					<div className="pad">
						{/* onClick={()=>this.props.changeDownloadShow(true)} 打开下载modal*/}
						<Button type="primary" icon="download" size='large' onClick={()=>this.beginDownload(data.title || data.name)}>下载试卷</Button>
						{/*<div className="clearfix small_title">
							<div className="left" onClick={()=>this.props.changeAnswerSheetShow(true)}><Icon type="file-word" style={{color:'#ff9600'}}/> 下载答题卡</div>
							<div className="left" onClick={()=>this.props.changeAnalyzeShow(true)}><Icon type="line-chart" style={{color:'#ff9600',cursor:'pointer'}}/> 分析试卷</div>
							<div className="left"><Icon type="save" style={{color:'#ff9600'}}/> 保存组卷</div>
						</div>*/}
					</div>
					{/*<h3 className='h3'>试卷结构调整<span>收起</span></h3>
					<div className="group">
						<RadioGroup onChange={this.handleRedioGroupClick} value={redioCheck} size='small'>
			        <Radio value={JSON.stringify(['3', '8','10'])}>简易模办</Radio>
			        <Radio value={JSON.stringify(['3','4','6','7','8','9','10'])}>普通模板</Radio>
			        <Radio value={JSON.stringify(['1','2','3','4','6','7','8','9','10'])}>正式模板</Radio>
			      </RadioGroup>
					</div>
					<div className="checkgroup pad">
						<CheckboxGroup options={this.state.plainOptions} value={CheckedList} onChange={this.handleSingleCheck}/>
					</div>*/}
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
				<div className="right rightContent clearfix" id='download_exam' ref={x=>this.download_exam = x}>
					<div className='googoose header'>题霸网 http://www.gdtibawang.com/</div>
					{ CheckedList.indexOf('1') !== -1 && <div className="left editing"><img src="/static/editing.png" alt=""/></div>}
					<div className="left rightpage">
						{
							CheckedList.indexOf('3') !== -1 && <div style={{textAlign:'center'}}><h1 className='h1' contentEditable={contentEditable}>{data.title || data.name}</h1></div>
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
								<p className="stu-info">
									姓名：<span>____________</span>班级：<span>____________</span>学号：<span>____________</span>
								</p>
							)
						}

						{
							CheckedList.indexOf('9') !== -1 && (
								<table className="top_table">
									<tbody>
										<tr>
											<th>题号</th>
											{
												data.topics.length> 0 && data.topics.map((item,i)=>{
													return <td key={item.id}>{this.toUpperCase[i+1]}</td>
												})
											}
										</tr>
										<tr>
											<th>评分</th>
											{
												data.topics.length> 0 && data.topics.map((item)=>{
													return <td key={item.id}></td>
												})
											}
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
											    		<b className="t-order">{this.toUpperCase[index+1]}</b>
											    		、<span contentEditable={contentEditable}>{item.name}</span>
											    		{
																CheckedList.indexOf('10') !== -1 && <span>(共<b className="t-num">{item.children.length}</b>题；共<b contentEditable={contentEditable} className="t-score">{item.score_count}</b>分)</span>
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
																<span contentEditable={contentEditable} className="q-scoreval">（{iitem.remark.score}分）</span>
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
														{/* <div className="drag_space_wrap">
															<textarea value="拖动增加空白区域"></textarea>
															<img src={move_diagonal} alt=""/>
														</div> */}

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

						<div className="answer" style={{fontSize:14}}>
							{
								data.topics.length> 0 && data.topics.map((item, index)=>{
									return (
										<div key={index} className='answer_title'>
											<div style={{fontSize:18,marginBottom:20,marginTop:20}}>{this.toUpperCase[index+1]+' 、'+ item.name}</div>
											{
												item.children.length>0 && item.children.map(function(iitem, i){
													return (
														<div key={iitem.id}>
															<div>{i+1+' . '}<span style={{color:'#ff9600'}}>【答案】</span></div>
															<div style={{textIndent: '5em'}} dangerouslySetInnerHTML={{__html: iitem.remark.right_answer }}></div>
															<div style={{color:'#ff9600',textIndent: '1em'}}>【解析】</div>
															<div style={{textIndent: '5em'}} dangerouslySetInnerHTML={{__html: iitem.remark.answer_analysis }}></div>
															<div style={{color:'#ff9600',textIndent: '1em'}}>【知识点】</div>
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
						<div className='googoose footer'>
							Page <span className='googoose currentpage'></span>
        			of <span className='googoose totalpage'></span>
						</div>
					</div>
				</div>

				 {/* <Modal
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
				</Modal> */}

				<Modal
					title='扫码支付'
					visible={modalshow}
					footer={null}
					width={400}
					maskClosable={false}
					onCancel={()=>this.setState({modalshow:false})}
				>
					<p style={{textAlign:'center',marginBottom:15}}>请使用 <span style={{color:'red'}}>微信</span> 扫一扫二维码完成支付</p>
					<div id="qrcode"></div>
				</Modal>
			</div>
		)
	}
}
