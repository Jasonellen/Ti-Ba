
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
		console.log(this.props,123)
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
						<li>
							&nbsp;&nbsp;&nbsp;激活码： <Input placeholder="请输入激活码" inline/>
						</li>
						<Button type='primary' style={{marginLeft:80}}>立即激活</Button>
					</ul>
				</div>
				<div className="bottom box-shadow contentCenter">
					<div className="vip-introduce">
						<dl>
							<dt>VIP卡激活码说明：</dt>
							<dd>1、VIP激活码仅用于激活二一组卷VIP卡，不能用于其他用途；</dd>
							<dd>2、VIP卡激活码不记名，不挂失；</dd>
							<dd>3、VIP激活码有激活期限，请及时使用。</dd>
						</dl>
        	</div>
				</div>
			</div>
		)
	}
}
