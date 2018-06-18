import React,{ Component } from 'react'
import { Icon, Button, Pagination, Modal } from 'antd';
import text from 'static/text.jpg'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			persist:state.persist,
		}
	},
	null,
)
export default class Pshijuan extends Component{
	state={
		page:1,
		per_page:10,
		data:[],
		modalshow:false
	}
	componentDidMount() {
		this.getList()
	}
	getList = ()=>{
		const { page, per_page } = this.state
		_axios.get(url.owner_star_exams,{
			page, per_page
		})
			.then(data=>{
				this.setState({
					data:data.exams,
					total_pages:data.meta.total_pages,
				})
			})
	}
	handlePage = (page)=>{
		this.setState({page},this.getList)
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
	//检查支付状态
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
	componentWillUnmount() {
		clearInterval(this.check_status)
	}
	render(){
		const { data, page, total_pages, modalshow } = this.state
		return (
			<div className="download">
      	<h1>试卷收藏</h1>
				<ul className='downloadItem'>
					{
						data.length>0 && data.map((item)=>{
							return (
								<li key={item.id}>
									<div className="search-list-left">
										<img src={text} alt=""  className="test-pic"/>
										<div className="test-txt">
											<p className="test-txt-p1">
												<Link to={`/ShiJuanDetail/${item.id}/exam`} target="_blank">{item.title}</Link>
											</p>
											<p>
												{item.user_name && <span><Icon type="clock-circle-o" />作者：{item.user_name}</span> }
												<span><Icon type="file-text" />学科：{item.education_name+item.subject_name}</span>
												<span><Icon type="pay-circle-o" />试卷类型：<strong>{item.exam_type_name}</strong></span>
											</p>
										</div>
									</div>
									<Button icon='download' type='primary' onClick={()=>this.handleDownload(item.id)}>下载</Button>
								</li>
							)
						})
					}
				</ul>
				{!!total_pages && <Pagination current={page} total={total_pages*10} onChange={this.handlePage}/> }
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
