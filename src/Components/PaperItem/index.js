import React , { Component } from 'react'
import {  Icon, Button, Modal } from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment'
import {connect} from 'react-redux';
import './index.scss'

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null,
)
export default class PaperItem extends Component{
	state={
		modalshow:false
	}
	//需要支付
	needWxPay = (id)=>{
		const { subject_id,education_id } = this.props.persist
		_axios.post(url.orders,{
			type:'exam',
			pay_way:'wechat_qr_pay',
			subject_id,
			education_id,
			id,
		})
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
	checkStatus = (order_no)=>{
		_axios.get(url.orders_check,{order_no})
			.then(data=>{
				if(data.data.status == 'paid'){
					clearInterval(this.check_status)
					this.setState({modalshow:false},this.handleDownload)
				}
			})
	}
	//开始下载
	handleDownload = (id)=>{
		// 检查是否登录并下载
		if(!this.props.persist.user.token){
			eventEmitter.emit('notLogin');
			return
		}else{
			_axios.post(url.download_records,{
				type : 'exam',
				id : id
			})
				.then((data)=>{
					if(data.paid){
						location.href = data.url
					}else{
						this.needWxPay(id)
					}
				})
		}
	}
	componentWillUnmount() {
		clearInterval(this.check_status)
	}
	render(){
		const { modalshow } = this.state
		const { data } = this.props || {}
		return(
			<div className="PaperItem clearfix">
				<div className="left clearfix">
					{/*<img className='left' src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2204742496,833438369&fm=27&gp=0.jpg" alt=""/>*/}
					<div className="title right">
						<Link to={`/ShiJuanDetail/${data.id}/exam`}><h3>{data.title}</h3></Link>
						<p><Icon type="clock-circle-o" /> 修改时间：{moment(data.updated_at).format('YYYY-MM-DD')} &nbsp;&nbsp;&nbsp;<Icon type="eye-o" /> 下载次数：{data.download_times || 0} &nbsp;&nbsp;&nbsp;<Icon type="form" /> 类型：{data.exam_type_name}</p>
					</div>
				</div>
				<div className="right fenxi">
					{/*<span onClick={()=>this.props.changeCorrectErrorShow(true)}><Icon type="line-chart" /> 试卷分析</span>*/}<Button type='primary' onClick={()=>this.handleDownload(data.id)}>下载</Button>
				</div>
				<Modal
					title='扫码支付'
					visible={modalshow}
					footer={null}
					width={400}
					maskClosable={false}
					onCancel={()=>this.setState({modalshow:false},()=>clearInterval(this.check_status))}
				>
					<p style={{textAlign:'center',marginBottom:15}}>请使用 <span style={{color:'red'}}>微信</span> 扫一扫二维码完成支付</p>
					<div id="qrcode"></div>
				</Modal>
			</div>
		)
	}
}
