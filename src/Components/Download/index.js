
import React, { Component }from 'react';
import { Icon, Radio, Checkbox } from 'antd';
import './index.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as otherAction from '@/Redux/actions/other.js';
import { bindActionCreators } from 'redux'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['答案', '考点', '解析'];
const defaultCheckedList = ['答案'];

@connect(
	state => {
		return {
			user:state.persist.user,
			other:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch),
)
export default class Download extends Component{
	state = {
		value: 1,
		value1:1,
		checkedList: defaultCheckedList,
	};
	componentDidMount(){

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
		const { downloadShow } = this.props.other
		return (
			<div>
				{
					downloadShow && 
					<div className="Download">
						<div className="content">
							<div className="modal_title clearfix">下载word试卷<Icon type="close" className='right' onClick={()=>this.props.changeDownloadShow(false)}/></div>
							<div className="wrap">
								{/*<div className="small_title">纸张大小：</div>
								<RadioGroup onChange={this.onChange} value={this.state.value}>
									<Radio value={1}>A4</Radio>
									<Radio value={2}>A3(双栏)</Radio>
									<Radio value={3}>B5</Radio>
									<Radio value={4}>B4(双栏)</Radio>
								</RadioGroup>*/}
								<div className="small_title">试卷内容：</div>
								<CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange2} />
								<div className="small_title">试卷类型：</div>
								<RadioGroup onChange={this.onChange1} value={this.state.value1}>
									<Radio value={1}>不含答案</Radio>
									<Radio value={2}>答案在卷尾</Radio>
								</RadioGroup>
								<div className="pay">
									<div><img src="http://pay.21cnjy.com/index.php?m=signup&f=showqrcode&url=weixin%3A%2F%2Fwxpay%2Fbizpayurl%3Fpr%3DMTC0C6E" alt=""/></div>
									<span>2元</span>
									<p>(微信安全支付，支付成功自动下载)</p>
								</div>
								<div className="warning">
									<h4>温馨提示：</h4>
									<p>1、VIP用户下载免费。<Link to="/VIP">开通VIP</Link></p>
									<p>2、如有问题，请联系客服 QQ:269248791</p>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}
