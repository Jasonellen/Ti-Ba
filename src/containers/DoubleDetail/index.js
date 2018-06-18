
import React, { Component }from 'react';
// import { Icon,Table, Select, Modal, Button,Input, Radio,message } from 'antd';
import { Table, Button,message } from 'antd';
import './index.scss'
// import { Link } from 'react-router-dom'
// var Highcharts = require('highcharts');
// require('highcharts/modules/variable-pie')(Highcharts);
// const Option = Select.Option;
// const confirm = Modal.confirm;
// const RadioGroup = Radio.Group;

const _level = {
	easy:'简单',
	normal:'普通',
	difficult:'困难',
}

const columns = [
	{
		title: '题序',
		dataIndex: 'index',
		key: 'index',
	},
	{
		title: '题型',
		dataIndex: 'topic_type_name',
		key: 'topic_type_name',
		render: text => text,
		// render: text => (
		// 	<Select defaultValue={text} style={{ width: 100 }} dropdownMatchSelectWidth={false}>
	  //     <Option value="jack">Jack</Option>
	  //     <Option value="lucy">Lucy</Option>
	  //     <Option value="disabled" disabled>Disabled</Option>
	  //     <Option value="Yiminghe">yiminghe</Option>
	  //   </Select>
		// ),
	},
	{
		title: '关联知识点（最多选5个）',
		dataIndex: 'knowledges',
		key: 'knowledges',
		render: text => (
		<div>
			{
				text.map((item)=>{
					return 	<Button key={item.id} className='SelectBtn'>{item.name}{/*<Icon type="close" />*/}</Button>
				})
			}
			{/* <Button className='SelectBtn'>算数平方根<Icon type="close" /></Button> */}
			{/* <Button type="dashed">+ 添加知识点</Button> */}
		</div>
	),
	},
	{
		title: '难度',
		dataIndex: 'level',
		key: 'level',
		render: text => _level[text],
		// render: text => (
		// 	<Select defaultValue={text} style={{ width: 60 }} dropdownMatchSelectWidth={false}>
	  //     <Option value="jack">Jack</Option>
	  //     <Option value="lucy">Lucy</Option>
	  //     <Option value="disabled" disabled>Disabled</Option>
	  //     <Option value="Yiminghe">yiminghe</Option>
	  //   </Select>
		// ),
	},
	// {
	// 	title: '操作',
	// 	dataIndex: 'caozuo',
	// 	key: 'caozuo',
	// 	render: text => <Icon type='delete' className='delicon' onClick={()=>{
	// 		confirm({
	//     title: '删除试题',
	//     content: '你是否要删除该试题？',
	//     onOk() {
	//       console.log('OK');
	//     },
	//     onCancel() {
	//       console.log('Cancel');
	//     },
	//   });
	// 	}}></Icon>,
	// }
];

export default class DoubleDetail extends Component{
	state={
		visible:false,
		visible1:false,
		data:{
			datas:[]
		}
	}

	componentDidMount() {
		this.getData()
		// Highcharts.chart('container',{
		// 	title: {
		// 		text: '大题体量分析'
		// 	},
		// 	xAxis: {
		// 		categories: ['非洲', '美洲','澳洲'],
		// 	},
		// 	yAxis: {
		// 		title: {
		// 			text: null
		// 		}
		// 	},
		// 	legend:{
		// 		enabled:false
		// 	},
		// 	tooltip: {
		// 		headerFormat: '<span style="font-size:10px">题量分析</span><table>',
		// 		pointFormat: '<tr><td style="color:{series.color};padding:0">{point.name} {point.y}</td></tr>',
		// 		footerFormat: '</table>',
		// 		useHTML: true
		// 	},
		// 	series: [{
		// 		type: 'bar',
		// 		data: [{
		// 			x: 0,
		// 			y: 1,
		// 			name: "困难",
		// 			color: "#00FF00"
		// 		}, {
		// 			x: 1,
		// 			y: 10,
		// 			name: "普通",
		// 			color: "#FF00FF"
		// 		}, {
		// 			x: 2,
		// 			y: 7,
		// 			name: "普通1",
		// 			color: "#FF00FF"
		// 		}]
		// 	}]
		// });

		// Highcharts.chart('containerpie', {
	  //   chart: {
	  //     type: 'pie'
	  //   },
	  //   title: {
	  //     text: '难度分析'
	  //   },
		// 	tooltip: {
		// 		pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
		// 					'面积 (平方千米): <b>{point.y}</b><br/>' +
		// 					'人口密度 (每平方千米人数): <b>{point.z}</b><br/>'
		// 	},
		// 	plotOptions: {
		// 		pie: {
		// 			allowPointSelect: true,
		// 			cursor: 'pointer',
		// 			dataLabels: {
		// 				enabled: true
		// 			},
		// 			showInLegend: true
		// 		}
		// 	},
	  // 	series: [{
	  //     data: [
		// 			{color:'rgb(243, 156, 18)',name: '西班牙',y: 505370,z: 92.9},
		// 			{name: '法国',y: 551500,z: 118.7,color:'rgb(101, 198, 187)'},
		// 			{name: '波兰',y: 312685,z: 124.6,color:'rgb(68, 108, 179)'}]
	  // 	}]
		// });
		//
		//
		// Highcharts.chart('containerbtm',{
		// 	title: {
		// 		text: '大题体量分析'
		// 	},
		// 	xAxis: {
		// 		categories: ['非洲', '美洲'],
		// 	},
		// 	yAxis: {
		// 		title: {
		// 			text: null
		// 		}
		// 	},
		// 	legend:{
		// 		enabled:false
		// 	},
		// 	tooltip: {
		// 		headerFormat: '<span style="font-size:10px">题量分析</span><table>',
		// 		pointFormat: '<tr><td style="color:{series.color};padding:0">{point.name} {point.y}</td></tr>',
		// 		footerFormat: '</table>',
		// 		useHTML: true
		// 	},
		// 	series: [{
		// 		type: 'bar',
		// 		data: [{
		// 			x: 0,
		// 			y: 1,
		// 			name: "困难",
		// 			color: "#00FF00"
		// 		}, {
		// 			x: 1,
		// 			y: 10,
		// 			name: "普通",
		// 			color: "#FF00FF"
		// 		}]
		// 	}]
		// });
	}
	getData = ()=>{
		_axios.get(url.projects+'/'+this.props.match.params.id)
			.then(data=>{
				this.setState({
					data:data.project,
				})
			})
	}
	// handleDelConfirm = ()=>{
	// 	confirm({
	//     title: '删除试题',
	//     content: '你是否要删除该试题？',
	//     onOk() {
	//       console.log('OK');
	//     },
	//     onCancel() {
	//       console.log('Cancel');
	//     },
	//   });
	// }

	saveDetail = () => {
	  const hide = message.loading('系统正在出题，请耐心等待',0);
		_axios.post(url.group_exam_smart_exams,{
			project_id:this.state.data.id
		})
			.then(data=>{
				hide()
				this.props.history.push(`/downloadpage/${data.exam_record_id}`)
			})
	};
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
		const { data } = this.state
		return (
			<div className='DoubleDetail contentCenter clearfix'>
				<div className="left leftwrap clearfix">
					<div className="top">
						<div className="lbtn left" style={{width:'100%'}} onClick={this.saveDetail}>马上出题</div>
						{/* <div className="rbtn right" onClick={()=>this.setState({visible1:true})}>保存细目表</div> */}
					</div>
					{/* <h2>双向细目标分析</h2>
					<div className="htable">
						<div>
							<div id="container" style={{width:200,height:200,margin:'0 auto'}}></div>
							<ul className="t1">
								<li>
									<div><i></i> 普通（10）</div>
								</li>
								<li>
									<div><i></i> 困难（17）</div>
								</li>
							</ul>
						</div>
						<div id="containerpie" style={{width:250,height:250,margin:'0 auto'}}></div>
						<div>
							<div id="containerbtm" style={{width:200,height:200,margin:'0 auto'}}></div>
							<ul className="t1">
								<li>
									<div><i></i> 普通（10）</div>
								</li>
								<li>
									<div><i></i> 困难（17）</div>
								</li>
							</ul>
						</div>
					</div> */}
				</div>
				<div className="right rightwrap">
					<h1>{data.name}</h1>
					{
						data.datas.length>0 && 	data.datas.map((item,i)=>{
							item.data.map((_item,ii)=>{
								_item.index = ii+1
								_item.key = ii+1
							})
							return (
								<div key={i}>
									<div className="title">
										{this.toUpperCase[i+1]}、{item.title}
										{/* <div className="subtitle">
											<span onClick={this.handleDelConfirm}><Icon type='delete'></Icon>删除</span>
											<span onClick={()=>this.setState({visible:true})}>+添加小标题</span>
										</div> */}
									</div>
									<Table
										columns={columns}
										dataSource={item.data}
										bordered={true}
										pagination={false}
									/>
								</div>
							)
						})
					}

					{/* <div className="addNew" onClick={()=>this.setState({visible:true})}>+添加新大区</div> */}
				</div>

				{/* <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={()=>alert('删除成功')}
          onCancel={()=>this.setState({visible:false})}
          okText="确认"
          cancelText="取消"
        >
        	<div style={{marginBottom:10}}>
        		试题数量：
        		<Select defaultValue='lucy' style={{ width: 200 }} dropdownMatchSelectWidth={false}>
				      <Option value="jack">Jack</Option>
				      <Option value="lucy">Lucy</Option>
				      <Option value="disabled" disabled>Disabled</Option>
				      <Option value="Yiminghe">yiminghe</Option>
				    </Select>
        	</div>
          <div style={{marginBottom:10}}>
          	选择题型：
          	<Select defaultValue='jack' style={{ width: 200 }} dropdownMatchSelectWidth={false}>
				      <Option value="jack">Jack</Option>
				      <Option value="lucy">Lucy</Option>
				      <Option value="disabled" disabled>Disabled</Option>
				      <Option value="Yiminghe">yiminghe</Option>
				    </Select>
          </div>
			    <div>
			    	试题难度：
			    	<Select defaultValue='Yiminghe' style={{ width: 200 }} dropdownMatchSelectWidth={false}>
				      <Option value="jack">Jack</Option>
				      <Option value="lucy">Lucy</Option>
				      <Option value="disabled" disabled>Disabled</Option>
				      <Option value="Yiminghe">yiminghe</Option>
				    </Select>
			    </div>
        </Modal> */}

        {/* <Modal
          title="Modal"
          visible={this.state.visible1}
          onOk={()=>alert('保存成功')}
          onCancel={()=>this.setState({visible1:false})}
          okText="确认"
          cancelText="取消"
        >
        	<div style={{marginBottom:10}}>
        		细目表名称：<Input style={{width:'70%'}} value="Basic usage"/>
        	</div>
          <div style={{marginBottom:10}}>
          	细目表类型：
          	<RadioGroup onChange={()=>{}} value={1}>
			        <Radio value={1}>中考模拟</Radio>
			        <Radio value={2}>期中试卷</Radio>
			        <Radio value={3}>期末试卷</Radio>
			        <Radio value={4}>其他</Radio>
			      </RadioGroup>
          </div>
        </Modal> */}
			</div>
		)
	}
}
