
import React, { Component }from 'react';
import { Icon, Checkbox, Card, InputNumber, Radio,Button } from 'antd';
import './index.scss'
import ZuJuanSider from '@/Components/ZuJuanSider'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as znzjAction from '@/Redux/actions/znzj.js';
import SmallNavBar from '@/Components/SmallNavBar'
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

@connect(
	state => {
		return {
			persist:state.persist,
			znzj:state.znzj,
		}
	},
	dispatch => bindActionCreators(znzjAction, dispatch)
)
export default class ZNZJ extends Component{

	componentDidMount(){
		let side = this.props.location.pathname.toLowerCase()
		this.props.history.listen((location)=>{
			if(location.pathname.toLowerCase() !== this.props.znzj.side){
				this.props.handleMenuChange(location.pathname.toLowerCase())
			}
		})

		this.props.InitParams(side)
		eventEmitter.on('subjectChanged',()=>{
			this.props.InitParams(side)
		});

	}
	//章节选择
	handleC = (x)=>{
		this.props.znzjChangeSingle({key:'chapter_ids',value:x})
		this.props.znzjChangeSingle({key:'knowledge_ids',value:[]})
		this.props.beginSearch()
	}

	//知识点选择
	handleK = (x)=>{
		this.props.znzjChangeSingle({key:'chapter_ids',value:[]})
		this.props.znzjChangeSingle({key:'knowledge_ids',value:x})
		this.props.getTrees()
	}

	handleRadioGroup = (e)=>{
		this.props.handleOptionChange('level',e.target.value)
	}
	handleGLChange = (e)=>{
		this.props.handleOptionChange('group_method',e.target.value)
	}
	//提交
	huandleSubmit = ()=>{
		const {
			education_id,
			subject_id,
			level,
			group_method,
			chapter_ids,
			knowledge_ids,
			grade:grade_ids,
			topic_data,
			side
		} = this.props.znzj

		let topic_types = topic_data.filter(function(item){
			return item.show == true
		})
		_axios.post(url.group_exam_smart_exams,
			Object.assign({},{
				education_id,
				subject_id,
				level,
				group_method,
				grade_ids,
				topic_types,
				type:side == '/znzj/zj'?'chapter':"knowledge"
			},side == '/znzj/zj'?{chapter_ids}:{knowledge_ids})
		)
			.then(data=>{
				_history.push('/downloadpage/'+data.exam_record_id)
			})
	}
	render(){
		const { levels, versions } = this.props.persist
		const { grades, chapter_ids, knowledge_ids, level, side, topic_data, chapters,knowledges, } = this.props.znzj
		const _levels = [{label:"不限",value:""}].concat(levels)
		let select_grades=[]
		grades.map(function(item){
			if(item.checked == true){
				select_grades.push(item.value)
			}
		})
		return (
			<div className='ZNZJ contentCenter'>
				{/*<Breadcrumb separator=">">
			    <Breadcrumb.Item href="/"><Icon type="home" />当前位置：首页</Breadcrumb.Item>
					<Breadcrumb.Item>初中数学</Breadcrumb.Item>
			  </Breadcrumb>*/}
				<div className="oneBar">
					{
						side == '/znzj/zj' && (
							<SmallNavBar
								noall
								title='教材'
								data={versions}
								onChange={(x)=>{
									this.props.handleOptionChange('version_id',x)
									this.props.getTrees()
								}}
							/>
						)
					}
				</div>
				<div className="warp clearfix">
					<div className="leftSide">
						{
							side == '/znzj/zj'
								?
								<ZuJuanSider
									data={chapters}
									title='选择章节'
									onCheck={(x)=>this.handleC(x)}
									checkable
									checkedKeys = {chapter_ids}
								/>
								: <ZuJuanSider
									data={knowledges}
									title='选择知识点'
									onCheck={(x)=>this.handleK(x)}
									checkable
									checkedKeys = {knowledge_ids}
								/>
						}
					</div>
					<div className="rightSide">
						{/*<Card
							hoverable={true}
							type="inner"
							title='题型：填空题'
						>
							<ul className='select clearfix'>
								{
									select_data.length>0 && select_data.map((item)=>{
										return <li key={item.id} className='left'>{item.name} <Icon type="close-circle" onClick={()=>this.handleDelSelect(item.id)}/></li>
									})
								}
							</ul>
						</Card>*/}
						<Card
							hoverable={true}
							type="inner"
							title='试卷设置'
						>
							<div style={{marginBottom:10}}>
	    					试题难度：
								<RadioGroup onChange={this.handleRadioGroup} value={level}>
									{
										_levels.map((item)=>{
											return <Radio key={item.value} value={item.value}>{item.label}</Radio>
										})
									}
								</RadioGroup>
							</div>
							{/*<div style={{marginBottom:10}}>
	    					出题方式：
								<RadioGroup onChange={this.handleGLChange} value={group_method}>
									<Radio value={'relevance'}>关联出题&nbsp;
										<Tooltip placement="topRight" title="匹配出来的试题包含的知识点（章节），最少有一个在已选的知识点（章节）中，这个方式适用于期末考试、学业考试、升学考试等试卷类型。出题的综合性较强。" arrowPointAtCenter>
											<Icon type="question-circle" />
										</Tooltip>
									</Radio>
									<Radio value={'precise'}>精准出题&nbsp;
										<Tooltip placement="topRight" title="匹配出来的试题包含的知识点（章节）。都在已选的知识点（章节）中，这个方式保证了组卷的精准性，避免超纲试题的出现，适用于同步类型的试卷。" arrowPointAtCenter>
											<Icon type="question-circle" />
										</Tooltip>
									</Radio>
								</RadioGroup>
							</div>*/}
							<div>
								试用年级：
								<CheckboxGroup options={grades} value={select_grades} onChange={(x)=>this.props.handleCheckGroup(x)} />
							</div>
						</Card>
						<Card
							hoverable={true}
							type="inner"
							title='题型/题量设置'
						>
							<div className="btm clearfix">
								<ul className='left'>
									{
										topic_data.length>0 && topic_data.map((item)=>{
											if(item.show){
												return (
													<li key={item.topic_type_id} className='clearfix'>
														<div className="left">{item.topic_type_name}<small>{item.topics_count>999?'999+':item.topics_count}道试题可用</small></div>
														<div className="right"><InputNumber max={item.topics_count} min={0} onChange={(num)=>this.props.hanldeInputChange(num,item.topic_type_id)}/> 道 <Icon type="delete" onClick={()=>this.props.handleTopicDataDel(item.topic_type_id)}/></div>
													</li>
												)
											}
										})
									}
    						</ul>
								<div className="right">
									{
										topic_data.length>0 && topic_data.map((item,i)=>{
											return <Button disabled={item.show} key={item.topic_type_id} type='primary' onClick={()=>this.props.handleTopicDataAdd(item.topic_type_id)}>{item.topic_type_name}</Button>
										})
									}
								</div>
							</div>
						</Card>
						<div className="submit"><Button onClick={this.huandleSubmit} type='primary' size='large'>生成试卷</Button></div>
					</div>
				</div>
			</div>
		)
	}
}
