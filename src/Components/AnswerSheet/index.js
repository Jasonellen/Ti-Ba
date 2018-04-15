
import React, { Component }from 'react';
import { Table, Icon, Radio, Checkbox, Select } from 'antd';
import './index.scss'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'

const defaultCheckedList = ['Apple', 'Orange'];
const Option = Select.Option;

@connect(
	state => {
		return {
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class AnswerSheet extends Component{
	state = {
		value: 1,
		value1:1,
		checkedList: defaultCheckedList,
	};
	componentDidMount(){
		console.log(this.props,123)
	}
	onChange = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	}
	onChange1 = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			value1: e.target.value,
		});
	}
	onChange2 = (checkedList) => {
		this.setState({
			checkedList,
		});
	}
	render(){
		const { answerSheetShow } = this.props.other
		return (
			<div>
				{
					answerSheetShow && (
						<div className="AnswerSheet">
							<div className="content">
								<div className="modal_title clearfix">下载答题卡<Icon type="close" className='right' onClick={()=>this.props.changeAnswerSheetShow(false)}/></div>
								<div className="wrap">
									<div className="small_title">
										纸张大小：
										<Select defaultValue='a' style={{ width: 140 }} dropdownMatchSelectWidth={false}>
								      <Option value="a">普通表格型</Option>
								      <Option value="b">标准题卡型</Option>
								      <Option value="c">选择密集型</Option>
								    </Select>
									</div>
									<img src="http://pay.21cnjy.com/index.php?m=signup&f=showqrcode&url=weixin%3A%2F%2Fwxpay%2Fbizpayurl%3Fpr%3DMTC0C6E" alt=""/>
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
}
