
import React, { Component }from 'react';
import { Icon, Tooltip, Checkbox, Card, Input, Radio,Button } from 'antd';
import './index.scss'
import ZuJuanSider from '@/Components/ZuJuanSider'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as znzjAction from '@/Redux/actions/znzj.js';
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
	state = {
		side:this.props.location.pathname.toLowerCase(),
		RadioGroupSelectValue:'',
		group_method:'relevance',
	};
	componentDidMount(){
		this.props.history.listen((location)=>{
			if(location.pathname.toLowerCase() !== this.state.side){
				this.setState({
					side:location.pathname.toLowerCase(),
				},()=>{
					this.props.handleOptionChange('select_data',[])
				})
			}
			
		})

		this.props.InitParams()
		eventEmitter.on('subjectChanged',()=>{
			this.props.InitParams()
		});
	}
	//章节选择
	handleC = (x)=>{
		const { chapter } = this.props.persist
		let select_data = []
		chapter.map(function(item){
			if(item.children.length > 0){
				x.map(function(iitem){
					if(item.id == iitem){
						item.checked = true
						select_data.push({id:item.id,name:item.name})
					}
				})
			}else{
				x.map(function(iitem){
					if(item.id == iitem){
						item.checked = true
						select_data.push({id:item.id,name:item.name})
					}
				})
			}
			
		})

		this.props.handleOptionChange('chapter_ids',x)
		this.props.handleOptionChange('knowledge_ids',[])
		this.props.handleOptionChange('select_data',select_data)
	}

	//知识点选择
	handleK = (x)=>{
		const { knowledges } = this.props.persist
		let select_data = []
		knowledges.map(function(item){
			x.map(function(iitem){
				if(item.id == iitem){
					item.checked = true
					select_data.push({id:item.id,name:item.name})
				}
			})
		})
		this.props.handleOptionChange('chapter_ids',[])
		this.props.handleOptionChange('knowledge_ids',x)
		this.props.handleOptionChange('select_data',select_data)
	}
	//已选章节/知识点点击删除
	handleDelSelect = (id)=>{
		let { chapter_ids, knowledge_ids, select_data } = this.props.znzj
		if(this.state.side == '/znzj/zj'){
			chapter_ids.map(function(item,i){
				if(item == id){
					chapter_ids.splice(i,1)
				}
			})
		}else{
			knowledge_ids.map(function(item,i){
				if(item == id){
					knowledge_ids.splice(i,1)
				}
			})
		}
		select_data.map(function(item,i){
			if(item.id == id){
				select_data.splice(i,1)
			}
		})
		this.props.handleOptionChange('chapter_ids',chapter_ids)
		this.props.handleOptionChange('knowledge_ids',knowledge_ids)
		this.props.handleOptionChange('select_data',select_data)
	}
	handleRadioGroup = (e)=>{
		this.setState({
			RadioGroupSelectValue:e.target.value
		})
	}
	handleGLChange = (e)=>{
		this.setState({
			group_method:e.target.value
		})
	}
	
	render(){
		const { topic_types,levels, chapter,knowledges } = this.props.persist
		const { grades, data, select_data, chapter_ids, knowledge_ids } = this.props.znzj
		const { RadioGroupSelectValue, group_method } = this.state
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
				<div className="warp clearfix">
					<div className="leftSide">
						{
							this.state.side == '/znzj/zj'
								?
								<ZuJuanSider 
									data={chapter} 
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
									/>
						}
					</div>
					<div className="rightSide">
						<Card
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
						</Card>
						<Card
							hoverable={true}
							type="inner"
							title='试卷设置'
						>
							<div style={{marginBottom:10}}>
	    					试题难度：
								<RadioGroup onChange={this.handleRadioGroup} value={RadioGroupSelectValue}>
								{
									_levels.map((item)=>{
										return <Radio key={item.value} value={item.value}>{item.label}</Radio>
									})
								}
								</RadioGroup>
							</div>
							<div style={{marginBottom:10}}>
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
							</div>
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
