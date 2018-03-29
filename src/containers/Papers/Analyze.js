
import React, { Component }from 'react';
import { Table, Breadcrumb, Icon, Radio,Button, Select } from 'antd';
import './Analyze.scss'
import {Link} from 'react-router-dom'
var Highcharts = require('highcharts');
require('highcharts/modules/variable-pie')(Highcharts);

export default class Analyze extends Component{
	state = {
		dataSource:[{
			key: '1',
			colSpan:2,
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号'
		}, {
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}, {
			key: '3',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}, {
			key: '4',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}],
		columns : [{
			title: '姓名',
			dataIndex: 'name',
			render: (value, row, index) => {
				const obj = {
					children: value,
					props: {},
				};
				if (index === 0) {
					obj.props.rowSpan = 2;
				}
				// These two are merged into above cell
				if (index === 1) {
					obj.props.rowSpan = 0;
				}
				if (index === 2) {
					obj.props.rowSpan = 2;
				}
				if (index === 3) {
					obj.props.rowSpan = 0;
				}
				return obj;
			},
		}, {
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
		}, {
			title: '住址',
			dataIndex: 'address',
			key: 'address',
		}],
		dataSource1:[{
			key: '1',
			colSpan:2,
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号'
		}, {
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}],
		columns1 : [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
		}, {
			title: '住址',
			dataIndex: 'address',
			key: 'address',
		}]
	};
	componentDidMount(){
		console.log(this.props,123)
		setTimeout(()=>{
			Highcharts.chart('container', {
		    chart: {
		      type: 'pie'
		    },
		    title: {
		      text: ''
		    },
				tooltip: {
					pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
								'面积 (平方千米): <b>{point.y}</b><br/>' +
								'人口密度 (每平方千米人数): <b>{point.z}</b><br/>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true
						},
						showInLegend: true
					}
				},
		  	series: [{
		      data: [
						{color:'rgb(243, 156, 18)',name: '西班牙',y: 505370,z: 92.9},
						{name: '法国',y: 551500,z: 118.7,color:'rgb(101, 198, 187)'},
						{name: '波兰',y: 312685,z: 124.6,color:'rgb(68, 108, 179)'}]
		  	}]
			});
		},1000)

	}

	render(){
		const { dataSource, columns,columns1,dataSource1 } = this.state
		return (
			<div className={`Analyze`}>
				<div className="content">
					<div className="modal_title clearfix">试卷分析<Icon type="close" className='right' onClick={()=>this.setState({analyze_show:false})}/></div>
					<div className="wrap">
						<div className="small_title">试卷总体分布分析</div>
						<Table dataSource={dataSource} columns={columns} pagination={false} bordered={true} size="middle"/>
						<div className="middle clearfix">
							<div className="left">
								<div className="small_title">试卷题量分布分析</div>
								<Table dataSource={dataSource1} columns={columns1} pagination={false} bordered={true} size="middle"/>
							</div>
							<div className="right">
								<div className="small_title">试卷难度结构分析</div>
								<div id="container"></div>
							</div>
						</div>
						<div className="small_title">试卷知识点分析</div>
						<Table dataSource={dataSource1} columns={columns1} pagination={false} bordered={true} size="middle"/>
					</div>
				</div>
			</div>
		)
	}
}
