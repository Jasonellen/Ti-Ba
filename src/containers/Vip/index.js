
import React, { Component }from 'react';
import { Modal, Select, Icon, Checkbox, Button, Input } from 'antd';
import {Link} from 'react-router-dom'
import './index.scss'
import SmallNavBar from '@/Components/SmallNavBar'
import ZuJuanSider from '@/Components/ZuJuanSider'
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
import ShiTiLan from '@/Components/ShiTiLan'
const Option = Select.Option;

export default class VIP extends Component{
	state = {
		confirmShow:false
	};
	componentDidMount(){

	}
	handleChange = (value)=>{
		console.log(value)
	}
	handleFaPiao = (value)=>{
		console.log(value)
	}
	render(){
		return (
			<div className='VIP'>
				<div className="top contentCenter box-shadow">
					<ul>
						<li>
							购买学科：
							<Select
								style={{ width: 120 }}
								placeholder="请选择学段"
								onChange={this.handleChange}
							>
					      <Option value="jack">Jack</Option>
					      <Option value="lucy">Lucy</Option>
					      <Option value="disabled" disabled>Disabled</Option>
					      <Option value="Yiminghe">yiminghe</Option>
					    </Select>
					    <Select
								placeholder="请选择学科"
								style={{ width: 120,marginLeft:30 }}
							>
					      <Option value="lucy">Lucy</Option>
					    </Select>
						</li>
						<li className='clearfix'>
							<div className='left'>购买套餐：</div>
							<div className='box left active'>
								<h2>一个月</h2>
								<p>(可下载50份试卷)</p>
								<span>售价：16元</span>
							</div>
							<div className='box left'>
								<h2>一个月</h2>
								<p>(可下载50份试卷)</p>
								<span>售价：16元</span>
							</div>
							<div className='box left'>
								<h2>一个月</h2>
								<p>(可下载50份试卷)</p>
								<span>售价：16元</span>
							</div>
							<div className='box left'>
								<h2>一个月</h2>
								<p>(可下载50份试卷)</p>
								<span>售价：16元</span>
							</div>
						</li>
						<li>
							开具发票： <Checkbox onChange={this.handleFaPiao}>选择开具发票</Checkbox>
						</li>
					</ul>
					<hr/>
					<div className="submit clearfix">
						{/*<Link className='left' to='/VIPActivate'>
							&gt;&gt; 激活VIP体验卡
						</Link>*/}
						<div className="right">
							金额：<span className='price'>16</span> 元<Button type='primary'>立即支付</Button>
						</div>
					</div>
				</div>
				<div className="bottom box-shadow contentCenter">
					<div className="vip-introduce">
						<dl>
							<dt>VIP会员介绍</dt>
							<dd>1、购买二一组卷VIP会员服务，可免费下载试卷。</dd>
							<dd>2、会员可免费进行在线测试功能，并提供完整、详细的测试报告。</dd>
							<dd>3、每张组卷的试题数量限制，由原来的30道试题，增加至50道。</dd>
							<dd>4、每个用户允许开通多个学科的VIP服务。</dd>
							<dd>5、VIP服务时间为一整个月（30天），不受日期的影响。</dd>
						</dl>
        	</div>
				</div>
			</div>
		)
	}
}
