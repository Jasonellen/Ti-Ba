
import React, { Component }from 'react';
import { Select, Checkbox, Button, Modal,Input } from 'antd';
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
		single_price:0,

		checked:false,
		id:'',
		ticket_header:'',
		ticket_no:'',
		to_user_name:'',
		mobile:'',
		address:'',
		modalshow:false
	};
	componentDidMount(){
		this.getData()
		const { educations } = this.props
		this.setState({
			educations,
		})
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
				let id=''
				_data.map(function(item){
					item.checked = false
				})
				if(_data[0]){
					_data[0].checked = true
					id = _data[0].id
					this.setState({single_price:_data[0].price})
				}
				this.setState({
					packages:data.packages,
					vip_introduction:data.vip_introduction,
					id
				})
			})
	}
	handlePackageChange = (id)=>{
		const { packages } = this.state
		packages.map((item)=>{
			if(item.id == id){
				item.checked = true
				this.setState({single_price:item.price})
			}else{
				item.checked = false
			}
		})
		this.setState({packages,id})
	}
	handleSubmit = ()=>{
		const { education_id, subject_id } = this.state
		if(!education_id || !subject_id){
			Modal.error({
				title: '支付提醒',
				content: '请先选择购买学科',
			});
		}else{
			const {
				id,
				ticket_header,
				ticket_no,
				to_user_name,
				mobile,
				address,
				checked,
				education_id,
				subject_id,
			} = this.state
			let options = {
				type:'package',
				id,
				pay_way:'wechat_qr_pay',
				ticket_header,
				ticket_no,
				to_user_name,
				mobile,
				address,
				education_id,
				subject_id,
			}
			if(checked){
				options.require_ticket = true
			}
			_axios.post(url.orders,options)
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
	}
	checkStatus = (order_no)=>{
		_axios.get(url.orders_check,{order_no})
			.then(data=>{
				var _this = this
				if(data.data.status == 'paid'){
					clearInterval(this.check_status)
					Modal.success({
						title: '微信支付',
						content: '支付成功',
						okText:'确定',
						onOk:()=>{
							_this.setState({modalshow:false},()=>{
								location.href = '/PersonalCenter/PersonalInfo'
							})
						}
					});
				}
			})
	}
	componentWillUnmount() {
		clearInterval(this.check_status)
	}
	render(){
		const { checked, single_price, educations, subjects, education_id, packages, vip_introduction, modalshow } = this.state
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
										<div key={item.id} className={`box left ${item.checked && 'active'}`} onClick={()=>this.handlePackageChange(item.id)}>
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
							{
								checked && (
									<div className='fapiao'>
										<div>开票说明: <i>*开具发票需要另加20元手续费</i></div>
										<div><span>发票抬头</span><Input onChange={(e)=>this.setState({ticket_header:e.target.value})}/></div>
										<div><span>税号</span><Input onChange={(e)=>this.setState({ticket_no:e.target.value})}/></div>
										<div><span>收件人</span><Input onChange={(e)=>this.setState({to_user_name:e.target.value})}/></div>
										<div><span>手机号码</span><Input onChange={(e)=>this.setState({mobile:e.target.value})}/></div>
										<div><span>收件地址</span><Input onChange={(e)=>this.setState({address:e.target.value})}/></div>
									</div>
								)
							}
						</li>
					</ul>
					<hr/>
					<div className="submit clearfix">
						{/*<Link className='left' to='/VIPActivate'>
							&gt;&gt; 激活VIP体验卡
						</Link>*/}
						<div className="right">
							金额：<span className='price'>{checked ? 20 + Number(single_price) : Number(single_price)}</span> 元<Button type='primary' onClick={this.handleSubmit}>立即支付</Button>
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
