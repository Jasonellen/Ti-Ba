
import React, { Component }from 'react';
import { Select, Checkbox, Button, Modal } from 'antd';
const Option = Select.Option;
import {connect} from 'react-redux';
import './index.scss'

@connect(
	state => state.persist,
	null
)
export default class VIP extends Component{
	state = {
		educations:[],
		education_id:'',
		subjects:[],
		subject_id:'',
		packages:[],
		vip_introduction:'',
		pay_id:''
	};
	componentDidMount(){
		this.getData()
		const { educations } = this.props
		this.setState({
			educations,
		})
		// educations.map(()=>{
		//
		// })
	}
	handleChange = (value)=>{
		const { educations } = this.state
		educations.map((item)=>{
			if(item.id == value){
				this.setState({
					subjects:item.subjects,
					education_id:value
				})
			}
		})
	}
	handleFaPiao = (e)=>{
		this.setState({
			checked:e.target.checked
		})
	}
	getData = ()=>{
		_axios.get(url.packages)
			.then(data=>{
				let _data = data.packages
				let pay_id=''
				_data.map(function(item){
					item.checked = false
				})
				if(_data[0]){
					_data[0].ckecked = true
					pay_id = _data[0].id
				}
				this.setState({
					packages:data.packages,
					vip_introduction:data.vip_introduction,
					pay_id
				})
			})
	}
	handleSubmit = ()=>{
		const { education_id, subject_id } = this.state
		if(!education_id || !subject_id){
			Modal.error({
				title: '支付提醒',
				content: '请先选择购买学科',
			});
		}else{
			alert('即将支付')
		}
	}
	render(){
		const { educations, subjects, education_id, packages, vip_introduction } = this.state
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
								{
									educations.length>0 && educations.map((item)=>{
										return <Option key={item.id} value={item.id}>{item.name}</Option>
									})
								}
					    </Select>
					    <Select
								disabled={!education_id}
								placeholder="请选择学科"
								style={{ width: 120,marginLeft:30 }}
								onChange={(subject_id)=>this.setState({subject_id})}
							>
								{
									subjects.length>0 && subjects.map((item)=>{
										return <Option key={item.id} value={item.id}>{item.name}</Option>
									})
								}
					    </Select>
						</li>
						<li className='clearfix'>
							<div className='left'>购买套餐：</div>
							{
								packages.length>0 && packages.map((item)=>{
									return (
										<div key={item.id} className={`box left ${item.ckecked && 'active'}`}>
											<h2>{item.name}</h2>
											<p>(可下载${item.download_no}份试卷)</p>
											<span>售价：{item.price}元</span>
										</div>
									)
								})
							}
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
							金额：<span className='price'>16</span> 元<Button type='primary' onClick={this.handleSubmit}>立即支付</Button>
						</div>
					</div>
				</div>
				<div className="bottom box-shadow contentCenter">
					<div className="vip-introduce">
						<dl>
							<dt>VIP会员介绍</dt>
							<dd><div onClick={()=>this.setState({showAnswer:!this.state.showAnswer})} dangerouslySetInnerHTML={{__html: vip_introduction}}></div></dd>
						</dl>
        	</div>
				</div>
			</div>
		)
	}
}
